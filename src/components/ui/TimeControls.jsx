import { Play, Pause, FastForward, Rewind } from 'lucide-react';
import './ui.css';

export default function TimeControls({ timeScale, setTimeScale }) {
  const isPaused = timeScale === 0;

  const handlePausePlay = () => {
    if (isPaused) {
      setTimeScale(1); // Default speed
    } else {
      setTimeScale(0);
    }
  };

  const handleSpeedUp = () => {
    if (timeScale === 0) setTimeScale(1);
    else if (timeScale < 100) setTimeScale(timeScale * 2);
  };

  const handleSlowDown = () => {
    if (timeScale > 0.1) setTimeScale(timeScale / 2);
  };

  return (
    <div className="time-controls glass-panel ui-interactive">
      <button className="control-btn" onClick={handleSlowDown} title="Slow Down">
        <Rewind size={20} />
      </button>
      
      <button className="control-btn" onClick={handlePausePlay} title={isPaused ? "Play" : "Pause"}>
        {isPaused ? <Play size={24} /> : <Pause size={24} />}
      </button>
      
      <button className="control-btn" onClick={handleSpeedUp} title="Speed Up">
        <FastForward size={20} />
      </button>
      
      <div className="speed-display">
        {timeScale}x
      </div>
    </div>
  );
}
