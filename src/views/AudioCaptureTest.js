import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export default function AudioCaptureTest(){
  const [ audioStream, setAudioStream ] = useState(null);
  const [ socket, setSocket ] = useState(null);
  const [ audioContext, setAudioContext ] = useState(null);
  
  useEffect(() => {
    const initializeSocket = () => {
      const socket = socketIOClient('http://localhost:8000/audio'); // 실제 서버 주소로 대체

      socket.emit('client_connection', () => {
        console.log('웹 소켓 연결 성공');
      });

      socket.on('server_connection', () => {
        console.log('웹 소켓 연결');
      });

      setSocket(socket);
    };

    initializeSocket(); // 여기에서 웹 소켓 초기화 함수를 호출

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(()=>{
    if(socket){
      socket.on('check',(data)=>{
        console.log(data)
      })
    }
  },[socket])
  
  const startAudioCapture = async () => {
    try {
      socket.emit('check','asdf')

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setAudioStream(stream);
      
      const newAudioContext = new ( window.AudioContext || window.webkitAudioContext )();

      setAudioContext(newAudioContext)

      const audioInput = newAudioContext.createMediaStreamSource(stream);

      audioInput.connect(newAudioContext.destination);

      audioInput.onaudioprocess = (event) => {
        console.log('onaudioprocess started')
        const audioData = event.inputBuffer.getChannelData(0);
        if (socket && socket.connected) {
          socket.emit('audioData', audioData); // 오디오 데이터를 서버로 전송
        }
      };

      console.log('audioInput',audioInput)

    } catch (err) {
      console.error('오디오 스트림 얻기 실패:', err);
    }
  };

  const stopAudioCapture = () => {
    console.log('audioStream',audioStream)
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
    }
  };

  return (
    <div>
      <button onClick={startAudioCapture}>Start Capture</button>
      <button onClick={stopAudioCapture}>Stop Capture</button>
    </div>
  );
};