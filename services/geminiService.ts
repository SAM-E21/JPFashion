import { GoogleGenAI } from "@google/genai";

// Acceso seguro a la variable de entorno
const getSafeApiKey = () => {
  try {
    return (typeof process !== 'undefined' && import.meta.env  && import.meta.env.VITE_API_KEY ) ? import.meta.env.VITE_API_KEY  : "";
  } catch (e) {
    return "";
  }
};

const apiKey = getSafeApiKey();
const ai = new GoogleGenAI({ apiKey });

export const getStylistAdvice = async (userPrompt: string) => {
  if (!apiKey) {
    console.warn("JP Stylist: API Key no configurada. El asistente operará en modo limitado.");
    return "Lo siento, mi conexión con el mundo de la alta costura está teniendo una breve interrupción. ¿En qué más puedo ayudarte?";
  }

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
    return "Mi atelier está recibiendo nuevas colecciones justo ahora. Por favor, pregúntame de nuevo en unos instantes.";
  }
};
