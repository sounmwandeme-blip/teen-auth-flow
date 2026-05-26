import React from 'react';
import TopHeader from '@/components/layout/TopHeader';
import PostCard from '@/components/feed/PostCard';
import { useSocialStore } from '@/hooks/useSocialStore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Home: React.FC = () => {
  const { posts, users } = useSocialStore();

  return (
    <div className="min-h-screen pb-16">
      <TopHeader />
      
      <div className="flex gap-4 p-4 overflow-x-auto border-b border-border no-scrollbar">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="p-[2px] rounded-full bg-background">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <span className="text-[10px] text-center w-16 truncate">{user.username}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            user={users.find(u => u.id === post.userId)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;