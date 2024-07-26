import { useEffect, useRef } from "react";

export default function GameClock({
  time,
  setTime,
  isRunning,
  setIsRunning,
  isGameComplete,
}) {
  const requestRef = useRef();
  const prevTimeRef = useRef();

  const animate = (timeStamp) => {
    if (isRunning && !isGameComplete) {
      if (prevTimeRef.current !== undefined) {
        const deltaTime = (timeStamp - prevTimeRef.current) / 1000;
        setTime((prevTime) => prevTime + deltaTime);
      }
      prevTimeRef.current = timeStamp;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning && !isGameComplete) {
      prevTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, isGameComplete, setTime]);

  useEffect(() => {
    if (isGameComplete) {
      setIsRunning(false);
    }
  }, [isGameComplete, setIsRunning]);

  return <div>{time.toFixed(1)}</div>;
}
