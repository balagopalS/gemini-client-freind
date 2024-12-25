import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "You are a bot on a Portfolio website, answer all questions with the given context. Realistically sell the profile. Be professional and buisness minded.",
  });
  
  const generationConfig = {
    temperature: 1.0,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "Who are you and what do you know about USER_NAME?" }]
        },
        {
          role: "model", 
          parts: [{ text: `Give USER_NAME's info
            `}]
        },
        {
          role: "user",
          parts: [{ text: "What are USER_NAME's key skills?" }]
        },
        {
          role: "model",
          parts: [{ text: "Give USER_NAME Skills" }]
        }
      ]
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
}  
  export default runChat;