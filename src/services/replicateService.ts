import { supabase } from "@/integrations/supabase/client";

export const transformImage = async (
  imageUrl: string,
  modelId: string,
  prompt: string
) => {
  console.log("Transforming image with Edge Function", { imageUrl, modelId, prompt });
  
  try {
    const { data, error } = await supabase.functions.invoke('transform-image', {
      body: {
        imageUrl,
        styleId: modelId,
        prompt
      }
    });

    if (error) {
      console.error("Edge Function error:", error);
      throw error;
    }

    console.log("Edge Function response:", data);
    return data;
  } catch (error) {
    console.error("Error transforming image:", error);
    throw error;
  }
};

export const checkPredictionStatus = async (predictionId: string) => {
  try {
    const { data, error } = await supabase
      .from('transformations')
      .select('*')
      .eq('id', predictionId)
      .single();

    if (error) {
      console.error("Error checking prediction status:", error);
      throw error;
    }

    console.log("Prediction status:", data);
    return {
      status: data.status,
      output: data.transformed_image_path ? [data.transformed_image_path] : null
    };
  } catch (error) {
    console.error("Error checking prediction status:", error);
    throw error;
  }
};