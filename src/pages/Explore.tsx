import React, { useState } from 'react';
import { useSocialStore } from '@/hooks/useSocialStore';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

const Explore: React.FC = () => {
  const { users, toggleInvite } = useSocialStore();
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-16">
      <div className="p-4 sticky top-0 bg-background z-40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            className="pl-10 bg-muted/50 border-none h-9" 
            placeholder="Search teens to invite..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 p-1">
        {users.map((user, i) => (
          <div key={user.id} className={`aspect-square bg-muted overflow-hidden relative group`}>
             <img 
               src={`https://picsum.photos/seed/${user.id}${i}/400/400`} 
               alt="explore" 
               className="w-full h-full object-cover"
             />
          </div>
        ))}
      </div>

      <div className="mt-6 px-4">
        <h2 className="font-bold mb-4">Suggested for you</h2>
        <div className="space-y-4">
          {filteredUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.fullName}</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={user.isInvited ? "secondary" : "default"}
                className={`h-8 px-4 font-semibold text-xs ${!user.isInvited ? 'bg-sky-500 hover:bg-sky-600 text-white' : ''}`}
                onClick={() => {
                  toggleInvite(user.id);
                  toast.success(user.isInvited ? `Uninvited ${user.username}` : `Invited ${user.username}!`);
                }}
              >
                {user.isInvited ? 'Uninvite' : 'Invite'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;