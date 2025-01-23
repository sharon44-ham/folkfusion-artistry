const REPLICATE_API_URL = "https://api.replicate.com/v1/predictions";

export const transformImage = async (
  imageUrl: string,
  modelId: string,
  prompt: string
) => {
  console.log("Transforming image with Replicate API", { imageUrl, modelId, prompt });
  
  try {
    const response = await fetch(REPLICATE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version: modelId,
        input: {
          image: imageUrl,
          prompt: prompt,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to transform image");
    }

    const prediction = await response.json();
    console.log("Replicate API response:", prediction);
    return prediction;
  } catch (error) {
    console.error("Error transforming image:", error);
    throw error;
  }
};

export const checkPredictionStatus = async (predictionId: string) => {
  try {
    const response = await fetch(`${REPLICATE_API_URL}/${predictionId}`, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to check prediction status");
    }

    const prediction = await response.json();
    console.log("Prediction status:", prediction);
    return prediction;
  } catch (error) {
    console.error("Error checking prediction status:", error);
    throw error;
  }
};