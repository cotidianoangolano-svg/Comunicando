
import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-[#262626] z-50">
      <div className="max-w-screen-md mx-auto flex justify-around items-center h-16 px-4">
        <button 
          onClick={() => setActiveTab(TabType.HOME)}
          className={`text-2xl transition-colors ${activeTab === TabType.HOME ? 'text-white' : 'text-[#616161]'}`}
        >
          <i className={activeTab === TabType.HOME ? 'fa-solid fa-house' : 'fa-regular fa-house'}></i>
        </button>
        
        <button 
          onClick={() => setActiveTab(TabType.SEARCH)}
          className={`text-2xl transition-colors ${activeTab === TabType.SEARCH ? 'text-white' : 'text-[#616161]'}`}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        
        <button 
          onClick={() => setActiveTab(TabType.CREATE)}
          className={`text-2xl transition-colors ${activeTab === TabType.CREATE ? 'text-white' : 'text-[#616161]'}`}
        >
          <i className="fa-regular fa-square-plus"></i>
        </button>
        
        <button 
          onClick={() => setActiveTab(TabType.ACTIVITY)}
          className={`text-2xl transition-colors ${activeTab === TabType.ACTIVITY ? 'text-white' : 'text-[#616161]'}`}
        >
          <i className={activeTab === TabType.ACTIVITY ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
        </button>
        
        <button 
          onClick={() => setActiveTab(TabType.PROFILE)}
          className={`text-2xl transition-colors ${activeTab === TabType.PROFILE ? 'text-white' : 'text-[#616161]'}`}
        >
          <i className={activeTab === TabType.PROFILE ? 'fa-solid fa-user' : 'fa-regular fa-user'}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
