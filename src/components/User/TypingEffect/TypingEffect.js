import React, { useState, useEffect } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ texts, speed = 100, delay = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];
      
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), delay);
        return;
      }
      
      if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      const nextText = isDeleting 
        ? fullText.substring(0, currentText.length - 1)
        : fullText.substring(0, currentText.length + 1);

      setCurrentText(nextText);
      setTypingSpeed(isDeleting ? speed / 2 : speed);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, texts, currentTextIndex, typingSpeed, speed, delay]);

  return (
    <span className="typing-effect">
      {currentText}
      <span className="typing-effect-cursor">|</span>
    </span>
  );
};

export default TypingEffect;