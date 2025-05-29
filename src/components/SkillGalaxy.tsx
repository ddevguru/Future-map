
import { useState } from 'react';
import { Star } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  status: 'mastered' | 'learning' | 'locked';
  position: { x: number; y: number };
}

export function SkillGalaxy() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const skills: Skill[] = [
    { id: '1', name: 'Python', level: 85, status: 'mastered', position: { x: 50, y: 30 } },
    { id: '2', name: 'Machine Learning', level: 70, status: 'learning', position: { x: 30, y: 50 } },
    { id: '3', name: 'Deep Learning', level: 45, status: 'learning', position: { x: 70, y: 40 } },
    { id: '4', name: 'Computer Vision', level: 0, status: 'locked', position: { x: 60, y: 70 } },
    { id: '5', name: 'NLP', level: 60, status: 'learning', position: { x: 25, y: 75 } },
    { id: '6', name: 'Data Science', level: 90, status: 'mastered', position: { x: 80, y: 60 } },
    { id: '7', name: 'Statistics', level: 75, status: 'mastered', position: { x: 40, y: 25 } },
    { id: '8', name: 'SQL', level: 95, status: 'mastered', position: { x: 15, y: 40 } },
  ];

  const getSkillColor = (skill: Skill) => {
    switch (skill.status) {
      case 'mastered': return 'text-green-400 border-green-400/50 bg-green-400/10';
      case 'learning': return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10';
      case 'locked': return 'text-gray-500 border-gray-500/30 bg-gray-500/5';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass-panel p-6 hover-float">
      <div className="flex items-center space-x-3 mb-6">
        <Star className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-futuristic font-bold text-white">
          Skill Galaxy
        </h2>
      </div>

      {/* Interactive Skill Map */}
      <div className="relative h-80 rounded-xl bg-black/20 border border-purple-500/30 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Skills */}
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`
              absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
              transition-all duration-300 hover:scale-110 group
            `}
            style={{
              left: `${skill.position.x}%`,
              top: `${skill.position.y}%`,
            }}
            onClick={() => setSelectedSkill(skill)}
          >
            {/* Skill Node */}
            <div className={`
              w-12 h-12 rounded-full border-2 flex items-center justify-center
              font-cyber font-bold text-xs transition-all duration-300
              ${getSkillColor(skill)}
              ${selectedSkill?.id === skill.id ? 'scale-125 animate-pulse' : ''}
            `}>
              {skill.level}
            </div>

            {/* Skill Name */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-white text-xs font-cyber bg-black/50 px-2 py-1 rounded">
                {skill.name}
              </span>
            </div>

            {/* Connection Lines */}
            {skill.status !== 'locked' && (
              <div className="absolute inset-0 pointer-events-none">
                <div className={`
                  w-0.5 h-8 bg-gradient-to-b from-transparent 
                  ${skill.status === 'mastered' ? 'to-green-400/30' : 'to-cyan-400/30'}
                  transform rotate-45
                `}></div>
              </div>
            )}
          </div>
        ))}

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Skill Details */}
      {selectedSkill && (
        <div className="mt-4 glass-panel p-4 border border-cyan-400/30 animate-slide-in">
          <h3 className="text-cyan-400 font-cyber font-semibold mb-2">
            {selectedSkill.name}
          </h3>
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-gray-400 text-sm font-cyber">
              Level: {selectedSkill.level}%
            </span>
            <span className={`text-sm font-cyber capitalize ${
              selectedSkill.status === 'mastered' ? 'text-green-400' :
              selectedSkill.status === 'learning' ? 'text-cyan-400' : 'text-gray-500'
            }`}>
              {selectedSkill.status}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                selectedSkill.status === 'mastered' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                selectedSkill.status === 'learning' ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' :
                'bg-gray-600'
              }`}
              style={{ width: `${selectedSkill.level}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center space-x-6 text-xs font-cyber">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-gray-400">Mastered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span className="text-gray-400">Learning</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-gray-400">Locked</span>
        </div>
      </div>
    </div>
  );
}
