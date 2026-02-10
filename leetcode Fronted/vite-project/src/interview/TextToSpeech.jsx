import { useEffect, useRef } from "react";

function TextToSpeech({ text }) {
  const unlocked = useRef(false);

  // unlock audio on first click
  useEffect(() => {
    const unlock = () => {
      unlocked.current = true;
      speechSynthesis.getVoices();
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock);
  }, []);

  useEffect(() => {
    if (!text || !unlocked.current) return;

    speechSynthesis.cancel(); // stop previous
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }, [text]);

  return null;
}

export default TextToSpeech;
