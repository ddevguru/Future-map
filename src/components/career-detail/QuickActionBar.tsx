
import { Button } from '@/components/ui/button';
import { Plus, GitCompare, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionBarProps {
  career: {
    title: string;
    id: string;
  };
}

export function QuickActionBar({ career }: QuickActionBarProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0 z-50 glass-panel border-t border-cyan-400/20 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-white font-cyber text-lg">
              Ready to pursue {career.title}?
            </h3>
            <p className="text-gray-400 text-sm font-cyber">
              Take action now to start your journey
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button 
              onClick={() => navigate('/career-builder')}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-cyber transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to My Career Plan
            </Button>

            <Button 
              onClick={() => navigate('/compare-careers')}
              variant="outline" 
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 font-cyber transition-all duration-300 hover:scale-105"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Careers
            </Button>

            <Button 
              onClick={() => navigate('/mentor-community')}
              variant="outline" 
              className="border-purple-400/30 text-purple-400 hover:bg-purple-400/20 font-cyber transition-all duration-300 hover:scale-105"
            >
              <Users className="w-4 h-4 mr-2" />
              Find Mentors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
