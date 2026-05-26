import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, User, PlusSquare } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-3 flex justify-between items-center z-50">
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-foreground' : 'text-muted-foreground'}>
        <Home size={26} />
      </NavLink>
      <NavLink to="/explore" className={({ isActive }) => isActive ? 'text-foreground' : 'text-muted-foreground'}>
        <Search size={26} />
      </NavLink>
      <button className="text-foreground">
        <PlusSquare size={26} />
      </button>
      <NavLink to="/activity" className={({ isActive }) => isActive ? 'text-foreground' : 'text-muted-foreground'}>
        <Heart size={26} />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-foreground' : 'text-muted-foreground'}>
        <User size={26} />
      </NavLink>
    </nav>
  );
};

export default BottomNav;