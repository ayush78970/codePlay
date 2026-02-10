import { useState } from "react";

function SpeechToText({onResult }) {
  const [text, setText] = useState("");

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous =true;     //keep capturing
    recognition.start();

    let finalTranscript ="";

    recognition.onresult = (event) => {
      const transcript= event.results[0][0].transcript;

      setText(transcript);  // update ui
      onResult(transcript); // send to parent
    }
 
  };

  return (
    <div>
      <button onClick={startListening}>🎤 Speak</button>
      <h4>{text}</h4>
    </div>
  );
}

export default SpeechToText;
