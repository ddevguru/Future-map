import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function DashboardHeader() {
  const firstName = localStorage.getItem('firstName') || 'User';
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/settings');
  };

  return (
    <header className="glass-panel border-b border-cyan-400/20 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-futuristic font-bold neon-text ml-10">
            Welcome, {firstName}
          </h1>
          <p className="text-gray-400 font-cyber ml-10">
            Your personalized career journey overview
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            onClick={handleProfileClick}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}