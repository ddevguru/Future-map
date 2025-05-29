
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface CareerSnapshotPanelProps {
  career: {
    title: string;
    icon: string;
    stats: {
      averageSalary: string;
      growthRate: string;
      workHours: string;
      satisfactionScore: number;
    };
  };
}

export function CareerSnapshotPanel({ career }: CareerSnapshotPanelProps) {
  return (
    <div className="glass-panel border-b border-cyan-400/20 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Career Title & Icon */}
          <div className="flex items-center gap-6">
            <div className="text-6xl animate-bounce">{career.icon}</div>
            <div>
              <h1 className="text-4xl font-futuristic font-bold neon-text mb-2">
                {career.title}
              </h1>
              <p className="text-gray-400 font-cyber">
                Explore the complete pathway to becoming a {career.title.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Right: Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
            <Card className="glass-panel border-green-400/30 hover-float">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-cyber text-sm">Salary</p>
                <p className="text-white font-bold">{career.stats.averageSalary}</p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-blue-400/30 hover-float">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-400 font-cyber text-sm">Growth</p>
                <p className="text-white font-bold">{career.stats.growthRate}</p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-purple-400/30 hover-float">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-purple-400 font-cyber text-sm">Hours</p>
                <p className="text-white font-bold">{career.stats.workHours}</p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-yellow-400/30 hover-float">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-yellow-400 font-cyber text-sm">Rating</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-white font-bold">{career.stats.satisfactionScore}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quiz Button */}
        <div className="mt-6 text-center">
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 font-cyber">
            🎯 Is this career right for me? Take Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
