
import React, { useState, useRef } from 'react';
import Navigation from './components/Navigation';
import HomeFeed from './components/HomeFeed';
import ProfileView from './components/ProfileView';
import PostCard, { MOCK_REPLIES, renderMarkdown, LoadingSpinner } from './components/PostCard';
import { TabType, Post } from './types';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HOME);
  const [selectedPostForThread, setSelectedPostForThread] = useState<Post | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [contentText, setContentText] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const MAX_CHARS = 500;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setContentText(val);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const resetCreateTab = () => {
    setActiveTab(TabType.HOME);
    setSelectedImage(null);
    setContentText('');
    setIsPreviewMode(false);
    setIsPosting(false);
  };

  const handlePostSubmit = () => {
    if (isPosting || (!contentText.trim() && !selectedImage)) return;
    
    setIsPosting(true);
    // Simulate network request
    setTimeout(() => {
      resetCreateTab();
    }, 1200);
  };

  const openThread = (post: Post) => {
    setSelectedPostForThread(post);
  };

  const closeThread = () => {
    setSelectedPostForThread(null);
  };

  // Mock post for preview
  const previewPost: Post = {
    id: 'preview',
    author: MOCK_USER,
    content: contentText || 'Sua mensagem aparecerá aqui...',
    timestamp: 'agora',
    likes: 0,
    replies: 0,
    image: selectedImage || undefined
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabType.HOME:
        return <HomeFeed onPostClick={openThread} />;
      case TabType.PROFILE:
        return <ProfileView />;
      case TabType.SEARCH:
        return (
          <div className="flex flex-col items-center justify-center h-[80vh] px-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Explorar o Conecta+</h2>
            <p className="text-[#616161]">Descubra novas conversas e conexões em tempo real.</p>
            <div className="mt-6 w-full max-w-sm bg-[#1e1e1e] rounded-xl p-3 flex items-center gap-3">
                <i className="fa-solid fa-magnifying-glass text-[#616161]"></i>
                <input 
                    type="text" 
                    placeholder="Pesquisar" 
                    className="bg-transparent border-none outline-none flex-1 text-white"
                />
            </div>
          </div>
        );
      case TabType.ACTIVITY:
        return (
          <div className="w-full max-w-screen-md mx-auto pt-6 px-4">
            <h1 className="text-3xl font-bold mb-6">Atividade</h1>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 whitespace-nowrap scrollbar-hide">
                {['Tudo', 'Seguindo', 'Respostas', 'Menções', 'Citações', 'Verificado'].map((cat, idx) => (
                    <button key={cat} className={`px-5 py-1.5 rounded-lg font-semibold border ${idx === 0 ? 'bg-white text-black border-white' : 'bg-black text-white border-[#262626]'}`}>
                        {cat}
                    </button>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center py-20 text-[#616161]">
                <i className="fa-regular fa-bell text-4xl mb-4"></i>
                <p>Nenhuma atividade por enquanto</p>
            </div>
          </div>
        );
      case TabType.CREATE:
        return (
          <div className="fixed inset-0 bg-black z-[100] p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <button onClick={resetCreateTab} className="text-lg" disabled={isPosting}>Cancelar</button>
                <span className="font-bold text-lg">{isPreviewMode ? 'Visualização' : 'Novo Conecta'}</span>
                <button 
                  onClick={() => setIsPreviewMode(!isPreviewMode)} 
                  className="text-lg text-[#0095f6] font-semibold"
                  disabled={isPosting}
                >
                  {isPreviewMode ? 'Editar' : 'Visualizar'}
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {!isPreviewMode ? (
                <div className="flex gap-3">
                  <img src={MOCK_USER.avatar} className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                      <p className="font-semibold mb-1">{MOCK_USER.username}</p>
                      
                      {selectedImage && (
                        <div className="relative mb-4 mt-2 group">
                          <img 
                            src={selectedImage} 
                            alt="Preview" 
                            className="w-full rounded-xl border border-[#262626] max-h-80 object-cover" 
                          />
                          {!isPosting && (
                            <button 
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black"
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          )}
                        </div>
                      )}

                      <textarea 
                          autoFocus
                          placeholder="O que há de novo?"
                          value={contentText}
                          onChange={handleTextChange}
                          disabled={isPosting}
                          className="w-full bg-transparent border-none outline-none resize-none text-lg min-h-[100px] disabled:opacity-50"
                      ></textarea>

                      <div className="flex items-center gap-6 mt-2">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          ref={fileInputRef}
                          onChange={handleImageChange}
                        />
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="environment"
                          className="hidden" 
                          ref={cameraInputRef}
                          onChange={handleImageChange}
                        />
                        
                        {!isPosting && (
                          <div className="flex gap-4">
                            <button 
                              onClick={() => fileInputRef.current?.click()}
                              className="text-[#616161] hover:text-white transition-colors text-xl"
                              title="Galeria"
                            >
                              <i className="fa-regular fa-image"></i>
                            </button>
                            <button 
                              onClick={() => cameraInputRef.current?.click()}
                              className="text-[#616161] hover:text-white transition-colors text-xl"
                              title="Câmera"
                            >
                              <i className="fa-solid fa-camera"></i>
                            </button>
                          </div>
                        )}

                        <div className="ml-auto text-xs font-medium text-[#616161]">
                          {contentText.length} / {MAX_CHARS}
                        </div>
                      </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#121212] rounded-2xl border border-[#262626] overflow-hidden opacity-80 pointer-events-none">
                  <PostCard post={previewPost} />
                </div>
              )}
            </div>
            
            <div className="pt-4 flex justify-between items-center border-t border-[#262626]">
                <span className="text-[#616161] text-sm">Qualquer pessoa pode responder</span>
                <button 
                    onClick={handlePostSubmit}
                    disabled={(!contentText.trim() && !selectedImage) || isPosting}
                    className={`px-6 py-2 rounded-full font-bold transition-all min-w-[100px] flex items-center justify-center ${
                      (contentText.trim() || selectedImage) && !isPosting 
                      ? 'bg-white text-black cursor-pointer' 
                      : 'bg-white/30 text-black/50 cursor-not-allowed'
                    }`}
                >
                    {isPosting ? <LoadingSpinner color="border-black" /> : 'Postar'}
                </button>
            </div>
          </div>
        );
      default:
        return <HomeFeed onPostClick={openThread} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased pb-16">
      <main>
        {renderContent()}
      </main>

      {/* Thread View Overlay */}
      {selectedPostForThread && (
        <div className="fixed inset-0 bg-black z-[110] flex flex-col overflow-y-auto">
          <header className="sticky top-0 bg-black/95 backdrop-blur-md border-b border-[#262626] p-4 flex items-center z-20">
            <button onClick={closeThread} className="mr-4 text-xl">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span className="font-bold text-lg">Thread</span>
          </header>
          
          <div className="flex-1 max-w-screen-md mx-auto w-full">
            <PostCard post={selectedPostForThread} isThreadView={true} />
            
            <div className="flex flex-col">
              {MOCK_REPLIES.map((reply) => (
                <div key={reply.id} className="border-b border-[#262626] py-4 px-4 flex gap-3">
                  <div className="flex flex-col items-center">
                    <img 
                      src={reply.author.avatar} 
                      alt={reply.author.username} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="w-0.5 grow bg-[#262626] my-2 rounded-full opacity-30"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-[15px]">{reply.author.username}</span>
                      <span className="text-[#616161] text-sm">{reply.timestamp}</span>
                    </div>
                    <div className="text-[15px] leading-snug break-words">
                      {renderMarkdown(reply.content)}
                    </div>
                    <div className="flex gap-4 text-lg py-2 items-center text-[#616161]">
                      <button className="hover:text-white"><i className="fa-regular fa-heart"></i></button>
                      <button className="hover:text-white"><i className="fa-regular fa-comment"></i></button>
                      <button className="hover:text-white"><i className="fa-solid fa-arrows-rotate"></i></button>
                      <button className="hover:text-white"><i className="fa-regular fa-paper-plane"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-black border-t border-[#262626] p-4">
             <div className="max-w-screen-md mx-auto flex items-center gap-3">
               <img src={MOCK_USER.avatar} className="w-8 h-8 rounded-full" />
               <input 
                type="text" 
                placeholder={`Responder a ${selectedPostForThread.author.username}...`}
                className="bg-transparent border-none outline-none flex-1 text-sm"
               />
               <button className="text-[#0095f6] font-bold text-sm">Postar</button>
             </div>
          </div>
        </div>
      )}
      
      {/* Footer Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Decorative center icon for desktop only (floating logo) */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 hidden md:block pointer-events-none">
         <div className="w-8 h-8 threads-gradient rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
