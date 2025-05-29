
import { TrendingUp, Target, Clock, Trophy } from 'lucide-react';

const stats = [
  {
    title: 'Career Progress',
    value: '68%',
    change: '+12%',
    icon: TrendingUp,
    color: 'cyan'
  },
  {
    title: 'Goals Completed',
    value: '12/18',
    change: '+3',
    icon: Target,
    color: 'green'
  },
  {
    title: 'Study Hours',
    value: '156h',
    change: '+24h',
    icon: Clock,
    color: 'purple'
  },
  {
    title: 'Achievements',
    value: '8',
    change: '+2',
    icon: Trophy,
    color: 'orange'
  }
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.title}
            className={`glass-panel p-6 border border-${stat.color}-400/30 hover:border-${stat.color}-400/50 
                       transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer
                       animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-400/20 rounded-lg flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <span className={`text-sm font-cyber text-${stat.color}-400`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-futuristic font-bold text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-400 font-cyber text-sm">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
