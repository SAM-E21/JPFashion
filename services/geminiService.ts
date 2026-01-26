
import { GoogleGenAI } from "@google/genai";

// Fix: Use process.env.API_KEY directly as required by standard initialization guidelines
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const getStylistAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "Eres 'JP Stylist', el asistente experto en moda de JP Fashion. Tu estilo es elegante, sofisticado y exclusivo. Ayudas a las clientas a elegir outfits combinando colores negro, dorado y blanco. Tus respuestas deben ser cortas, inspiradoras y enfocadas en el lujo femenino.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, mi conexión con el mundo de la alta costura está teniendo una breve interrupción. ¿En qué más puedo ayudarte?";
  }
};
