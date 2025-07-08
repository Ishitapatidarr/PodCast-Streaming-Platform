import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2 } from 'lucide-react';
import { usePodcast } from '../../contexts/PodcastContext';

const AudioPlayer: React.FC = () => {
  const {
    currentPodcast,
    isPlaying,
    togglePlay,
    likePodcast,
    toggleFavorite,
    favorites,
  } = usePodcast();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Handle podcast end
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentPodcast]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!currentPodcast) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
      <audio
        ref={audioRef}
        src={currentPodcast.audioUrl}
        preload="metadata"
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <img
              src={currentPodcast.imageUrl}
              alt={currentPodcast.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">{currentPodcast.title}</h3>
              <p className="text-gray-400 text-sm truncate">{currentPodcast.author}</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-1">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3 w-full max-w-md">
              <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                }}
              />
              <span className="text-xs text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-1 justify-end">
            <button
              onClick={() => toggleFavorite(currentPodcast.id)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorites.includes(currentPodcast.id) ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;