import React from 'react';
import { Play, Heart, Share2, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Podcast } from '../../types';
import { usePodcast } from '../../contexts/PodcastContext';
import { useAuth } from '../../contexts/AuthContext';

interface PodcastCardProps {
  podcast: Podcast;
  onEdit?: (podcast: Podcast) => void;
  showActions?: boolean;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, onEdit, showActions = true }) => {
  const { user } = useAuth();
  const {
    playPodcast,
    likePodcast,
    toggleFavorite,
    favorites,
    deletePodcast,
    currentPodcast,
    isPlaying,
  } = usePodcast();

  const isCurrentlyPlaying = currentPodcast?.id === podcast.id && isPlaying;
  const isFavorited = favorites.includes(podcast.id);
  const canEdit = user?.id === podcast.authorId;

  const handlePlay = () => {
    playPodcast(podcast);
  };

  const handleLike = () => {
    likePodcast(podcast.id);
  };

  const handleFavorite = () => {
    toggleFavorite(podcast.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this podcast?')) {
      deletePodcast(podcast.id);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-all duration-300 group">
      <div className="relative">
        <img
          src={podcast.imageUrl}
          alt={podcast.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
          <button
            onClick={handlePlay}
            className={`p-4 rounded-full transition-all duration-300 ${
              isCurrentlyPlaying
                ? 'bg-purple-600 scale-100'
                : 'bg-purple-600 scale-0 group-hover:scale-100'
            }`}
          >
            <Play className="w-8 h-8 text-white" fill="white" />
          </button>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {formatDuration(podcast.duration)}
        </div>
        {isCurrentlyPlaying && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Now Playing</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-semibold text-lg line-clamp-2">{podcast.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{podcast.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{podcast.author}</span>
          <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
            {podcast.category}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{podcast.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{podcast.listens}</span>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={handleFavorite}
                className={`p-2 transition-colors ${
                  isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              
              {canEdit && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onEdit?.(podcast)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;