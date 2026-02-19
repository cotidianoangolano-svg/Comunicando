
import React, { useState } from 'react';
import { MOCK_USER } from '../constants';

const ProfileView: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState("Software Engineer building the future of connection. Dark mode enthusiast. 🌑✨");
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleEditClick = () => {
    setIsEditingBio(!isEditingBio);
  };

  const toggleAvatarModal = () => {
    setShowAvatarModal(!showAvatarModal);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto pb-20 px-4 pt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{MOCK_USER.displayName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[15px]">{MOCK_USER.username}</span>
            <span className="bg-[#1e1e1e] text-[#616161] text-[12px] px-2 py-0.5 rounded-full">conecta.plus</span>
          </div>
        </div>
        <button 
          onClick={toggleAvatarModal}
          className="focus:outline-none transition-transform hover:scale-105 active:scale-95"
        >
          <img 
            src={MOCK_USER.avatar} 
            alt="profile" 
            className="w-20 h-20 rounded-full object-cover cursor-zoom-in border-2 border-transparent hover:border-[#262626]"
          />
        </button>
      </div>

      <div className="mb-6">
        {isEditingBio ? (
          <textarea
            autoFocus
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            className="w-full bg-[#121212] text-[15px] border border-[#262626] rounded-lg p-2 outline-none focus:border-[#444] min-h-[80px] resize-none"
          />
        ) : (
          <p className="text-[15px] whitespace-pre-wrap">{bioText}</p>
        )}
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="flex -space-x-2">
            <div className="w-5 h-5 rounded-full bg-gray-600 border border-black"></div>
            <div className="w-5 h-5 rounded-full bg-gray-400 border border-black"></div>
        </div>
        <span className="text-[#616161] text-[15px]">1.2k seguidores</span>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex gap-2">
          <button 
            onClick={handleEditClick}
            className={`flex-1 py-1.5 rounded-lg font-semibold text-[15px] active:scale-95 transition-all border ${
              isEditingBio 
              ? 'bg-white text-black border-white' 
              : 'bg-transparent border-[#262626] text-white'
            }`}
          >
            {isEditingBio ? 'Salvar' : 'Editar perfil'}
          </button>
          <button className="flex-1 bg-transparent border border-[#262626] py-1.5 rounded-lg font-semibold text-[15px] active:scale-95 transition-transform">
            Compartilhar perfil
          </button>
        </div>
        {!isEditingBio && (
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`w-full py-2 rounded-lg font-semibold text-[15px] active:scale-[0.98] transition-all ${
              isFollowing 
              ? 'bg-transparent border border-[#262626] text-white' 
              : 'bg-white text-black'
            }`}
          >
            {isFollowing ? 'Seguindo' : 'Seguir'}
          </button>
        )}
      </div>

      <div className="flex border-b border-[#262626] mb-4">
        <button className="flex-1 pb-3 font-semibold border-b-2 border-white">Threads</button>
        <button className="flex-1 pb-3 font-semibold text-[#616161]">Respostas</button>
        <button className="flex-1 pb-3 font-semibold text-[#616161]">Republicações</button>
      </div>

      <div className="text-center py-10 text-[#616161]">
        <p>Você ainda não publicou nada no Conecta+</p>
      </div>

      {/* Avatar Modal Overlay */}
      {showAvatarModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={toggleAvatarModal}
        >
          <button 
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={toggleAvatarModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div 
            className="relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={MOCK_USER.avatar} 
              alt="full profile" 
              className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-[#262626] shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
