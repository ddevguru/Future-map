
import { useState } from 'react';
import { Users, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  sessions: number;
  avatar: string;
  available: boolean;
}

export function MentorshipPanel() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Senior AI Researcher',
      company: 'DeepMind',
      expertise: ['Deep Learning', 'Computer Vision', 'Research'],
      rating: 4.9,
      sessions: 127,
      avatar: 'SC',
      available: true
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Robotics Team Lead',
      company: 'Tesla',
      expertise: ['Robotics', 'Leadership', 'Hardware'],
      rating: 4.8,
      sessions: 89,
      avatar: 'MR',
      available: false
    },
    {
      id: '3',
      name: 'Priya Patel',
      role: 'Data Science Director',
      company: 'Netflix',
      expertise: ['Data Science', 'ML Engineering', 'Strategy'],
      rating: 4.9,
      sessions: 156,
      avatar: 'PP',
      available: true
    }
  ];

  const upcomingSessions = [
    {
      mentor: 'Dr. Sarah Chen',
      topic: 'Computer Vision Fundamentals',
      time: '2:00 PM Today',
      type: 'Group Session'
    },
    {
      mentor: 'Priya Patel',
      topic: 'Career Strategy Discussion',
      time: '10:00 AM Tomorrow',
      type: '1-on-1'
    }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'available', label: 'Available' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'leadership', label: 'Leadership' }
  ];

  return (
    <div className="glass-panel p-6 hover-float">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-futuristic font-bold text-white">
          Mentorship Hub
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`
              px-3 py-1 rounded-lg text-xs font-cyber transition-all duration-200
              ${selectedFilter === filter.id
                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                : 'bg-gray-700/30 text-gray-400 hover:text-white'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Mentors Grid */}
      <div className="space-y-3 mb-6">
        {mentors.map((mentor) => (
          <Card
            key={mentor.id}
            className="glass-panel border border-gray-600/30 p-4 hover:border-green-400/30 transition-all duration-300"
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center font-cyber font-bold text-sm
                ${mentor.available 
                  ? 'bg-gradient-to-br from-green-400 to-cyan-500 text-black'
                  : 'bg-gray-600 text-gray-300'
                }
              `}>
                {mentor.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-white font-cyber font-medium text-sm">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-cyber">
                      {mentor.role} at {mentor.company}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {mentor.available ? (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Rating and Sessions */}
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-cyber">
                      {mentor.rating}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs font-cyber">
                    {mentor.sessions} sessions
                  </span>
                </div>

                {/* Expertise */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.expertise.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-md font-cyber"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 2 && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md font-cyber">
                      +{mentor.expertise.length - 2}
                    </span>
                  )}
                </div>

                <Button
                  size="sm"
                  disabled={!mentor.available}
                  className={`
                    w-full text-xs font-cyber
                    ${mentor.available
                      ? 'bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white border-0'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {mentor.available ? 'Book Session' : 'Unavailable'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-purple-400" />
          <h3 className="text-purple-400 font-cyber font-semibold text-sm">
            Upcoming Sessions
          </h3>
        </div>
        
        <div className="space-y-2">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className="glass-panel p-3 border border-purple-500/30"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-xs font-cyber font-medium">
                  {session.topic}
                </span>
                <span className={`
                  px-2 py-1 rounded text-xs font-cyber
                  ${session.type === '1-on-1' 
                    ? 'bg-cyan-400/20 text-cyan-400' 
                    : 'bg-purple-400/20 text-purple-400'
                  }
                `}>
                  {session.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs font-cyber">
                  with {session.mentor}
                </span>
                <span className="text-green-400 text-xs font-cyber">
                  {session.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
