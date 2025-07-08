import React from 'react';
import { Podcast } from '../../types';
import PodcastCard from './PodcastCard';

interface PodcastGridProps {
  podcasts: Podcast[];
  onEdit?: (podcast: Podcast) => void;
  loading?: boolean;
}

const PodcastGrid: React.FC<PodcastGridProps> = ({ podcasts, onEdit, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (podcasts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No podcasts found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          podcast={podcast}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default PodcastGrid;