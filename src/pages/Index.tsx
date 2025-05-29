import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { WelcomePanel } from '@/components/WelcomePanel';
import { AICareerArchitect } from '@/components/AICareerArchitect';
import { SkillGalaxy } from '@/components/SkillGalaxy';
import { JobEcosystemFeed } from '@/components/JobEcosystemFeed';
import { MentorshipPanel } from '@/components/MentorshipPanel';
import { GamificationBanner } from '@/components/GamificationBanner';

// Mock authentication check (replace with your actual auth logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Replace with your auth logic
};

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProtectedAction = (destination) => {
    if (isAuthenticated()) {
      navigate(destination);
    } else {
      navigate('/login');
    }
  };

  const handleStartJourney = () => {
    handleProtectedAction('/dashboard');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-cyan-400 font-futuristic text-xl">
          Initializing AI Career Architect...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <HamburgerMenu />
      
      <main className="relative z-10">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-futuristic font-bold neon-text mb-2">
                AI Career Architect
              </h1>
              <p className="text-gray-400 font-cyber">
                Forge your future with intelligent career guidance
              </p>
            </div>
            <div className="glass-panel px-4 py-2">
              <span className="text-cyan-400 font-futuristic text-sm">
                Neural Network: ACTIVE
              </span>
            </div>
          </div>

          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WelcomePanel />
            </div>
            <div>
              <GamificationBanner />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-6">
              <AICareerArchitect />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SkillGalaxy />
                <MentorshipPanel />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <JobEcosystemFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;