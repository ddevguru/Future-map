
import { useState, useEffect } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, PiggyBank, Lightbulb, Lock, Unlock, TrendingDown } from 'lucide-react';

export default function BudgetPlanner() {
  const [budget, setBudget] = useState(500000); // Default 5 lakhs
  const [isLocked, setIsLocked] = useState(false);

  const budgetBreakdown = [
    { name: 'Tuition Fees', value: budget * 0.6, color: '#00f3ff' },
    { name: 'Housing & Food', value: budget * 0.25, color: '#a855f7' },
    { name: 'Books & Materials', value: budget * 0.08, color: '#10b981' },
    { name: 'Coaching/Prep', value: budget * 0.05, color: '#f472b6' },
    { name: 'Miscellaneous', value: budget * 0.02, color: '#fbbf24' }
  ];

  const budgetOptions = [
    { range: 'Under ₹2L', min: 0, max: 200000, paths: 8 },
    { range: '₹2L - ₹5L', min: 200000, max: 500000, paths: 12 },
    { range: '₹5L - ₹10L', min: 500000, max: 1000000, paths: 15 },
    { range: '₹10L - ₹20L', min: 1000000, max: 2000000, paths: 18 },
    { range: 'Above ₹20L', min: 2000000, max: 5000000, paths: 22 }
  ];

  const aiSuggestions = [
    {
      title: "Government College Route",
      description: "Reduce costs by 60% through government institutions",
      savings: "₹3-8 Lakhs",
      icon: "🏛️"
    },
    {
      title: "Scholarship Opportunities",
      description: "You're eligible for 4 merit-based scholarships",
      savings: "₹2-5 Lakhs",
      icon: "🏆"
    },
    {
      title: "Fast-Track Programs",
      description: "Complete your degree 1 year earlier, save on living costs",
      savings: "₹1-3 Lakhs",
      icon: "⚡"
    }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="glass-panel p-6">
            <h1 className="text-4xl font-futuristic font-bold neon-text mb-4 flex items-center gap-3">
              <PiggyBank className="w-8 h-8 text-cyan-400" />
              Budget Planner
            </h1>
            <p className="text-gray-400 font-cyber">
              Plan your education budget with AI-powered optimization
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Budget Slider */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="glass-panel border-cyan-400/20">
                <CardHeader>
                  <CardTitle className="text-white font-futuristic text-xl flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                    Set Your Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400 font-cyber">Total Budget</span>
                      <span className="text-2xl font-futuristic text-cyan-400">
                        {formatCurrency(budget)}
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min="100000"
                      max="3000000"
                      step="50000"
                      value={budget}
                      onChange={(e) => !isLocked && setBudget(Number(e.target.value))}
                      disabled={isLocked}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #00f3ff 0%, #00f3ff ${((budget - 100000) / (3000000 - 100000)) * 100}%, #374151 ${((budget - 100000) / (3000000 - 100000)) * 100}%, #374151 100%)`
                      }}
                    />
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹1L</span>
                      <span>₹30L</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsLocked(!isLocked)}
                    className={`w-full font-cyber ${
                      isLocked 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Budget Locked
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 mr-2" />
                        Lock Budget
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Budget Ranges */}
              <Card className="glass-panel border-cyan-400/20">
                <CardHeader>
                  <CardTitle className="text-white font-futuristic text-lg">
                    Budget Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {budgetOptions.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        budget >= option.min && budget <= option.max
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-gray-600 bg-black/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-cyber">{option.range}</span>
                        <Badge className="bg-purple-500/20 text-purple-300">
                          {option.paths} paths
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Budget Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-panel border-cyan-400/20">
                <CardHeader>
                  <CardTitle className="text-white font-futuristic text-xl">
                    Budget Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={budgetBreakdown}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {budgetBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Breakdown List */}
                    <div className="space-y-4">
                      {budgetBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-300 font-cyber">{item.name}</span>
                          </div>
                          <span className="text-white font-cyber font-semibold">
                            {formatCurrency(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="glass-panel border-green-400/20">
                <CardHeader>
                  <CardTitle className="text-white font-futuristic text-xl flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-green-400" />
                    AI Budget Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-4 bg-green-400/5 rounded-lg border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                        <div className="text-2xl mb-2">{suggestion.icon}</div>
                        <h3 className="text-green-400 font-cyber font-semibold mb-2">{suggestion.title}</h3>
                        <p className="text-gray-300 text-sm font-cyber mb-3">{suggestion.description}</p>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Save {suggestion.savings}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-cyber"
                  disabled={!isLocked}
                >
                  Save Budget Plan
                </Button>
                <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 font-cyber">
                  Export Budget Report
                </Button>
                <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/20 font-cyber">
                  Find Scholarships
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
