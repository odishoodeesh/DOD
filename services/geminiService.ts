
import { GoogleGenAI } from "@google/genai";

export async function generateImages(prompt: string, referenceImageBase64?: string | null): Promise<string[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const generateOne = async (seed: number) => {
    // If we have an image, we adjust the prompt to focus on reimaging the person
    const baseText = referenceImageBase64 
      ? `Reimagine the person from this reference image in the following context: ${prompt}. Maintain the subject's key facial features and identity perfectly. Variation ${seed}.`
      : `${prompt} Variation ${seed}. Ensure photorealistic quality, high resolution 4k, sharp focus.`;

    const parts: any[] = [];
    
    if (referenceImageBase64) {
      parts.push({
        inlineData: {
          data: referenceImageBase64,
          mimeType: 'image/png' // Assuming png/jpeg, browser base64 will be standard
        }
      });
    }
    
    parts.push({ text: baseText });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  };

  try {
    const results = await Promise.all([
      generateOne(Math.floor(Math.random() * 1000)),
      generateOne(Math.floor(Math.random() * 1000) + 1000)
    ]);
    return results;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}
