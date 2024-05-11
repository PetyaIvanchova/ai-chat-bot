import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type Props = {
  onSend: (message: string) => void;
};

const InputBar: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
      if (typeof window !== "undefined" && window.SpeechRecognition || window.webkitSpeechRecognition) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognitionInstance = new SpeechRecognition();
          recognitionInstance.continuous = false; 
          recognitionInstance.interimResults = false;  
          recognitionInstance.lang = 'en-US';  

          recognitionInstance.onresult = async (event) => {
              const lastResultIndex = event.results.length - 1;
              setMessage(event.results[lastResultIndex][0].transcript);
              handleSend()
          };

          recognitionInstance.onend = () => {
              setIsRecording(false);
          };

          setRecognition(recognitionInstance);
      } else {
          console.error("SpeechRecognition is not supported by this browser.");
      }
  }, []);

  const toggleRecording = () => {
      if (isRecording) {
          recognition.stop();  
          
      } else {  
          recognition.start();  
      }
      setIsRecording(!isRecording);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };


  return (
    <div className="w-full py-3">
      <div className='w-11/12 rounded-xl mx-auto flex items-center justify-between w-full p-2 bg-primary-100 items-center '>
      <input
        type="text"
        placeholder="Type your message here..."
        className="flex-1 p-2 mr-2 border-2 bg-primary-100 border-none rounded-lg focus:outline-none text-primary-300"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend} className="p-2 bg-transparent">
        <Image src="/images/send-icon.png" alt="Send" width={24} height={24} />
      </button>
      <button className="p-2 bg-transparent">
        <Image src="/images/image-icon.png" alt="Add Image" width={24} height={24} />
      </button>
      <button className="p-2 bg-transparent" onClick={toggleRecording}>
        <Image src="/images/mic-icon.png" alt="Microphone" width={24} height={24} />
      </button>
      </div>
    </div>
  );
};

export default InputBar;
