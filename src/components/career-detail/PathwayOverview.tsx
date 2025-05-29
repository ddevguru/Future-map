
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TimelineStep {
  step: string;
  description: string;
}

interface PathwayOverviewProps {
  timeline: TimelineStep[];
}

export function PathwayOverview({ timeline }: PathwayOverviewProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-futuristic font-bold neon-text mb-2">
          Career Pathway Timeline
        </h2>
        <p className="text-gray-400 font-cyber">
          Follow this step-by-step journey to reach your goal
        </p>
      </div>

      {/* Horizontal Timeline */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-6 space-x-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/50">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative"
              onMouseEnter={() => setSelectedStep(index)}
              onMouseLeave={() => setSelectedStep(null)}
            >
              <Card className={`glass-panel w-64 h-32 cursor-pointer transition-all duration-300 ${
                selectedStep === index 
                  ? 'border-cyan-400/50 shadow-[0_0_20px_rgba(0,243,255,0.3)] transform scale-105' 
                  : 'border-white/10 hover:border-cyan-400/30'
              }`}>
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-cyber text-sm">Step {index + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                      <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.step}</h3>
                    <p className="text-gray-400 text-sm font-cyber line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow between cards */}
              {index < timeline.length - 1 && (
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-cyan-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expanded details */}
        {selectedStep !== null && (
          <Card className="glass-panel border-cyan-400/30 mt-4 animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {timeline[selectedStep].step}
              </h3>
              <p className="text-gray-300 font-cyber">
                {timeline[selectedStep].description}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
