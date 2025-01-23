import { supabase } from "@/integrations/supabase/client";

const uploadImageToStorage = async (file: File): Promise<string> => {
  console.log('Starting image upload to Supabase storage');
  
  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    // Convert File to ArrayBuffer to avoid LockManager issues
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    
    console.log('Uploading file:', fileName);
    
    const { data, error } = await supabase.storage
      .from('artworks')
      .upload(fileName, fileData, {
        contentType: file.type,
        cacheControl: '3600'
      });

    if (error) {
      console.error('Error uploading to storage:', error);
      throw error;
    }

    console.log('Upload successful:', data);

    const { data: { publicUrl } } = supabase.storage
      .from('artworks')
      .getPublicUrl(fileName);

    console.log('Generated public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const transformImage = async (
  file: File,
  modelId: string,
  prompt: string
) => {
  console.log('Starting image transformation process');
  
  // First upload the image to Supabase storage
  const imageUrl = await uploadImageToStorage(file);
  console.log('Image URL generated:', imageUrl);

  try {
    console.log('Calling transform-image function with:', { imageUrl, modelId, prompt });
    
    const { data, error } = await supabase.functions.invoke('transform-image', {
      body: {
        imageUrl,
        styleId: modelId,
        prompt
      }
    });

    if (error) {
      console.error('Edge Function error:', error);
      throw error;
    }

    console.log('Edge Function response:', data);
    return data;
  } catch (error) {
    console.error('Error transforming image:', error);
    throw error;
  }
};

export const checkPredictionStatus = async (predictionId: string) => {
  console.log('Checking prediction status for:', predictionId);
  
  try {
    const { data, error } = await supabase
      .from('transformations')
      .select('*')
      .eq('id', predictionId)
      .single();

    if (error) {
      console.error('Error checking prediction status:', error);
      throw error;
    }

    console.log('Prediction status:', data);
    return {
      status: data.status,
      output: data.transformed_image_path ? [data.transformed_image_path] : null
    };
  } catch (error) {
    console.error('Error checking prediction status:', error);
    throw error;
  }
};