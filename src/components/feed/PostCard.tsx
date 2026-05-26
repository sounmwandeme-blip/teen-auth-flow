import React from 'react';
import { Post, User } from '@/types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
  user: User | undefined;
}

const PostCard: React.FC<PostCardProps> = ({ post, user }) => {
  if (!user) return null;

  return (
    <div className="bg-background border-b border-border pb-4 mb-4">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">{user.username}</span>
        </div>
        <MoreHorizontal size={20} className="text-muted-foreground" />
      </div>

      <div className="aspect-square w-full bg-muted overflow-hidden">
        <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart size={24} className="cursor-pointer hover:text-destructive transition-colors" />
            <MessageCircle size={24} className="cursor-pointer" onClick={() => toast.info("Comments opened")} />
            <Send size={24} className="cursor-pointer" onClick={() => toast.success("Shared!")} />
          </div>
          <Bookmark size={24} className="cursor-pointer" />
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-sm">{post.likes} likes</p>
          <p className="text-sm">
            <span className="font-semibold mr-2">{user.username}</span>
            {post.caption}
          </p>
          <p className="text-xs text-muted-foreground uppercase mt-1">{post.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;