import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function SpeechRecognitionSetting(commands){
  const { transcript, listening, resetTranscript } = useSpeechRecognition({commands});

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
    }
  }

  return { transcript, listening, toggleListening, resetTranscript };
}