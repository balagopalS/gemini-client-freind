import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyB8hgX96bGigwGUJsDY5mXEQkEjPFp3iTY";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-exp-1206",
    systemInstruction: "You are a bot on a Portfolio website, answer all questions and refer to the user as \"boss\". Be kind and cheerful, use emojis. Have fun. Be mature. Swearing is allowed.",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
  export default runChat;