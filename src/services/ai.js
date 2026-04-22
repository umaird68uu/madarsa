import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT: In a production app, never expose your API key in the frontend.
// This should ideally be moved to a Supabase Edge Function.
// For this frontend integration mockup, we use an environment variable.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(API_KEY);

// Use Gemini 3.0 Flash or fallback to the latest stable model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Update this string to 'gemini-3.0-flash' when the exact model ID is available in the API.

export const generateAIInsight = async (prompt) => {
  if (!API_KEY) {
    return "Error: Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.";
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Failed to generate AI insights at this time.";
  }
};

export const analyzeClassProgress = async (classData) => {
  const prompt = `
    Analyze the following class progress data for a Madrasa and provide 3 key insights:
    Data: ${JSON.stringify(classData)}
    
    Please output the response in a professional, concise manner suitable for a Principle's dashboard.
  `;
  return generateAIInsight(prompt);
};
