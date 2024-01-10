import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timerLabel, setTimerLabel] = useState<string>('Session');
  const [timeLeft, setTimeLeft] = useState<number>(sessionLength * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalId!);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handleStartStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            if (audioRef.current) {
              audioRef.current.play();
            }
            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              return breakLength * 60;
            } else {
              setTimerLabel('Session');
              return sessionLength * 60;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    } else {
      setIsRunning(false);
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  };

  // useEffect(() => {
  //   if (timeLeft === 0 && audioRef.current) {
  //     audioRef.current.play();
  //   }
  // }, [timeLeft]);

  useEffect(() => {
    // Establecer el valor predeterminado al cargar la página
    const breakLengthElement = document.getElementById('break-length');
    if (breakLengthElement) {
      breakLengthElement.textContent = `${breakLength}`;
    }
  }, [breakLength]);

  return (
    <div className="pomodoro-clock">
      <div id="break-label">Break Length: {breakLength}</div>
      <button id="break-decrement" onClick={handleBreakDecrement}>Decrease</button>
      <button id="break-increment" onClick={handleBreakIncrement}>Increase</button>

      <div id="session-label">Session Length: {sessionLength}</div>
      <button id="session-decrement" onClick={handleSessionDecrement}>Decrease</button>
      <button id="session-increment" onClick={handleSessionIncrement}>Increase</button>

      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{`${Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}</div>

      <button id="start_stop" onClick={handleStartStop}>
        Start/Stop
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>

      <audio
        id="beep"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      />
    </div>
  );
};

export default App;