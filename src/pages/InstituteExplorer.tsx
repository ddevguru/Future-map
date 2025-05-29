
import { useState } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Filter, Heart, GitCompare, ExternalLink } from 'lucide-react';

const mockInstitutes = [
  {
    id: 1,
    name: "IIT Delhi",
    location: "New Delhi",
    rating: 4.8,
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
    courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering"],
    entranceExams: ["JEE Advanced"],
    aiMatchScore: 92,
    fees: "₹2.5L/year",
    ranking: 1
  },
  {
    id: 2,
    name: "AIIMS Delhi",
    location: "New Delhi",
    rating: 4.9,
    logo: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop&crop=center",
    courses: ["MBBS", "MD", "MS"],
    entranceExams: ["NEET UG", "NEET PG"],
    aiMatchScore: 88,
    fees: "₹1.2L/year",
    ranking: 1
  },
  {
    id: 3,
    name: "IIM Ahmedabad",
    location: "Ahmedabad",
    rating: 4.7,
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop&crop=center",
    courses: ["MBA", "PGDM", "Executive MBA"],
    entranceExams: ["CAT", "GMAT"],
    aiMatchScore: 85,
    fees: "₹23L/year",
    ranking: 1
  }
];

export default function InstituteExplorer() {
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    budget: '',
    courseType: '',
    ranking: ''
  });
  const [shortlisted, setShortlisted] = useState<number[]>([]);

  const toggleShortlist = (id: number) => {
    setShortlisted(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="glass-panel p-6">
            <h1 className="text-4xl font-futuristic font-bold neon-text mb-4">
              Institute Explorer
            </h1>
            <p className="text-gray-400 font-cyber">
              Discover top institutions with AI-powered matching
            </p>
          </div>

          {/* Filters Panel */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-futuristic text-white">Smart Filters</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-cyber text-gray-300 mb-2">Location</label>
                <Input 
                  placeholder="Enter city or state"
                  value={selectedFilters.location}
                  onChange={(e) => setSelectedFilters(prev => ({...prev, location: e.target.value}))}
                  className="bg-black/20 border-cyan-400/30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-cyber text-gray-300 mb-2">Budget Range</label>
                <select 
                  className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                  value={selectedFilters.budget}
                  onChange={(e) => setSelectedFilters(prev => ({...prev, budget: e.target.value}))}
                >
                  <option value="">All Budgets</option>
                  <option value="low">Under ₹5L</option>
                  <option value="medium">₹5L - ₹15L</option>
                  <option value="high">Above ₹15L</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-cyber text-gray-300 mb-2">Course Type</label>
                <select 
                  className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                  value={selectedFilters.courseType}
                  onChange={(e) => setSelectedFilters(prev => ({...prev, courseType: e.target.value}))}
                >
                  <option value="">All Courses</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                  <option value="management">Management</option>
                  <option value="arts">Arts & Humanities</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-cyber text-gray-300 mb-2">Ranking</label>
                <select 
                  className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                  value={selectedFilters.ranking}
                  onChange={(e) => setSelectedFilters(prev => ({...prev, ranking: e.target.value}))}
                >
                  <option value="">All Rankings</option>
                  <option value="top10">Top 10</option>
                  <option value="top50">Top 50</option>
                  <option value="top100">Top 100</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-futuristic text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Institute Map
            </h2>
            <div className="bg-black/40 rounded-lg h-64 flex items-center justify-center border border-cyan-400/20">
              <p className="text-gray-400 font-cyber">Interactive map with institute pins (Map integration required)</p>
            </div>
          </div>

          {/* Institute Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInstitutes.map((institute) => (
              <Card key={institute.id} className="glass-panel border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover-float">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={institute.logo} 
                        alt={institute.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <CardTitle className="text-white font-futuristic text-lg">{institute.name}</CardTitle>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <MapPin className="w-3 h-3" />
                          {institute.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-cyber">{institute.rating}</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        AI Match: {institute.aiMatchScore}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-cyan-400 font-cyber text-sm mb-2">Popular Courses</h4>
                    <div className="flex flex-wrap gap-1">
                      {institute.courses.slice(0, 2).map((course, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                      {institute.courses.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{institute.courses.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-cyan-400 font-cyber text-sm mb-2">Entrance Exams</h4>
                    <div className="flex flex-wrap gap-1">
                      {institute.entranceExams.map((exam, idx) => (
                        <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {exam}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-green-400 font-cyber font-bold">{institute.fees}</span>
                    <span className="text-yellow-400 font-cyber text-sm">Rank #{institute.ranking}</span>
                  </div>
                  
                  {/* Floating Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      size="sm"
                      variant={shortlisted.includes(institute.id) ? "default" : "outline"}
                      onClick={() => toggleShortlist(institute.id)}
                      className={`flex-1 ${shortlisted.includes(institute.id) ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-400/30 text-pink-400 hover:bg-pink-400/20'}`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${shortlisted.includes(institute.id) ? 'fill-current' : ''}`} />
                      Shortlist
                    </Button>
                    
                    <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20">
                      <GitCompare className="w-4 h-4 mr-2" />
                      Compare
                    </Button>
                    
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
