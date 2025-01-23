import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { imageUrl, styleId, prompt } = await req.json()
    console.log('Received request:', { imageUrl, styleId, prompt })

    // Create a new transformation record
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: transformation, error: insertError } = await supabase
      .from('transformations')
      .insert({
        original_image_path: imageUrl,
        style_id: styleId,
        status: 'processing',
        title: `${prompt} Transformation`
      })
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      throw new Error('Failed to create transformation record')
    }

    console.log('Created transformation record:', transformation)

    // Call OpenAI API for image generation
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Transform this image in the style of ${prompt}. Create a highly detailed artistic interpretation that maintains the core subject matter while applying the artistic style. The result should be vibrant and visually striking.`,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3",
        quality: "hd",
        style: "vivid"
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json()
      console.error('OpenAI API error:', error)
      
      // Update transformation status to failed
      await supabase
        .from('transformations')
        .update({ status: 'failed' })
        .eq('id', transformation.id)
        
      throw new Error('Failed to generate image transformation')
    }

    const data = await openaiResponse.json()
    console.log('OpenAI API response:', data)
    
    const transformedImageUrl = data.data[0].url

    // Update transformation record with result
    const { error: updateError } = await supabase
      .from('transformations')
      .update({
        transformed_image_path: transformedImageUrl,
        status: 'completed'
      })
      .eq('id', transformation.id)

    if (updateError) {
      console.error('Database update error:', updateError)
      throw new Error('Failed to update transformation status')
    }

    return new Response(
      JSON.stringify({ 
        id: transformation.id,
        url: transformedImageUrl 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in transform-image function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})