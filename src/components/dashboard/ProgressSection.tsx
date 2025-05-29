
import { ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const currentGoals = [
  {
    title: 'Complete Data Science Course',
    progress: 75,
    deadline: '2 weeks left',
    priority: 'high'
  },
  {
    title: 'Prepare for JEE Advanced',
    progress: 45,
    deadline: '1 month left',
    priority: 'medium'
  },
  {
    title: 'Build Portfolio Website',
    progress: 30,
    deadline: '3 weeks left',
    priority: 'low'
  }
];

export function ProgressSection() {
  const navigate = useNavigate();

  return (
    <div className="glass-panel p-6 border border-cyan-400/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-futuristic font-bold text-white">
          Current Progress
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/career-builder')}
          className="text-cyan-400 hover:bg-cyan-400/20 transition-all duration-300 hover:scale-105"
        >
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {currentGoals.map((goal, index) => (
          <div 
            key={goal.title}
            className="p-4 bg-black/20 rounded-lg border border-gray-700/50 hover:border-cyan-400/30 
                       transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-cyber font-medium text-white">{goal.title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-cyber ${
                  goal.priority === 'high' ? 'bg-red-400/20 text-red-400' :
                  goal.priority === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-green-400/20 text-green-400'
                }`}>
                  {goal.priority}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-8 h-8 hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300"
                >
                  <Play className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex-1 mr-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-gray-400 font-cyber">{goal.progress}%</span>
              <span className="text-gray-500 font-cyber ml-4">{goal.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
