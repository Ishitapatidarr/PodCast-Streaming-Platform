import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PodcastProvider } from './contexts/PodcastContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import PodcastGrid from './components/Podcast/PodcastGrid';
import AudioPlayer from './components/Player/AudioPlayer';
import CreatePodcastModal from './components/Podcast/CreatePodcastModal';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import { usePodcast } from './contexts/PodcastContext';

const Dashboard: React.FC = () => {
  const { podcasts } = usePodcast();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState(null);

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         podcast.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         podcast.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || podcast.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleEditPodcast = (podcast: any) => {
    setEditingPodcast(podcast);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingPodcast(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSearchChange={setSearchQuery}
          onCreatePodcast={() => setShowCreateModal(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeTab === 'home' ? 'Discover Podcasts' : 
                 activeTab === 'favorites' ? 'Your Favorites' : 
                 activeTab === 'bookmarks' ? 'Saved Podcasts' : 
                 activeTab === 'trending' ? 'Trending Now' : 'Settings'}
              </h2>
              <p className="text-gray-400">
                {selectedCategory ? `${selectedCategory} podcasts` : 'All categories'}
              </p>
            </div>
            
            <PodcastGrid
              podcasts={filteredPodcasts}
              onEdit={handleEditPodcast}
            />
          </div>
        </main>
      </div>
      
      <AudioPlayer />
      
      <CreatePodcastModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        editingPodcast={editingPodcast}
      />
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  return (
    <PodcastProvider>
      <Dashboard />
    </PodcastProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;