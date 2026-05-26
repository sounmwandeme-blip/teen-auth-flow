import React from 'react';
import { useSocialStore } from '@/hooks/useSocialStore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Activity: React.FC = () => {
  const { notifications, users, toggleInvite } = useSocialStore();

  return (
    <div className="min-h-screen pb-16">
      <div className="p-4 border-b border-border sticky top-0 bg-background z-40">
        <h1 className="text-xl font-bold">Activity</h1>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="font-semibold mb-4">New</h2>
          <div className="space-y-4">
            {notifications.map((notif) => {
              const user = users.find(u => u.id === notif.userId) || users[0];
              return (
                <div key={notif.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <span className="font-bold">{user.username}</span>{' '}
                      {notif.type === 'invite' && 'invited you to their circle.'}
                      {notif.type === 'like' && 'liked your post.'}
                      {notif.type === 'comment' && 'commented on your photo.'}
                      <span className="text-muted-foreground ml-1">{notif.timestamp}</span>
                    </div>
                  </div>
                  {notif.type === 'invite' && (
                    <Button 
                      size="sm" 
                      variant={user.isInvited ? "secondary" : "default"}
                      className={`h-8 px-4 font-semibold text-xs ${!user.isInvited ? 'bg-sky-500 hover:bg-sky-600 text-white' : ''}`}
                      onClick={() => toggleInvite(user.id)}
                    >
                      {user.isInvited ? 'Following' : 'Follow Back'}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;