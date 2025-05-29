
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, GraduationCap, Target } from 'lucide-react';

interface EntryPath {
  id: string;
  title: string;
  duration: string;
  steps: string[];
  eligibility: string;
  difficulty: string;
}

interface EntryPathsCardsProps {
  paths: EntryPath[];
  selectedPath: string | null;
  onPathSelect: (pathId: string) => void;
}

export function EntryPathsCards({ paths, selectedPath, onPathSelect }: EntryPathsCardsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'high': return 'border-red-400/30 bg-red-500/10';
      case 'medium': return 'border-yellow-400/30 bg-yellow-500/10';
      case 'low': return 'border-green-400/30 bg-green-500/10';
      default: return 'border-gray-400/30 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-futuristic font-bold neon-text mb-2">
          Choose Your Entry Path
        </h2>
        <p className="text-gray-400 font-cyber">
          Multiple routes lead to the same destination
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => (
          <Card
            key={path.id}
            className={`glass-panel cursor-pointer transition-all duration-300 hover-float ${
              selectedPath === path.id
                ? 'border-cyan-400/50 shadow-[0_0_20px_rgba(0,243,255,0.3)]'
                : 'border-white/10 hover:border-cyan-400/30'
            }`}
            onClick={() => onPathSelect(path.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-cyber">{path.title}</CardTitle>
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 font-cyber text-sm">{path.duration}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Steps */}
              <div>
                <h4 className="text-cyan-400 font-cyber text-sm mb-2">Pathway Steps:</h4>
                <div className="space-y-2">
                  {path.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
                        <span className="text-cyan-400 text-xs">{index + 1}</span>
                      </div>
                      <span className="text-gray-300 text-sm font-cyber">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility & Difficulty */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs font-cyber">Eligibility</p>
                  <p className="text-white text-sm">{path.eligibility}</p>
                </div>
                <Badge className={`${getDifficultyColor(path.difficulty)} text-white`}>
                  <Target className="w-3 h-3 mr-1" />
                  {path.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
