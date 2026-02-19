
import React from 'react';
import { MOCK_POSTS } from '../constants';
import PostCard from './PostCard';
import { Post } from '../types';

interface HomeFeedProps {
  onPostClick: (post: Post) => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ onPostClick }) => {
  return (
    <div className="w-full max-w-screen-md mx-auto pb-20">
      <header className="py-4 flex justify-center sticky top-0 bg-black/90 z-10">
        <span className="text-2xl font-bold tracking-tighter">CONECTA+</span>
      </header>
      
      {/* Post Input (Visual Only) */}
      <div className="border-b border-[#262626] px-4 py-4 hidden md:flex gap-3 cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0"></div>
        <div className="flex-1 flex items-center">
            <span className="text-[#616161]">O que há de novo?</span>
        </div>
        <button className="bg-white text-black px-4 py-1 rounded-full font-semibold text-sm">Postar</button>
      </div>

      <div className="flex flex-col">
        {MOCK_POSTS.map(post => (
          <PostCard key={post.id} post={post} onPostClick={onPostClick} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
