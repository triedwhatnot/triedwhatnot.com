import { useState, useRef, useEffect } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <Stopwatch />
    </div>
  );
}

const getTimestampFromMs = (timeInMs) => {
  const mins = Math.floor(timeInMs / (60 * 1000));
  const secs = Math.floor((timeInMs % (60 * 1000)) / 1000);
  const ms = (timeInMs % (60 * 1000)) % 1000;

  return `${mins < 10 ? "0" + mins : mins} : ${
    secs < 10 ? "0" + secs : secs
  } : ${ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : ms}`;
};

function Stopwatch() {
  const [initialTimestamp, setInitialTimestamp] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef(null);
  const [lapsTimestampArr, setLapsTimestampArr] = useState([]);

  useEffect(() => {
    if (isRunning === true) {
      if (initialTimestamp === 0) setInitialTimestamp(Date.now());
      else {
        setInitialTimestamp(Date.now() - (currentTimestamp - initialTimestamp));
      }
      setCurrentTimestamp(Date.now());
      intervalId.current = setInterval(() => {
        setCurrentTimestamp(Date.now());
      }, 20);
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isRunning]);

  const resetHandler = () => {
    setInitialTimestamp(0);
    setCurrentTimestamp(0);
    clearInterval(intervalId.current);
    intervalId.current = null;
    setLapsTimestampArr([]);
    setIsRunning(false);
  };

  const startPauseHandler = () => {
    if (isRunning === false) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const lapsHandler = () => {
    if (isRunning === true) {
      setLapsTimestampArr((prev) => {
        const copyArr = [...prev];
        copyArr.push(getTimestampFromMs(currentTimestamp - initialTimestamp));
        return copyArr;
      });
    }
  };

  return (
    <div className="container">
      <div className="watch-display">
        <p>{getTimestampFromMs(currentTimestamp - initialTimestamp)}</p>
        <div className="controls">
          <button onClick={startPauseHandler}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={resetHandler}>Reset</button>
          <button onClick={lapsHandler}>Lap</button>
        </div>
      </div>

      <div className="laps-container">
        {lapsTimestampArr.length > 0 && (
          <>
            <p>LAPS</p>
            <ol>
              {lapsTimestampArr.map((timestamp, idx) => (
                <li key={idx}>{timestamp}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
