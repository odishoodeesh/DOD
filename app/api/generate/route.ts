
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt, referenceImageBase64 } = await request.json();
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is not configured on the server." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const generateOne = async (seed: number) => {
      const baseText = referenceImageBase64 
        ? `Reimagine the person from this reference image in the following context: ${prompt}. Maintain the subject's key facial features and identity perfectly. Variation ${seed}.`
        : `${prompt} Variation ${seed}. Ensure photorealistic quality, high resolution 4k, sharp focus.`;

      const parts: any[] = [];
      if (referenceImageBase64) {
        parts.push({
          inlineData: {
            data: referenceImageBase64,
            mimeType: 'image/png'
          }
        });
      }
      parts.push({ text: baseText });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: parts },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image data found in response");
    };

    const results = await Promise.all([
      generateOne(Math.floor(Math.random() * 1000)),
      generateOne(Math.floor(Math.random() * 1000) + 1000)
    ]);

    return NextResponse.json({ images: results });
  } catch (error: any) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate images" }, { status: 500 });
  }
}
