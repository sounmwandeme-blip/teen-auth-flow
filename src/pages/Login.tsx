import React, { useState } from 'react';
import { useSocialStore } from '@/hooks/useSocialStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { login, register } = useSocialStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (!formData.username || !formData.password || !formData.fullName) {
          toast.error("Please fill in all required fields");
          return;
        }
        register(formData);
        toast.success(`Welcome to Teengram, ${formData.username}!`);
      } else {
        if (!formData.username || !formData.password) {
          toast.error("Please enter username and password");
          return;
        }
        login(formData.username, formData.password);
        toast.success(`Welcome back, ${formData.username}!`);
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <h1 className="text-5xl font-serif italic mb-8">Teengram</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        {isSignUp && (
          <>
            <Input 
              name="fullName"
              placeholder="Full Name" 
              className="bg-muted/50 border-border h-11"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <Input 
              name="bio"
              placeholder="Bio (Short description)" 
              className="bg-muted/50 border-border h-11"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </>
        )}
        <Input 
          name="username"
          placeholder="Username" 
          className="bg-muted/50 border-border h-11"
          value={formData.username}
          onChange={handleInputChange}
        />
        <Input 
          name="password"
          type="password" 
          placeholder="Password" 
          className="bg-muted/50 border-border h-11"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 font-bold h-11 text-white">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </Button>
        
        <div className="flex items-center gap-4 my-4">
          <div className="h-[1px] bg-border flex-1"></div>
          <span className="text-muted-foreground text-[10px] font-bold uppercase">OR</span>
          <div className="h-[1px] bg-border flex-1"></div>
        </div>

        <button type="button" className="w-full text-indigo-900 dark:text-sky-400 font-semibold text-sm">
          Log in with Facebook
        </button>
      </form>

      <div className="mt-8 w-full max-w-sm border border-border p-6 text-center text-sm">
        {isSignUp ? (
          <>
            Have an account? <button onClick={() => setIsSignUp(false)} className="text-sky-500 font-semibold">Log in</button>
          </>
        ) : (
          <>
            Don't have an account? <button onClick={() => setIsSignUp(true)} className="text-sky-500 font-semibold">Sign up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;