import React, { createContext, useContext, useEffect, useState } from 'react';
import { Podcast, UserInteraction } from '../types';
import { defaultPodcasts } from '../data/mockData';
import { useAuth } from './AuthContext';

interface PodcastContextType {
  podcasts: Podcast[];
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  favorites: string[];
  setPodcasts: (podcasts: Podcast[]) => void;
  playPodcast: (podcast: Podcast) => void;
  pausePodcast: () => void;
  togglePlay: () => void;
  likePodcast: (podcastId: string) => void;
  toggleFavorite: (podcastId: string) => void;
  incrementListens: (podcastId: string) => void;
  addPodcast: (podcast: Omit<Podcast, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deletePodcast: (podcastId: string) => void;
  updatePodcast: (podcastId: string, updates: Partial<Podcast>) => void;
  getUserInteractions: (podcastId: string) => UserInteraction | null;
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context;
};

export const PodcastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [podcasts, setPodcastsState] = useState<Podcast[]>([]);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedPodcasts = localStorage.getItem('podcasts');
    if (storedPodcasts) {
      setPodcastsState(JSON.parse(storedPodcasts));
    } else {
      setPodcastsState(defaultPodcasts);
      localStorage.setItem('podcasts', JSON.stringify(defaultPodcasts));
    }

    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [user]);

  const setPodcasts = (newPodcasts: Podcast[]) => {
    setPodcastsState(newPodcasts);
    localStorage.setItem('podcasts', JSON.stringify(newPodcasts));
  };

  const playPodcast = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
    setIsPlaying(true);
    incrementListens(podcast.id);
  };

  const pausePodcast = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const likePodcast = (podcastId: string) => {
    if (!user) return;
    
    const updatedPodcasts = podcasts.map(podcast => {
      if (podcast.id === podcastId) {
        return { ...podcast, likes: podcast.likes + 1 };
      }
      return podcast;
    });
    setPodcasts(updatedPodcasts);
  };

  const toggleFavorite = (podcastId: string) => {
    if (!user) return;
    
    const newFavorites = favorites.includes(podcastId)
      ? favorites.filter(id => id !== podcastId)
      : [...favorites, podcastId];
    
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const incrementListens = (podcastId: string) => {
    const updatedPodcasts = podcasts.map(podcast => {
      if (podcast.id === podcastId) {
        return { ...podcast, listens: podcast.listens + 1 };
      }
      return podcast;
    });
    setPodcasts(updatedPodcasts);
  };

  const addPodcast = (podcastData: Omit<Podcast, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPodcast: Podcast = {
      ...podcastData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedPodcasts = [...podcasts, newPodcast];
    setPodcasts(updatedPodcasts);
  };

  const deletePodcast = (podcastId: string) => {
    const updatedPodcasts = podcasts.filter(podcast => podcast.id !== podcastId);
    setPodcasts(updatedPodcasts);
    if (currentPodcast?.id === podcastId) {
      setCurrentPodcast(null);
      setIsPlaying(false);
    }
  };

  const updatePodcast = (podcastId: string, updates: Partial<Podcast>) => {
    const updatedPodcasts = podcasts.map(podcast => {
      if (podcast.id === podcastId) {
        return { ...podcast, ...updates, updatedAt: new Date().toISOString() };
      }
      return podcast;
    });
    setPodcasts(updatedPodcasts);
  };

  const getUserInteractions = (podcastId: string): UserInteraction | null => {
    if (!user) return null;
    
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '{}');
    return interactions[`${user.id}_${podcastId}`] || null;
  };

  return (
    <PodcastContext.Provider
      value={{
        podcasts,
        currentPodcast,
        isPlaying,
        currentTime,
        duration,
        favorites,
        setPodcasts,
        playPodcast,
        pausePodcast,
        togglePlay,
        likePodcast,
        toggleFavorite,
        incrementListens,
        addPodcast,
        deletePodcast,
        updatePodcast,
        getUserInteractions,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};