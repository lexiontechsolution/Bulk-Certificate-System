import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = "AIzaSyAXFKGzX1-4TPPqapEXDCTF6XfUz0gijsw"; // Your API Key added directly
  return new GoogleGenAI({ apiKey });
};

export const generateTemplateImage = async (prompt: string): Promise<string> => {
  const ai = getClient();

  const refinedPrompt = `A professional, empty certificate template background for ${prompt}. 
  High resolution, elegant borders, plenty of whitespace in the center for text. 
  No text, no placeholders, just the design. 
  Clean, vector-style art or photorealistic depending on context.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: refinedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3",
        },
      },
    });

    let imageBase64 = null;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageBase64 = part.inlineData.data;
          break;
        }
      }
    }

    if (!imageBase64) {
      throw new Error("No image generated.");
    }

    return `data:image/png;base64,${imageBase64}`;
  } catch (error) {
    console.error("Error generating template:", error);
    throw error;
  }
};
