
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, TrendingUp, Clock, DollarSign, Plus } from 'lucide-react';

interface AIRecommendationBoxProps {
  career: {
    title: string;
    id: string;
  };
}

export function AIRecommendationBox({ career }: AIRecommendationBoxProps) {
  // Mock AI recommendation - in a real app this would be personalized
  const recommendation = {
    fastPath: {
      title: "Accelerated Data Science Track",
      duration: "2.5 years",
      cost: "₹3-5 LPA",
      savings: "1.5 years faster",
      steps: [
        "Online B.Sc in Data Science",
        "Industry Certifications (AWS, Google Cloud)",
        "Portfolio Projects",
        "Direct Industry Entry"
      ]
    },
    reasons: [
      "Matches your interest in technology",
      "Fits your medium budget range",
      "Aligns with fast-track timeline preference"
    ]
  };

  return (
    <Card className="glass-panel border-cyan-400/30 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 relative overflow-hidden">
      {/* AI Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-white font-cyber">
              🤖 AI-Powered Recommendation
            </CardTitle>
            <p className="text-gray-400 text-sm font-cyber">
              Personalized just for you
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* Recommendation Summary */}
        <div className="p-4 bg-white/5 rounded-lg border border-cyan-400/20">
          <h3 className="text-cyan-400 font-bold text-lg mb-2">
            {recommendation.fastPath.title}
          </h3>
          <p className="text-gray-300 font-cyber mb-4">
            Based on your interests and budget, here's a faster path to become a {career.title}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <Clock className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-green-400 font-cyber text-sm">{recommendation.fastPath.duration}</p>
              <p className="text-gray-400 text-xs">Duration</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <p className="text-blue-400 font-cyber text-sm">{recommendation.fastPath.cost}</p>
              <p className="text-gray-400 text-xs">Total Cost</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className="text-purple-400 font-cyber text-sm">{recommendation.fastPath.savings}</p>
              <p className="text-gray-400 text-xs">Time Saved</p>
            </div>
          </div>

          {/* Pathway Steps */}
          <div>
            <p className="text-white font-cyber text-sm mb-2">Recommended Steps:</p>
            <div className="space-y-2">
              {recommendation.fastPath.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <span className="text-cyan-400 text-xs">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm font-cyber">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why This Recommendation */}
        <div>
          <h4 className="text-white font-cyber mb-3">🎯 Why this path is perfect for you:</h4>
          <div className="space-y-2">
            {recommendation.reasons.map((reason, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 w-2 h-2 p-0 rounded-full"></Badge>
                <span className="text-gray-300 text-sm font-cyber">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 font-cyber">
          <Plus className="w-4 h-4 mr-2" />
          Add to My Career Plan
        </Button>
      </CardContent>
    </Card>
  );
}
