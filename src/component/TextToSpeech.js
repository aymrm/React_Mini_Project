import { useEffect, useState } from "react";

export default function TextToSpeech() {
    const [ voices, setVoices ] = useState([]);
    const [ selectNum, setSelctNum ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ text, setText ] = useState('');
    const lang = 'ko-KR';
  
    useEffect(() => {
        const fetchVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
            const kor_voice = availableVoices.filter((e) =>
            e.lang === lang || e.lang === lang.replace('-', '_'));
            const eSpeak_Vocie = availableVoices.filter((e)=> e.name === 'sSpeak')
            setVoices(kor_voice);
            setLoading(false);
        } else {
            setTimeout(fetchVoices, 200);
        }};

        fetchVoices();
    }, []);
  
    const speech = (txt) => {
        const utterThis = new SpeechSynthesisUtterance(txt);
        utterThis.lang = lang;
        if (voices) {
            utterThis.voice = voices[selectNum];
            window.speechSynthesis.speak(utterThis);
        } else {
            console.error('에러');
        }
    };
  
    return (
      <>
        <h1>text to speech</h1>
        <div>
            <h2>사용 가능한 음성 목록:</h2>
            {loading ? <p>Loading voices...</p> : 
            <select value={selectNum} onChange={e => setSelctNum(e.target.value)}>
                {voices.map((e, id) => <option key={id} value={id}>{e.name}</option>)}
            </select>}
        </div>
        <br/>
        <input type="text" value={text} onChange={e=>setText(e.target.value)}/>
        <button type="button" onClick={()=>speech(text)}>클릭</button>
      </>
    );
  }