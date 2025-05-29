import { useState } from 'react';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitCompare, TrendingUp, Clock, DollarSign, GraduationCap, Building, Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockCareers = [
  {
    id: 1,
    title: "Software Engineer",
    growth: "22%",
    salary: "₹8-25 LPA",
    time: "4 years",
    cost: "₹3-8 Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    institutes: ["IIT", "NIT", "IIIT"],
    satisfaction: 4.2
  },
  {
    id: 2,
    title: "Doctor",
    growth: "15%",
    salary: "₹6-50 LPA",
    time: "5.5 years",
    cost: "₹5-20 Lakhs",
    exams: ["NEET UG"],
    institutes: ["AIIMS", "Government Medical Colleges"],
    satisfaction: 4.5
  },
  {
    id: 3,
    title: "Data Scientist",
    growth: "35%",
    salary: "₹10-30 LPA",
    time: "3-4 years",
    cost: "₹2-6 Lakhs",
    exams: ["CAT", "GATE"],
    institutes: ["IIM", "ISI", "IIT"],
    satisfaction: 4.3
  }
];

export default function CompareCareers() {
  const [selectedCareers, setSelectedCareers] = useState(mockCareers.slice(0, 2));
  const [availableCareers] = useState(mockCareers);
  const navigate = useNavigate();

  const addCareer = (career: typeof mockCareers[0]) => {
    if (selectedCareers.length < 3 && !selectedCareers.find(c => c.id === career.id)) {
      setSelectedCareers([...selectedCareers, career]);
    }
  };

  const removeCareer = (careerToRemove: typeof mockCareers[0]) => {
    setSelectedCareers(selectedCareers.filter(career => career.id !== careerToRemove.id));
  };

  const getAIVerdict = () => {
    if (selectedCareers.length < 2) return "Add more careers to compare";
    
    const highestGrowth = selectedCareers.reduce((prev, current) => 
      parseFloat(prev.growth) > parseFloat(current.growth) ? prev : current
    );
    
    return `Based on current market trends, ${highestGrowth.title} shows the highest growth potential at ${highestGrowth.growth}. Consider your personal interests and long-term goals when making the final decision.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <HamburgerMenu />
      
      <main className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="glass-panel p-6">
          <h1 className="text-4xl font-futuristic font-bold neon-text mb-4 flex items-center gap-3">
            <GitCompare className="w-8 h-8 text-cyan-400" />
            Compare Careers
          </h1>
          <p className="text-gray-400 font-cyber">
            Make informed decisions with side-by-side career analysis
          </p>
        </div>

        {/* Career Selection */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-futuristic text-white mb-4">Available Careers</h2>
          <div className="flex flex-wrap gap-3">
            {availableCareers.map((career) => (
              <Button
                key={career.id}
                variant={selectedCareers.find(c => c.id === career.id) ? "default" : "outline"}
                onClick={() => selectedCareers.find(c => c.id === career.id) ? removeCareer(career) : addCareer(career)}
                disabled={selectedCareers.length >= 3 && !selectedCareers.find(c => c.id === career.id)}
                className={`font-cyber ${
                  selectedCareers.find(c => c.id === career.id) 
                    ? 'bg-cyan-500 hover:bg-cyan-600' 
                    : 'border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20'
                }`}
              >
                {selectedCareers.find(c => c.id === career.id) ? '✓' : '+'} {career.title}
              </Button>
            ))}
          </div>
          <p className="text-gray-400 text-sm font-cyber mt-2">
            Select up to 3 careers to compare ({selectedCareers.length}/3)
          </p>
        </div>

        {/* Comparison Grid */}
        {selectedCareers.length >= 2 && (
          <div className="space-y-6">
            <Card className="glass-panel border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-white font-futuristic text-xl">
                  Career Comparison Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-400/20">
                        <th className="text-left py-4 px-3 text-cyan-400 font-cyber">Criteria</th>
                        {selectedCareers.map((career) => (
                          <th key={career.id} className="text-center py-4 px-3 text-white font-futuristic">
                            {career.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyan-400/10">
                      {/* Growth Rate */}
                      <tr className="hover:bg-cyan-400/5">
                        <td className="py-4 px-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 font-cyber">Growth Rate</span>
                        </td>
                        {selectedCareers.map((career) => (
                          <td key={career.id} className="text-center py-4 px-3">
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                              {career.growth}
                            </Badge>
                          </td>
                        ))}
                      </tr>

                      {/* Salary Range */}
                      <tr className="hover:bg-cyan-400/5">
                        <td className="py-4 px-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300 font-cyber">Salary Range</span>
                        </td>
                        {selectedCareers.map((career) => (
                          <td key={career.id} className="text-center py-4 px-3">
                            <span className="text-yellow-400 font-cyber font-semibold">
                              {career.salary}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Time to Complete */}
                      <tr className="hover:bg-cyan-400/5">
                        <td className="py-4 px-3 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 font-cyber">Time to Complete</span>
                        </td>
                        {selectedCareers.map((career) => (
                          <td key={career.id} className="text-center py-4 px-3">
                            <span className="text-blue-400 font-cyber">{career.time}</span>
                          </td>
                        ))}
                      </tr>

                      {/* Total Cost */}
                      <tr className="hover:bg-cyan-400/5">
                        <td className="py-4 px-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-red-400" />
                          <span className="text-gray-300 font-cyber">Total Cost</span>
                        </td>
                        {selectedCareers.map((career) => (
                          <td key={career.id} className="text-center py-4 px-3">
                            <span className="text-red-400 font-cyber">{career.cost}</span>
                          </td>
                        ))}
                      </tr>

                      {/* Entrance Exams */}
                      <tr className="hover:bg-cyan-400/5">
                        <td className="py-4 px-3 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300 font-cyber">Entrance Exams</span>
                        </td>
                        {selectedCareers.map((career) => (
                          <td key={career.id} className="text-center py-4 px-3">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {career.exams.map((exam, idx) => (
                                <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                  {exam}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Top Institutes */}
                      <tr className="hover:bg-cyan-400/5">
                        <td className="py-4 px-3 flex items-center gap-2">
                          <Building className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-300 font-cyber">Top Institutes</span>
                        </td>
                        {selectedCareers.map((career) => (
                          <td key={career.id} className="text-center py-4 px-3">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {career.institutes.map((institute, idx) => (
                                <Badge key={idx} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
                                  {institute}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* AI Verdict */}
            <Card className="glass-panel border-green-400/20">
              <CardHeader>
                <CardTitle className="text-white font-futuristic text-xl flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-green-400" />
                  AI Verdict
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                  <p className="text-gray-300 font-cyber leading-relaxed">
                    {getAIVerdict()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/career-builder')}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-cyber transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Selected to Career Map
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 font-cyber transition-all duration-300 hover:scale-105"
              >
                Export Comparison
              </Button>
              <Button 
                onClick={() => navigate('/career-detail')}
                variant="outline" 
                className="border-purple-400/30 text-purple-400 hover:bg-purple-400/20 font-cyber transition-all duration-300 hover:scale-105"
              >
                Get Detailed Analysis
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
