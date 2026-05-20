
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateTTS = async (textToSpeak: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Say with a clear and engaging voice: ${textToSpeak}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (base64Audio) {
            return base64Audio;
        }
        return null;

    } catch (error) {
        console.error("Error generating TTS with Gemini:", error);
        throw new Error("Failed to generate audio from text.");
    }
};


export const generateGuidedTransitionAudio = async (script: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: script }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    // Using a different voice for a calmer tone
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Zephyr' }, 
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (base64Audio) {
            return base64Audio;
        }
        return null;

    } catch (error) {
        console.error("Error generating guided transition audio with Gemini:", error);
        throw new Error("Failed to generate guided audio.");
    }
}
