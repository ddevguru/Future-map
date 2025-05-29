
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUp, Users, Star } from 'lucide-react';

export function AICareerArchitect() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [careerPaths, setCareerPaths] = useState([
    {
      id: 1,
      title: 'Senior Robotics Engineer',
      company: 'Tesla',
      timeline: '3-5 years',
      match: 92,
      skills: ['ROS', 'Python', 'Computer Vision', 'ML'],
      description: 'Lead autonomous vehicle perception systems'
    },
    {
      id: 2,
      title: 'AI Research Scientist',
      company: 'OpenAI',
      timeline: '4-6 years',
      match: 87,
      skills: ['Deep Learning', 'PyTorch', 'Research', 'Mathematics'],
      description: 'Develop next-gen AI models and algorithms'
    },
    {
      id: 3,
      title: 'Robotics Team Lead',
      company: 'Boston Dynamics',
      timeline: '2-4 years',
      match: 89,
      skills: ['Leadership', 'Robotics', 'C++', 'Project Management'],
      description: 'Manage robotics development teams'
    }
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="glass-panel p-6 hover-float">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-black font-futuristic font-bold">AI</span>
        </div>
        <h2 className="text-2xl font-futuristic font-bold text-white">
          AI Career Architect
        </h2>
      </div>

      {/* Prompt Input */}
      <div className="mb-6">
        <div className="relative">
          <textarea
            className="w-full bg-black/20 border border-cyan-400/30 rounded-xl p-4 text-white placeholder-gray-400 font-cyber resize-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            rows={3}
            placeholder="Describe your dream career... (e.g., 'I want to work in robotics and lead a team of engineers developing autonomous systems')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="absolute bottom-3 right-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 font-cyber"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              'Generate Paths'
            )}
          </Button>
        </div>
      </div>

      {/* Generated Career Paths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {careerPaths.map((path, index) => (
          <Card
            key={path.id}
            className="glass-panel border border-purple-500/30 p-4 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer hover-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-cyber font-semibold text-sm mb-1">
                  {path.title}
                </h3>
                <p className="text-purple-400 text-xs font-cyber">
                  {path.company}
                </p>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-futuristic font-bold text-lg">
                  {path.match}%
                </div>
                <div className="text-gray-400 text-xs">match</div>
              </div>
            </div>

            <p className="text-gray-300 text-xs mb-3 font-cyber">
              {path.description}
            </p>

            <div className="space-y-2 mb-3">
              <div className="flex items-center text-xs">
                <ArrowUp className="w-3 h-3 text-cyan-400 mr-1" />
                <span className="text-gray-400 font-cyber">Timeline: {path.timeline}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {path.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-md font-cyber"
                >
                  {skill}
                </span>
              ))}
              {path.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md font-cyber">
                  +{path.skills.length - 3}
                </span>
              )}
            </div>

            {/* Action */}
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 font-cyber text-xs"
            >
              Explore Path
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
