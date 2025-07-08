import React, { useState } from 'react';
import { X, Upload, Mic } from 'lucide-react';
import { usePodcast } from '../../contexts/PodcastContext';
import { useAuth } from '../../contexts/AuthContext';
import { categories } from '../../data/mockData';

interface CreatePodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPodcast?: any;
}

const CreatePodcastModal: React.FC<CreatePodcastModalProps> = ({
  isOpen,
  onClose,
  editingPodcast,
}) => {
  const { user } = useAuth();
  const { addPodcast, updatePodcast } = usePodcast();
  const [formData, setFormData] = useState({
    title: editingPodcast?.title || '',
    description: editingPodcast?.description || '',
    category: editingPodcast?.category || '',
    imageUrl: editingPodcast?.imageUrl || '',
    audioUrl: editingPodcast?.audioUrl || '',
    duration: editingPodcast?.duration || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      const podcastData = {
        ...formData,
        author: user.username,
        authorId: user.id,
        likes: editingPodcast?.likes || 0,
        listens: editingPodcast?.listens || 0,
      };

      if (editingPodcast) {
        updatePodcast(editingPodcast.id, podcastData);
      } else {
        addPodcast(podcastData);
      }

      onClose();
      setFormData({
        title: '',
        description: '',
        category: '',
        imageUrl: '',
        audioUrl: '',
        duration: 0,
      });
    } catch (error) {
      console.error('Error saving podcast:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (type: 'image' | 'audio') => {
    // In a real app, this would upload to a server
    // For demo purposes, we'll use placeholder URLs
    if (type === 'image') {
      const imageUrls = [
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
        'https://images.pexels.com/photos/3817543/pexels-photo-3817543.jpeg',
        'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
        'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg',
      ];
      const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      setFormData(prev => ({ ...prev, imageUrl: randomImage }));
    } else {
      // For audio, we'll use a placeholder audio file
      setFormData(prev => ({ 
        ...prev, 
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        duration: Math.floor(Math.random() * 3600) + 600 // Random duration between 10-60 minutes
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {editingPodcast ? 'Edit Podcast' : 'Create New Podcast'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Podcast Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter podcast title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your podcast"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Podcast Cover Image
            </label>
            <div className="flex items-center space-x-4">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleFileUpload('image')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                Upload Image
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Audio File
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                {formData.audioUrl ? 'Audio file uploaded' : 'No audio file selected'}
              </div>
              <button
                type="button"
                onClick={() => handleFileUpload('audio')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors flex items-center space-x-2"
              >
                <Mic className="w-4 h-4" />
                <span>Upload Audio</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (editingPodcast ? 'Update' : 'Create')} Podcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePodcastModal;