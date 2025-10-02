import React from 'react';

const AudioPlayer = ({ 
  audioUrl, 
  onPlay, 
  onPause, 
  onTimeUpdate, 
  onEnded,
  isPlaying,
  currentTime,
  duration 
}) => {
  return (
    <div className="audio-player-container">
      <audio
        src={audioUrl}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onLoadedMetadata={(e) => {
          if (e.target.duration) {
            // Duration loaded
          }
        }}
        preload="metadata"
      />
      
      <div className="d-flex align-items-center gap-3">
        {/* Play/Pause Button */}
        <button
          className="play-btn"
          onClick={() => {
            const audio = document.querySelector('audio');
            if (audio) {
              if (isPlaying) {
                audio.pause();
              } else {
                audio.play();
              }
            }
          }}
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>

        {/* Progress Bar */}
        <div className="flex-grow-1">
          <div className="audio-progress">
            <div 
              className="audio-progress-bar"
              style={{ 
                width: `${duration ? (currentTime / duration) * 100 : 0}%` 
              }}
            ></div>
          </div>
          
          {/* Time Display */}
          <div className="d-flex justify-content-between small text-muted mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 30)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default AudioPlayer;