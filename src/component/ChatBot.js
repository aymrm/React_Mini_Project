import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import botControll from '../utils/ChatBotController';
import { chatAction } from '../store/chat';
import { botAction } from '../store/bot';
import sleep from '../img/0.png'
import active from '../img/1.png'
import saying from '../img/2.png'


const _ChatContainer = styled.div`
    position: absolute;
    margin-left:3px;
    width: 99%;
`

const _ChatList = styled.ul`
    height: 140px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: skyblue;
    border: 1px solid #ccc;
    border-radius: 27px;
    list-style:none;
    padding-top:5px;
    padding-left:15px;
`

const _LimitInput = styled.input`
    width:30px;
`

const _TranscriptInput = styled.input`
    width: 70%;
`

const _BotImg = styled.img`
    width:100px;
    height:100px;
    position: fixed;
    z-index: 1000;
`

const _BotText = styled.span`
    position: fixed;
    background-color: white;
    border-radius: 50%;
    padding: 15px;
    max-width: 100px;
    text-align: center;
    z-index: 1000;
`

export default function ChatBot(style){
    const { user_name, isLogin } = useSelector( state => state.profile )
    const chat = useSelector( state => state.chat )
    const bot = useSelector( state => state.bot )
    const botImgArr = [ sleep, active, saying ]
    const [ botImgPosition, setBotImgPosition ] = useState({top:'100px',left: '50px'});
    const [ botTextPosition, setBotTextPosition ] = useState({top:'100px',left: '150px'});
    const [dragging, setDragging] = useState(false);

    const handleMouseDown = (e) => {
        setDragging(true);
    };
    
    const handleMouseUp = (e) => {
        setDragging(false);
    };
    
    const handleMouseMove = (e) => {
        if (dragging) {
            e.preventDefault();
            setBotImgPosition({ left: e.clientX - 50, top: e.clientY - 50 })
            setBotTextPosition({ left: e.clientX + 50, top: e.clientY - 50 })
        }
    };

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition  } = useSpeechRecognition();
    const [ limit, setLimit ] = useState(1);
    
    const navi = useNavigate()
    const dispatch = useDispatch()
    const botController = botControll

    const [ voices, setVoices ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const lang = 'ko-KR';
    
    if (!browserSupportsSpeechRecognition) {
        speech('지원하지 않는 브라우저 입니다')
    }

    const toggleListening = () => {
        if (listening) {
            dispatch(botAction.setState(0))
            SpeechRecognition.stopListening();
        } else {
            dispatch(botAction.setState(1))
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    }


    useEffect(() => {
        const fetchVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
            const kor_voice = availableVoices.filter((e) =>
            e.lang === lang || e.lang === lang.replace('-', '_'));
            setVoices(kor_voice);
            setLoading(false);
        } else {
            setTimeout(fetchVoices, 200);
        }};

        fetchVoices();
    }, []);


    useEffect(() => {
        let timer;

        if (listening) {
            timer = setTimeout(() => {
                if(transcript){
                    dispatch( chatAction.addChat({ name:user_name , text:transcript }) );
                    resetTranscript();
                    botController(transcript,navi,dispatch,speech,isLogin)
                }
            }, limit > 0 ? limit * 1000 : 1000 );
        }
        
        return () => {
            clearTimeout(timer);
        };
    }, [transcript, listening, resetTranscript, limit]);

    const speech = (txt) => {
        if (voices) {
            const speechTxtArr = txt.split('.')
            speechTxtArr.map( e => {
                if(e.includes('?')){
                    const newTextArr = e.split('?')
                    for (let i=0; i < newTextArr.length - 1; i++){
                        const newTxt = newTextArr[i] + '?'
                        const utterThis = new SpeechSynthesisUtterance(newTxt);
                        utterThis.lang = lang;
                
                        utterThis.onstart = () => {
                            dispatch(botAction.speechMessage(newTxt));
                        };
                    
                        utterThis.onend = () => {
                            dispatch(botAction.endMessage());
                        };

                        utterThis.voice = voices[bot.voice];
                        window.speechSynthesis.speak(utterThis);
                    }
    
                    const newTxt = newTextArr[ newTextArr.length - 1 ]
                    const utterThis = new SpeechSynthesisUtterance(newTxt);
                    utterThis.lang = lang;
                
                    utterThis.onstart = () => {
                        dispatch(botAction.speechMessage(newTxt));
                    };
                    
                    utterThis.onend = () => {
                        dispatch(botAction.endMessage());
                    };
                        
                    utterThis.voice = voices[bot.voice];
                    window.speechSynthesis.speak(utterThis);

                } else {
                    const utterThis = new SpeechSynthesisUtterance(e);
                    utterThis.lang = lang;
            
                    utterThis.onstart = () => {
                        dispatch(botAction.speechMessage(e));
                    };
                
                    utterThis.onend = () => {
                        dispatch(botAction.endMessage());
                    };

                    utterThis.voice = voices[bot.voice];
                    window.speechSynthesis.speak(utterThis);
                }
            })
        } else {
            console.error('에러');
        }
    };

    return (
        <div style={{height:'300px'}}>
            <_BotImg src={botImgArr[bot.state]} style={botImgPosition}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
            />
            { bot.message && <_BotText style={botTextPosition}>{bot.message}</_BotText> }
            <br/>
            <h3 style={{ paddingLeft: '10px' }}>
                사용 가능한 음성 목록: {loading ? <p>Loading voices...</p> : 
                <select value={bot.voice} onChange={e => dispatch(botAction.setVocie(e.target.value))}>
                    {voices.map((e, id) => <option key={id} value={id}>{e.name}</option>)}
                </select>}
                <_LimitInput type='number' value={limit} onChange={ e => setLimit(e.target.value) } />
            </h3>
            <_ChatContainer>
                <_ChatList>
                    {chat.map( (e,id) => <li key={id}> {e.name} : {e.text} </li>)}
                </_ChatList>
                    <button onClick={toggleListening}>
                        {listening ? '인식 중지' : '인식 시작'}
                    </button>
                    <_TranscriptInput type="text" id="chat-input" value={transcript} readOnly/>
                    <button onClick={()=>dispatch(chatAction.resetChat())}>리셋</button>
            </_ChatContainer>
        </div>
    );
}