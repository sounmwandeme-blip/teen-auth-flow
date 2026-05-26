import React from 'react';
import { useSocialStore } from '@/hooks/useSocialStore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Grid, Bookmark, User as UserIcon, Settings, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser, logout, users, posts } = useSocialStore();

  if (!currentUser) return null;

  const invitedCount = users.filter(u => u.isInvited).length;

  return (
    <div className="min-h-screen pb-16">
      <header className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-background z-40">
        <h1 className="text-xl font-bold">{currentUser.username}</h1>
        <div className="flex gap-4">
          <Settings size={24} />
          <LogOut size={24} className="text-destructive cursor-pointer" onClick={logout} />
        </div>
      </header>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex gap-6 text-center">
            <div>
              <p className="font-bold">0</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="font-bold">{invitedCount}</p>
              <p className="text-xs text-muted-foreground">Invites</p>
            </div>
            <div>
              <p className="font-bold">243</p>
              <p className="text-xs text-muted-foreground">Invited By</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-bold text-sm">{currentUser.fullName}</p>
          <p className="text-sm whitespace-pre-wrap">{currentUser.bio}</p>
        </div>

        <div className="flex gap-2 mb-8">
          <Button variant="secondary" className="flex-1 font-semibold h-8 text-xs">Edit Profile</Button>
          <Button variant="secondary" className="flex-1 font-semibold h-8 text-xs">Share Profile</Button>
        </div>
      </div>

      <div className="flex border-t border-border">
        <button className="flex-1 py-3 flex justify-center border-b-2 border-foreground">
          <Grid size={24} />
        </button>
        <button className="flex-1 py-3 flex justify-center text-muted-foreground">
          <Bookmark size={24} />
        </button>
        <button className="flex-1 py-3 flex justify-center text-muted-foreground">
          <UserIcon size={24} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-[2px]">
        {posts.map((p, i) => (
          <div key={i} className="aspect-square bg-muted overflow-hidden">
             <img src={p.imageUrl} alt="post" className="w-full h-full object-cover opacity-50 grayscale" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;