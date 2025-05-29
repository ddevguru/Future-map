
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { GraduationCap, Users, MessageCircle, ArrowRight } from 'lucide-react';

export function FloatingCTAButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      title: 'Enroll in Institutions',
      description: 'Apply directly to recommended institutions',
      icon: GraduationCap,
      color: 'from-blue-400 to-blue-600',
      action: () => console.log('Enrolling in institutions...')
    },
    {
      title: 'Get Personalized Guidance',
      description: 'Connect with AI career advisor',
      icon: MessageCircle,
      color: 'from-purple-400 to-purple-600',
      action: () => console.log('Getting guidance...')
    },
    {
      title: 'Join Study Groups',
      description: 'Connect with peers on similar paths',
      icon: Users,
      color: 'from-green-400 to-green-600',
      action: () => console.log('Joining study groups...')
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-black shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-110"
          >
            <ArrowRight className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        
        <SheetContent className="glass-panel border-cyan-400/20 bg-gray-900/95 w-96">
          <SheetHeader>
            <SheetTitle className="text-xl font-futuristic font-bold neon-text">
              Take Action
            </SheetTitle>
            <SheetDescription className="text-gray-400 font-cyber">
              Ready to move forward? Choose your next step.
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <div
                  key={index}
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  className={`p-4 glass-panel border border-cyan-400/30 rounded-xl hover:border-cyan-400/50 cursor-pointer transition-all duration-300 hover:scale-105 group`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-futuristic font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-cyber">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-4 glass-panel border border-green-400/30 rounded-xl">
            <div className="text-center">
              <div className="text-green-400 font-cyber text-sm mb-1">
                🎯 AI Recommendation
              </div>
              <p className="text-white font-futuristic font-bold text-sm mb-2">
                Start with personalized guidance
              </p>
              <p className="text-gray-400 text-xs">
                Our AI can help optimize your path before enrollment
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
