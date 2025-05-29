
import { useMemo } from 'react';
import { DroppedCard, UserInputs } from '@/pages/CareerPathBuilder';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, DollarSign, Award, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface CareerFlowAnalyzerProps {
  droppedCards: DroppedCard[];
  userInputs: UserInputs;
}

export function CareerFlowAnalyzer({ droppedCards, userInputs }: CareerFlowAnalyzerProps) {
  const analysis = useMemo(() => {
    const totalCost = droppedCards.reduce((sum, card) => sum + card.cost, 0);
    const totalDuration = droppedCards.length * 6; // Simplified calculation
    
    // Calculate scholarships based on cards and user profile
    const scholarshipCount = droppedCards.filter(card => 
      card.type === 'course' || card.type === 'institution'
    ).length;
    
    // Check budget compatibility
    const budgetLimits = {
      'Low': 200000,
      'Medium': 500000,
      'High': Infinity
    };
    
    const isWithinBudget = totalCost <= budgetLimits[userInputs.budget as keyof typeof budgetLimits];
    
    // Generate alternative suggestions
    const alternatives = [
      {
        title: 'Faster Track Available',
        description: 'Complete in 18 months with intensive courses',
        savings: 'Save 12 months'
      },
      {
        title: 'Budget-Friendly Option',
        description: 'Online courses can reduce costs by 40%',
        savings: 'Save ₹' + Math.round(totalCost * 0.4).toLocaleString()
      }
    ];
    
    return {
      totalCost,
      totalDuration,
      scholarshipCount,
      isWithinBudget,
      alternatives
    };
  }, [droppedCards, userInputs]);

  const compatibilityScore = useMemo(() => {
    let score = 0;
    
    // Budget compatibility
    if (analysis.isWithinBudget) score += 30;
    
    // Timeline compatibility
    const timelineMonths = {
      'Fast Track': 12,
      'Standard': 36,
      'Long-Term': 60
    };
    
    const userTimeline = timelineMonths[userInputs.timeline as keyof typeof timelineMonths];
    if (analysis.totalDuration <= userTimeline) score += 30;
    
    // Interest alignment
    const relevantCards = droppedCards.filter(card => 
      userInputs.interests.some(interest => 
        card.title.toLowerCase().includes(interest.toLowerCase())
      )
    );
    score += (relevantCards.length / Math.max(droppedCards.length, 1)) * 40;
    
    return Math.min(score, 100);
  }, [analysis, droppedCards, userInputs]);

  return (
    <div className="glass-panel h-full p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-futuristic font-bold text-white">
          AI Analysis
        </h2>
      </div>

      {droppedCards.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 font-cyber">
            Add cards to see analysis
          </p>
        </div>
      ) : (
        <>
          {/* Compatibility Score */}
          <div className="glass-panel p-4 border border-cyan-400/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-cyber">Compatibility Score</span>
              <Badge className={`${
                compatibilityScore >= 80 ? 'bg-green-400/20 text-green-400' :
                compatibilityScore >= 60 ? 'bg-yellow-400/20 text-yellow-400' :
                'bg-red-400/20 text-red-400'
              }`}>
                {Math.round(compatibilityScore)}%
              </Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  compatibilityScore >= 80 ? 'bg-green-400' :
                  compatibilityScore >= 60 ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}
                style={{ width: `${compatibilityScore}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4">
            <div className="glass-panel p-4 border border-blue-400/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-cyber text-sm">Timeline</span>
              </div>
              <p className="text-white font-futuristic font-bold">
                {analysis.totalDuration} months
              </p>
            </div>

            <div className="glass-panel p-4 border border-green-400/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-cyber text-sm">Total Cost</span>
              </div>
              <p className="text-white font-futuristic font-bold">
                ₹{analysis.totalCost.toLocaleString()}
              </p>
              {!analysis.isWithinBudget && (
                <p className="text-red-400 text-xs mt-1">Exceeds budget</p>
              )}
            </div>

            <div className="glass-panel p-4 border border-purple-400/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-cyber text-sm">Scholarships</span>
              </div>
              <p className="text-white font-futuristic font-bold">
                {analysis.scholarshipCount} available
              </p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-3">
            <h3 className="text-lg font-futuristic font-bold text-white">
              Insights
            </h3>
            
            <div className="space-y-2">
              {analysis.isWithinBudget ? (
                <div className="flex items-center space-x-2 p-3 glass-panel border border-green-400/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-cyber text-sm">
                    Within your budget range
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 p-3 glass-panel border border-red-400/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-cyber text-sm">
                    Exceeds budget by ₹{(analysis.totalCost - 500000).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="p-3 glass-panel border border-cyan-400/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-cyber text-sm">Career Readiness</span>
                </div>
                <p className="text-gray-300 text-xs">
                  This path covers {droppedCards.length} key milestones for your target role
                </p>
              </div>
            </div>
          </div>

          {/* Alternatives */}
          <div className="space-y-3">
            <h3 className="text-lg font-futuristic font-bold text-white">
              Alternatives
            </h3>
            
            {analysis.alternatives.map((alt, index) => (
              <div key={index} className="p-3 glass-panel border border-yellow-400/30 rounded-lg hover:border-yellow-400/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-yellow-400 font-cyber text-sm font-bold">
                    {alt.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-gray-300 text-xs mb-1">
                  {alt.description}
                </p>
                <Badge className="bg-yellow-400/20 text-yellow-400 text-xs">
                  {alt.savings}
                </Badge>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-black font-futuristic font-bold">
            Optimize Path
          </Button>
        </>
      )}
    </div>
  );
}
