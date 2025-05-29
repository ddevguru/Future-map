
import { useState } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, User, Target, TrendingUp, Clock, Plus, Users } from 'lucide-react';

const mockUserProfile = {
  name: "Alex",
  interests: ["Technology", "Problem Solving", "Innovation"],
  goals: ["High Salary", "Work-Life Balance", "Global Opportunities"],
  currentLevel: "12th Grade",
  score: "85%",
  budget: "₹5-10 Lakhs"
};

const recommendedPaths = [
  {
    id: 1,
    title: "AI/ML Engineer",
    match: 95,
    reason: "Perfect match for your tech interests and problem-solving skills",
    timeline: "4 years",
    startingSalary: "₹12-18 LPA",
    growth: "40%",
    institutes: ["IIT", "IIIT", "NIT"],
    fastTrack: true
  },
  {
    id: 2,
    title: "Product Manager",
    match: 88,
    reason: "Combines tech knowledge with business strategy",
    timeline: "4-6 years",
    startingSalary: "₹15-25 LPA",
    growth: "25%",
    institutes: ["IIM", "ISB", "Top Engineering + MBA"],
    fastTrack: false
  },
  {
    id: 3,
    title: "Cybersecurity Specialist",
    match: 82,
    reason: "High demand field matching your analytical mindset",
    timeline: "3-4 years",
    startingSalary: "₹8-15 LPA",
    growth: "35%",
    institutes: ["IIT", "Private Tech Colleges"],
    fastTrack: true
  }
];

const peopleAlsoChose = [
  {
    profile: "Tech enthusiast, 12th grade, 88%",
    choices: ["Software Engineer", "Data Scientist", "UX Designer"],
    outcome: "Placed at Google with ₹45 LPA"
  },
  {
    profile: "Problem solver, Math lover, 12th grade",
    choices: ["Quant Analyst", "Actuarial Scientist", "Financial Engineer"],
    outcome: "Working at Goldman Sachs"
  },
  {
    profile: "Innovation focused, Startup mindset",
    choices: ["Entrepreneur", "Product Manager", "Venture Capitalist"],
    outcome: "Founded successful startup, $2M funding"
  }
];

export default function PersonalizedRecommendations() {
  const [selectedPaths, setSelectedPaths] = useState<number[]>([]);

  const togglePathSelection = (pathId: number) => {
    setSelectedPaths(prev => 
      prev.includes(pathId) 
        ? prev.filter(id => id !== pathId)
        : [...prev, pathId]
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="glass-panel p-6">
            <h1 className="text-4xl font-futuristic font-bold neon-text mb-4 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              Personalized Recommendations
            </h1>
            <p className="text-gray-400 font-cyber">
              AI-curated career paths tailored specifically for you
            </p>
          </div>

          {/* User Profile Banner */}
          <Card className="glass-panel border-cyan-400/20">
            <CardHeader>
              <CardTitle className="text-white font-futuristic text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                Your Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-cyan-400 font-cyber font-semibold mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockUserProfile.interests.map((interest, index) => (
                      <Badge key={index} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-purple-400 font-cyber font-semibold mb-3">Goals</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockUserProfile.goals.map((goal, index) => (
                      <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-green-400 font-cyber font-semibold mb-3">Current Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-cyber">Level:</span>
                      <span className="text-white font-cyber">{mockUserProfile.currentLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-cyber">Score:</span>
                      <span className="text-green-400 font-cyber">{mockUserProfile.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-cyber">Budget:</span>
                      <span className="text-yellow-400 font-cyber">{mockUserProfile.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Career Paths */}
          <Card className="glass-panel border-green-400/20">
            <CardHeader>
              <CardTitle className="text-white font-futuristic text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Top Recommended Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedPaths.map((path) => (
                  <Card key={path.id} className="glass-panel border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover-float">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white font-futuristic text-lg">{path.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                              {path.match}% Match
                            </Badge>
                            {path.fastTrack && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                                Fast Track
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm font-cyber">{path.reason}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-400 font-cyber">{path.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400 font-cyber">{path.growth}</span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-yellow-400 font-cyber font-semibold">{path.startingSalary}</span>
                        <span className="text-gray-400 font-cyber text-sm ml-2">starting</span>
                      </div>
                      
                      <div>
                        <h4 className="text-cyan-400 font-cyber text-sm mb-2">Top Institutes</h4>
                        <div className="flex flex-wrap gap-1">
                          {path.institutes.map((institute, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {institute}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => togglePathSelection(path.id)}
                        className={`w-full font-cyber ${
                          selectedPaths.includes(path.id)
                            ? 'bg-cyan-500 hover:bg-cyan-600'
                            : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                        }`}
                      >
                        {selectedPaths.includes(path.id) ? '✓ Selected' : 'Select Path'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* People Like You Also Chose */}
          <Card className="glass-panel border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-white font-futuristic text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                People Like You Also Chose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {peopleAlsoChose.map((person, index) => (
                  <div key={index} className="p-4 bg-purple-400/10 rounded-lg border border-purple-400/20">
                    <div className="mb-3">
                      <p className="text-gray-400 font-cyber text-sm">{person.profile}</p>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="text-purple-400 font-cyber text-sm mb-2">Chose:</h4>
                      <div className="flex flex-wrap gap-1">
                        {person.choices.map((choice, idx) => (
                          <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                            {choice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-purple-400/20">
                      <p className="text-green-400 font-cyber text-sm font-semibold">{person.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {selectedPaths.length > 0 && (
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-cyber">
                <Plus className="w-4 h-4 mr-2" />
                Add All to Career Map ({selectedPaths.length} selected)
              </Button>
              <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 font-cyber">
                Get Detailed Roadmap
              </Button>
              <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/20 font-cyber">
                Find Mentors
              </Button>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
