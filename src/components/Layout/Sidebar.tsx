import React from 'react';
import { Home, Heart, Bookmark, TrendingUp, Settings } from 'lucide-react';
import { categories } from '../../data/mockData';
import * as LucideIcons from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'bookmarks', label: 'Saved', icon: Bookmark },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 h-screen sticky top-0 border-r border-gray-800 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => onCategoryChange('')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedCategory === ''
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="text-sm">All Categories</span>
            </button>
            {categories.map((category) => {
              const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ComponentType<any>;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;