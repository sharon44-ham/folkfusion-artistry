export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  modelId: string;
}

export const artStyles: ArtStyle[] = [
  {
    id: "kalamkari",
    name: "Kalamkari",
    description: "Traditional Indian art form using natural dyes on cotton fabric",
    imageUrl: "/kalamkari-sample.jpg",
    modelId: "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
  },
  {
    id: "madhubani",
    name: "Madhubani",
    description: "Geometric patterns and natural elements in vibrant colors",
    imageUrl: "/madhubani-sample.jpg",
    modelId: "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
  },
  {
    id: "warli",
    name: "Warli",
    description: "Minimalist tribal art with geometric shapes",
    imageUrl: "/warli-sample.jpg",
    modelId: "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
  },
];