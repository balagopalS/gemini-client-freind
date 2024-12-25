import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function(){
        setResultData(prev => prev + nextWord);
    },75*index)
  }

  const newChat=()=>{
    setShowResult(false);
    setLoading(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined){
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompts(prev => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }
    
    // First handle bold text
    let responseArray = response.split("**");
    let newResponse = [];
    for (let i = 0; i < responseArray.length; i++) {
        if (i===0 || i%2 !== 1){
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>"+responseArray[i]+"</b>";
        }
    }

    // Handle links and emails
    let processedResponse = newResponse
      // Convert URLs to clickable links
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #0066cc; text-decoration: underline;">$1</a>')
      // Style email addresses
      .replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g, '<span style="color: #ff6600;">$1</span>')
      // Keep the existing line break handling
      .split("*").join("</br>");

    let newResponseArray = processedResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i,nextWord+" ");
    }
    
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompts,
    setPreviousPrompts,
    showResult,
    loading,
    resultData,
    onSent,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
      </Context.Provider>
  );
};
export default ContextProvider;
