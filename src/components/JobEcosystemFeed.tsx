
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface JobTrend {
  id: string;
  title: string;
  company: string;
  growth: number;
  demand: 'high' | 'medium' | 'low';
  salary: string;
  skills: string[];
}

export function JobEcosystemFeed() {
  const [jobs, setJobs] = useState<JobTrend[]>([
    {
      id: '1',
      title: 'AI Engineer',
      company: 'Google',
      growth: 23,
      demand: 'high',
      salary: '$140-180k',
      skills: ['Python', 'TensorFlow', 'MLOps']
    },
    {
      id: '2',
      title: 'Robotics Engineer',
      company: 'Boston Dynamics',
      growth: 18,
      demand: 'high',
      salary: '$120-160k',
      skills: ['ROS', 'C++', 'Computer Vision']
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'Meta',
      growth: 15,
      demand: 'medium',
      salary: '$130-170k',
      skills: ['Python', 'Statistics', 'SQL']
    },
    {
      id: '4',
      title: 'ML Engineer',
      company: 'Tesla',
      growth: -5,
      demand: 'medium',
      salary: '$125-165k',
      skills: ['PyTorch', 'Docker', 'AWS']
    }
  ]);

  const [liveUpdates, setLiveUpdates] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdates(prev => prev + 1);
      // Simulate live updates
      setJobs(prevJobs => 
        prevJobs.map(job => ({
          ...job,
          growth: job.growth + (Math.random() - 0.5) * 2
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass-panel p-6 hover-float h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-futuristic font-bold text-white">
          Job Ecosystem
        </h2>
        <div className="flex items-center space-x-2 text-green-400 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-cyber">LIVE</span>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-panel p-3 border border-green-400/30">
          <div className="text-green-400 text-lg font-futuristic font-bold">2.4M</div>
          <div className="text-gray-400 text-xs font-cyber">Open Positions</div>
        </div>
        <div className="glass-panel p-3 border border-cyan-400/30">
          <div className="text-cyan-400 text-lg font-futuristic font-bold">+12%</div>
          <div className="text-gray-400 text-xs font-cyber">Growth Rate</div>
        </div>
      </div>

      {/* Trending Jobs */}
      <div className="space-y-3">
        <h3 className="text-purple-400 font-cyber font-semibold text-sm mb-3">
          Trending Opportunities
        </h3>
        
        {jobs.map((job, index) => (
          <Card
            key={job.id}
            className="glass-panel border border-gray-600/30 p-4 hover:border-cyan-400/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-white font-cyber font-medium text-sm">
                  {job.title}
                </h4>
                <p className="text-gray-400 text-xs font-cyber">
                  {job.company}
                </p>
              </div>
              
              <div className="flex items-center space-x-1">
                {job.growth > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
                <span className={`text-xs font-futuristic ${
                  job.growth > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {job.growth > 0 ? '+' : ''}{job.growth.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-400 text-sm font-cyber">
                {job.salary}
              </span>
              <span className={`px-2 py-1 rounded-md text-xs font-cyber ${getDemandColor(job.demand)}`}>
                {job.demand} demand
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-md font-cyber"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Skill Heatmap */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-purple-400 font-cyber font-semibold text-sm mb-3">
          Skill Demand Heatmap
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {['Python', 'AI/ML', 'React', 'Cloud', 'DevOps', 'Data'].map((skill, index) => (
            <div key={skill} className="flex items-center justify-between py-1">
              <span className="text-gray-300 text-xs font-cyber">{skill}</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-sm ${
                      i < (index % 4) + 2 ? 'bg-cyan-400' : 'bg-gray-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
