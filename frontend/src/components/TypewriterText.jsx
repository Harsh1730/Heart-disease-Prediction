import React, { useState, useEffect } from 'react';

const DEFAULT_WORDS = [
  'Truth.',
  'Reality.',
  'Signals.',
  'Rhythm.',
  'Facts.',
  'Story.',
  'Certainty.',
];

export default function TypewriterText({
  words = DEFAULT_WORDS,
  typingSpeed = 110,
  deletingSpeed = 65,
  pauseTime = 2000,
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let timer;
    const targetWord = words[wordIndex];

    if (isPaused) {
      // Pause when full word is displayed, or briefly when erased
      timer = setTimeout(
        () => {
          setIsPaused(false);
          if (!isDeleting && currentText === targetWord) {
            setIsDeleting(true);
          } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        },
        isDeleting ? 450 : pauseTime
      );
    } else if (isDeleting) {
      timer = setTimeout(() => {
        if (currentText.length > 0) {
          setCurrentText(targetWord.substring(0, currentText.length - 1));
        } else {
          setIsPaused(true);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        if (currentText.length < targetWord.length) {
          setCurrentText(targetWord.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="typewriter-container">
      <em className="typewriter-word">{currentText}</em>
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
