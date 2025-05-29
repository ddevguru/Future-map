
import { Plus, Target, BookOpen, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const actions = [
  {
    title: 'Add Goal',
    description: 'Set a new career milestone',
    icon: Plus,
    color: 'cyan',
    action: '/career-builder'
  },
  {
    title: 'Take Assessment',
    description: 'Discover your strengths',
    icon: Target,
    color: 'purple',
    action: '/career-detail'
  },
  {
    title: 'Browse Courses',
    description: 'Find learning opportunities',
    icon: BookOpen,
    color: 'green',
    action: '/institutes'
  },
  {
    title: 'Join Community',
    description: 'Connect with mentors',
    icon: Users,
    color: 'orange',
    action: '/mentor-community'
  },
  {
    title: 'Schedule Session',
    description: 'Book mentor time',
    icon: Calendar,
    color: 'blue',
    action: '/schedule'
  }
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="glass-panel p-6 border border-cyan-400/30">
      <h2 className="text-xl font-futuristic font-bold text-white mb-6">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.title}
              variant="ghost"
              onClick={() => navigate(action.action)}
              className={`p-4 h-auto flex-col items-start text-left glass-panel border border-${action.color}-400/30 
                         hover:border-${action.color}-400/50 hover:bg-${action.color}-400/10 
                         transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-10 h-10 bg-${action.color}-400/20 rounded-lg flex items-center justify-center mb-3`}>
                <IconComponent className={`w-5 h-5 text-${action.color}-400`} />
              </div>
              <h3 className="font-cyber font-medium text-white mb-1">
                {action.title}
              </h3>
              <p className="text-gray-400 text-sm font-cyber">
                {action.description}
              </p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
