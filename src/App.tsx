import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useSocialStore } from '@/hooks/useSocialStore';
import BottomNav from '@/components/layout/BottomNav';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Activity from '@/pages/Activity';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';

function App() {
  const { currentUser } = useSocialStore();

  if (!currentUser) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto min-h-screen bg-background text-foreground shadow-2xl relative border-x border-border">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <BottomNav />
        <Toaster position="top-center" richColors />
      </div>
    </BrowserRouter>
  );
}

export default App;