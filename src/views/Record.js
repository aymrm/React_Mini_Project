import { useState } from "react";


export default function RecordComponenet(){
    const [ audioArr, setAudioArr ] = useState([]);
    const [ audioSaveNum, setAudioSaveNum ] = useState(0);
    const [ audioPlayNum, setAudioPlayNum ] = useState(0);
    const [ audioStream, setAudioStream] = useState(null);
    const [ isRecording, setIsRecording] = useState(false);
    const [ mediaRecorder, setMediaRecorder] = useState(null); // mediaRecorder 상태 추가

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);

        const recorder = new MediaRecorder(stream);

        let recordedChunks = [];

        recorder.ondataavailable = event => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };
    
        recorder.onstop = async () => {
          console.log('onstop')
          if (recordedChunks.length > 0) {
            const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
            setAudioArr(prev => [...prev,{id:audioSaveNum,data:audioBlob}])
            setAudioSaveNum( prev => prev + 1)
          } else {
            console.error('녹음된 오디오 데이터가 없습니다.');
          }
        };
    
        // 녹음 시작
        recorder.start();
        setIsRecording(true);
    
        // mediaRecorder 객체 상태에 저장
        setMediaRecorder(recorder);
      } catch (error) {
        console.error('오디오 녹음 시작 중 에러:', error);
      }
    };
    
    const stopRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
        if(audioStream){
          audioStream.getTracks().forEach(track => track.stop())
        }
        setAudioStream(null);
        setMediaRecorder(null);
      }
    };

    const playAudio = () => {
      const selectedAudio = audioArr.find(data => data.id === audioPlayNum);

      if (selectedAudio) {
        const audioBlob = selectedAudio.data;
        const audioUrl = URL.createObjectURL(audioBlob);
    
        const audioElement = new Audio(audioUrl);
        audioElement.play();
      }
    }
    
    return (
      <div>
        <button type="button" onClick={startRecording} disabled={isRecording}>
          {isRecording ? '녹음 중...' : '녹음 시작'}
        </button>
        <button type="button" onClick={stopRecording} disabled={!isRecording}>
          녹음 중지
        </button>
        <select value={audioPlayNum} onChange={e=>setAudioPlayNum(e.target.value)}>
          {audioArr.map(data => <option key={data.id} value={data.id}>{data.id} 트랙</option>)}
        </select>
        <button type='button' onClick={playAudio}>오디오 재생</button>
      </div>
    );
}