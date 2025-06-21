import { useState, useEffect } from "react";

const useCountdownTimer = (initialMinutes = 25, onEnd = () => {}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft === 0) onEnd(); // Execute function when timer ends
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onEnd]);

  const startTimer = () => setIsActive(true);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return { minutes, seconds, startTimer };
};

export default useCountdownTimer;
