import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
    const handleCardClick = (prompt) => {
        console.log("Card clicked with prompt:", prompt)
        setInput(prompt)
        onSent(prompt)
    }
    return (
    <div className='main'>
        <div className='nav'>
            <p>Balagopal's Stand-In Bot</p>
            <img src={assets.user_icon_two} alt="" />
        </div>
        <div className="main-container">

            {!showResult
            ?<>
                <div className="greet">
                    <p><span>Hello!</span></p>
                    <p>How can I help you?</p>
                </div>
                <div className="cards">
                <div className="card" onClick={() => handleCardClick("Tell me about Balagopal and how do I reach him?")}>
                        <p>Who is Balagopal?</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => handleCardClick("Tell me about Balagopal's work experience?")}>
                        <p>What is his experience?</p>
                        <img src={assets.bulb_icon} alt="" /> 
                    </div>
                    <div className="card" onClick={() => handleCardClick("Let's discuss work opportunities with Balagopal, what roles is he suitable for?")}>
                        <p>What can he do?</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => handleCardClick("What are Balagopal's credentials, programming, hybrid and technical skills?")}>
                        <p>Skills and credentials</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
            </>:
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading? 
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                    </div>
                </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='or just ask away...' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    I'm using Gemini to respond to you, some answers might be off
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main