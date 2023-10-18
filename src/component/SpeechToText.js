import { useEffect, useState } from "react";
import SpeechRecognitionSetting from "../utils/SpeechRecognitionSetting";

export default function SpeechToText() {
    const { transcript, listening, toggleListening, resetTranscript } = SpeechRecognitionSetting();
    const [ limit, setLimit ] = useState(1);
    const [ capturedText, setCapturedText ] = useState([]);

    useEffect(() => {
        let timer;

        if (listening) {
            timer = setTimeout(() => {
                if(transcript){
                    setCapturedText( prev => [...prev, { name:'default', text:transcript}] );
                    resetTranscript();
                }
            }, limit > 0 ? limit * 1000 : 1000 );
        }
        
        return () => {
            clearTimeout(timer);
        };
    }, [transcript, listening, resetTranscript, limit]);

    return (
        <div>
            <h1>Speech To Text</h1>
            <button onClick={toggleListening}>
                {listening ? '음성인식 중지' : '음성인식 시작'}
            </button>
            <button onClick={()=>setCapturedText([])}>리셋</button>
            <br/><br/>
            { transcript && <div> 인식 내용 : {transcript} </div> }

            { capturedText.map( (e,id) => <div key={id}> {e.name} : {e.text} </div>)}

            <h1>입력 제한 시간 변경</h1>
            <input type='number' value={limit} onChange={ e => setLimit(e.target.value) } />
        </div>
    );
}