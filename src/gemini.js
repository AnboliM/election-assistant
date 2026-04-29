import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI SDK
// In a real application, ensure your API key is kept secure and not exposed on the client.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyMockKeyForHackathonPlaceholder';
const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return null;
  }
};
