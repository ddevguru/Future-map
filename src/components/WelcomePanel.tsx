import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Target, BookOpen, Users } from 'lucide-react';

// Mock authentication check (replace with your actual auth logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Replace with your auth logic
};

export function WelcomePanel() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProtectedAction = (destination) => {
    if (isAuthenticated()) {
      navigate(destination);
    } else {
      navigate('/login');
    }
  };

  return (
    <Card 
      className="glass-panel border-cyan-400/20 overflow-hidden relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-8">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-futuristic font-bold text-white mb-1">
                Welcome to Your Future
              </h2>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                AI-Powered Career Guidance
              </Badge>
            </div>
          </div>

          <p className="text-gray-300 font-cyber text-lg mb-8 leading-relaxed">
            Embark on a personalized journey to discover, plan, and achieve your dream career. 
            Our AI-powered platform guides you through every step of your academic and professional path.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-futuristic text-white text-sm">Smart Matching</h3>
              <p className="text-gray-400 font-cyber text-xs">AI finds your perfect career fit</p>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-futuristic text-white text-sm">Guided Learning</h3>
              <p className="text-gray-400 font-cyber text-xs">Step-by-step educational paths</p>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-futuristic text-white text-sm">Expert Network</h3>
              <p className="text-gray-400 font-cyber text-xs">Connect with industry mentors</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => handleProtectedAction('/dashboard')}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-futuristic py-6 text-lg group"
            >
              Start Your Journey
              <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                isHovered ? 'translate-x-1' : ''
              }`} />
            </Button>
            
            <Button 
              onClick={() => handleProtectedAction('/dashboard')}
              variant="outline" 
              className="flex-1 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 font-futuristic py-6 text-lg"
            >
              View Dashboard
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700/50">
            <div className="text-center">
              <div className="text-2xl font-futuristic text-cyan-400">500+</div>
              <div className="text-gray-400 font-cyber text-xs">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-futuristic text-purple-400">1000+</div>
              <div className="text-gray-400 font-cyber text-xs">Institutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-futuristic text-green-400">200+</div>
              <div className="text-gray-400 font-cyber text-xs">Mentors</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}