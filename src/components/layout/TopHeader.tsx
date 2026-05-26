import React from 'react';
import { MessageCircle, Camera } from 'lucide-react';
import { toast } from 'sonner';

const TopHeader: React.FC = () => {
  return (
    <header className="sticky top-0 left-0 right-0 bg-background border-b border-border px-4 py-2 flex justify-between items-center z-50">
      <Camera size={24} className="cursor-pointer" onClick={() => toast.info("Camera coming soon!")} />
      <h1 className="text-2xl font-bold font-serif tracking-tight italic">Teengram</h1>
      <MessageCircle size={24} className="cursor-pointer" onClick={() => toast.info("Direct messages coming soon!")} />
    </header>
  );
};

export default TopHeader;