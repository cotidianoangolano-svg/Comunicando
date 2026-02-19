
import React, { useState } from 'react';
import { Post } from '../types';
import { MOCK_USER } from '../constants';

interface HistoryEntry {
  content: string;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
  onPostClick?: (post: Post) => void;
  isThreadView?: boolean;
}

// Loading Spinner Component
export const LoadingSpinner: React.FC<{ size?: string; color?: string }> = ({ 
  size = "w-4 h-4", 
  color = "border-white" 
}) => (
  <div className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`}></div>
);

// Simple Markdown parser for Bold and Italics
export const renderMarkdown = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
    } else if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

// Internal mock for replies
export const MOCK_REPLIES = [
  {
    id: 'r1',
    author: {
      username: 'code_wizard',
      avatar: 'https://picsum.photos/seed/r1/100/100',
    },
    content: 'Sensacional! O **modo escuro** realmente faz a diferença na leitura.',
    timestamp: '1h'
  },
  {
    id: 'r2',
    author: {
      username: 'design_ninja',
      avatar: 'https://picsum.photos/seed/r2/100/100',
    },
    content: 'As animações de clique estão *muito* fluidas. Parabéns!',
    timestamp: '45min'
  }
];

const PostCard: React.FC<PostCardProps> = ({ post, onPostClick, isThreadView = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);
  const [showReplies, setShowReplies] = useState(isThreadView);
  const [replies] = useState(MOCK_REPLIES);
  
  // Editing and History state
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [currentContent, setCurrentContent] = useState(post.content);
  const [editHistory, setEditHistory] = useState<HistoryEntry[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const isOwnPost = post.author.id === MOCK_USER.id;

  const handleFeatureNotImplemented = (feature: string) => {
    alert(`${feature}: Funcionalidade em desenvolvimento`);
  };

  const handleReplyToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPostClick && !isThreadView) {
      onPostClick(post);
    } else {
      setShowReplies(!showReplies);
    }
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Try to use native share if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post de ${post.author.username} no CONECTA+`,
          text: currentContent,
          url: window.location.href,
        });
      } catch (err) {
        console.debug('Error sharing', err);
      }
    } else {
      // Fallback for browsers without navigator.share
      alert('Funcionalidade de compartilhamento em desenvolvimento');
    }
  };

  const handleLikesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Like view functionality not implemented yet.');
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiking) return;

    setIsLiking(true);
    // Simulate API delay
    setTimeout(() => {
      if (isLiked) {
        setLikesCount(prev => prev - 1);
      } else {
        setLikesCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
      setIsLiking(false);
    }, 600);
  };

  const handleEditStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editContent !== currentContent) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setEditHistory(prev => [{ content: currentContent, timestamp: now }, ...prev]);
      setCurrentContent(editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditContent(currentContent);
    setIsEditing(false);
  };

  const toggleHistoryModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHistoryModal(!showHistoryModal);
  };

  return (
    <div 
      onClick={() => !isEditing && onPostClick && onPostClick(post)}
      className={`border-b border-[#262626] py-4 px-4 flex flex-col ${onPostClick && !isEditing ? 'cursor-pointer' : ''}`}
    >
      <div className="flex gap-3">
        {/* Avatar Column */}
        <div className="flex flex-col items-center">
          <img 
            src={post.author.avatar} 
            alt={post.author.username} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className={`w-0.5 grow bg-[#262626] my-2 rounded-full ${showReplies ? 'opacity-100' : 'opacity-30'}`}></div>
          {!showReplies && (
            <div className="relative w-10 h-6 flex justify-center">
                <div className="absolute left-1 bottom-0 w-4 h-4 rounded-full border-2 border-black bg-gray-600"></div>
                <div className="absolute right-1 bottom-0 w-3 h-3 rounded-full border-2 border-black bg-gray-400"></div>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[15px] hover:underline cursor-pointer">
                {post.author.username}
              </span>
              {post.author.verified && (
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#0095f6]">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[#616161] text-sm">{post.timestamp}</span>
                {editHistory.length > 0 && (
                  <button 
                    onClick={toggleHistoryModal}
                    className="text-[10px] bg-[#1e1e1e] text-[#616161] px-1.5 py-0.5 rounded border border-[#262626] hover:text-white transition-colors"
                  >
                    Editado
                  </button>
                )}
              </div>
              <div className="flex gap-2 items-center">
                {isOwnPost && !isEditing && (
                  <button 
                    onClick={handleEditStart}
                    className="text-xs text-[#0095f6] font-semibold hover:underline"
                  >
                    Editar
                  </button>
                )}
                <button onClick={(e) => { e.stopPropagation(); }} className="text-[#616161]">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="mb-3" onClick={(e) => e.stopPropagation()}>
              <textarea 
                className="w-full bg-[#1e1e1e] text-white border border-[#262626] rounded-lg p-3 outline-none focus:border-[#444] min-h-[100px] resize-none text-[15px]"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button 
                  onClick={handleCancelEdit}
                  className="px-4 py-1 text-sm font-semibold text-[#616161] hover:text-white"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="px-4 py-1 text-sm font-semibold bg-white text-black rounded-full"
                >
                  Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[15px] leading-snug mb-3 break-words">
              {renderMarkdown(currentContent)}
            </div>
          )}

          {post.image && (
            <div className="rounded-xl border border-[#262626] overflow-hidden mb-3">
              <img src={post.image} alt="post" className="w-full object-cover max-h-[400px]" />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 text-xl py-2 items-center">
            <button 
              onClick={handleLikeToggle}
              disabled={isLiking}
              className={`w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform active:scale-90 ${isLiked ? 'text-[#ff3040]' : 'text-white'}`}
            >
              {isLiking ? (
                <LoadingSpinner size="w-3 h-3" color={isLiked ? 'border-[#ff3040]' : 'border-white'} />
              ) : (
                <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
              )}
            </button>
            <button 
              onClick={handleReplyToggle}
              className={`flex items-center gap-1.5 hover:scale-110 transition-transform active:scale-90 text-white`}
            >
              <i className={(showReplies || isThreadView) ? "fa-solid fa-comment" : "fa-regular fa-comment"}></i>
              {post.replies > 0 && <span className="text-sm font-medium">{post.replies}</span>}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleFeatureNotImplemented('Republicar'); }}
              className="hover:scale-110 transition-transform active:scale-90"
            >
              <i className="fa-solid fa-arrows-rotate text-lg"></i>
            </button>
            <button 
              onClick={handleShareClick}
              className="hover:scale-110 transition-transform active:scale-90"
            >
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-3 text-sm text-[#616161] mt-1 items-center">
            <button 
              onClick={handleReplyToggle}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>{post.replies} respostas</span>
            </button>
            <span className="select-none">•</span>
            <button 
               onClick={handleLikesClick}
               className="hover:text-white transition-colors outline-none"
            >
              {likesCount.toLocaleString()} curtidas
            </button>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={toggleHistoryModal}
        >
          <div 
            className="bg-[#121212] border border-[#262626] rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#262626] flex justify-between items-center">
              <h3 className="font-bold text-lg">Histórico de Edições</h3>
              <button onClick={toggleHistoryModal} className="text-[#616161] hover:text-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[60vh] p-4">
              <div className="flex flex-col gap-6">
                {/* Current Version */}
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#0095f6]"></div>
                  <div className="absolute left-[3.5px] top-4 bottom-[-24px] w-[1px] bg-[#262626]"></div>
                  <div className="text-xs text-[#0095f6] font-bold mb-1 uppercase tracking-wider">Versão Atual</div>
                  <div className="text-sm text-white/90 bg-white/5 p-3 rounded-lg border border-white/10">
                    {renderMarkdown(currentContent)}
                  </div>
                </div>

                {/* Past Versions */}
                {editHistory.map((entry, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#444]"></div>
                    {idx < editHistory.length - 1 && (
                      <div className="absolute left-[3.5px] top-4 bottom-[-24px] w-[1px] bg-[#262626]"></div>
                    )}
                    <div className="text-xs text-[#616161] mb-1 font-medium">Editado às {entry.timestamp}</div>
                    <div className="text-sm text-[#999] p-3 rounded-lg border border-[#262626]">
                      {renderMarkdown(entry.content)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-[#181818] text-center">
              <button 
                onClick={toggleHistoryModal}
                className="w-full py-2 bg-white text-black font-bold rounded-xl active:scale-[0.98] transition-transform"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replies Thread Section - only shown inline if not in full thread view OR specifically toggled */}
      {showReplies && !isThreadView && (
        <div className="mt-4 flex flex-col gap-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-[#262626] ml-5">
              <img 
                src={reply.author.avatar} 
                alt={reply.author.username} 
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-semibold text-sm hover:underline cursor-pointer">
                    {reply.author.username}
                  </span>
                  <span className="text-[#616161] text-xs">{reply.timestamp}</span>
                </div>
                <div className="text-sm leading-snug break-words">
                  {renderMarkdown(reply.content)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
