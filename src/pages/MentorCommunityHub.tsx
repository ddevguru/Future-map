import { useState, useEffect } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Video, MessageCircle, Star, Calendar, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Mentor {
  id: number;
  name: string;
  role: string;
  experience: string;
  rating: number;
  sessions: number;
  languages: string[];
  specialization: string[];
  education_level: string;
  avatar: string;
  price: string;
}

const mockPeerGroups = [
  {
    id: 1,
    name: "Engineering Aspirants 2025",
    members: 245,
    category: "Engineering",
    description: "JEE preparation and engineering career guidance",
    isActive: true
  },
  {
    id: 2,
    name: "Medical Students Connect",
    members: 189,
    category: "Medical",
    description: "NEET preparation and medical career paths",
    isActive: true
  }
];

function BookSessionDialog({ mentorId, mentorName }: { mentorId: number; mentorName: string }) {
  const [sessionTime, setSessionTime] = useState('');
  const [step, setStep] = useState<'select' | 'confirm' | 'result'>('select');
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleBookSession = async () => {
    setMessage(null);
    setIsError(false);

    try {
      const authToken = localStorage.getItem('authToken') || '';
      if (!authToken) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch('http://localhost/Futuremap-backend/mentors_api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          mentor_id: mentorId,
          session_time: new Date(sessionTime).toISOString().slice(0, 19).replace('T', ' '),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to book session');
      }

      setMessage(data.message || 'Session booked successfully!');
      setStep('result');
    } catch (err: any) {
      setIsError(true);
      setMessage(err.message || 'Failed to book session.');
      setStep('result');
    }
  };

  const handleReset = () => {
    setSessionTime('');
    setStep('select');
    setMessage(null);
    setIsError(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Session
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel p-6 border-cyan-400/30 max-w-md">
        <VisuallyHidden>
          <DialogTitle>Book Session with {mentorName}</DialogTitle>
        </VisuallyHidden>
        <DialogDescription>
          Schedule a mentoring session with {mentorName}.
        </DialogDescription>
        <div className="space-y-4">
          {step === 'select' && (
            <>
              <h3 className="text-white font-futuristic">Book Session with {mentorName}</h3>
              <p className="text-gray-400 font-cyber">Choose your preferred time slot.</p>
              <input
                type="datetime-local"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                min={new Date().toISOString().slice(0, 16)}
              />
              <Button
                className="bg-gradient-to-r from-green-500 to-blue-500 w-full"
                disabled={!sessionTime}
                onClick={() => setStep('confirm')}
              >
                Next
              </Button>
            </>
          )}
          {step === 'confirm' && (
            <>
              <h3 className="text-white font-futuristic">Confirm Booking</h3>
              <p className="text-gray-400 font-cyber">
                You are booking a session with {mentorName} on{' '}
                {new Date(sessionTime).toLocaleString()}.
              </p>
              <div className="flex gap-2">
                <Button
                  className="bg-gradient-to-r from-green-500 to-blue-500 flex-1"
                  onClick={handleBookSession}
                >
                  Confirm Booking
                </Button>
                <Button
                  variant="outline"
                  className="border-cyan-400/30 text-cyan-400 flex-1"
                  onClick={handleReset}
                >
                  Back
                </Button>
              </div>
            </>
          )}
          {step === 'result' && (
            <>
              <h3 className="text-white font-futuristic">
                {isError ? 'Booking Failed' : 'Booking Successful'}
              </h3>
              <p className={`font-cyber ${isError ? 'text-red-400' : 'text-green-400'}`}>
                {message}
              </p>
              <Button
                className="bg-gradient-to-r from-green-500 to-blue-500 w-full"
                onClick={handleReset}
              >
                {isError ? 'Try Again' : 'Book Another Session'}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MentorCommunityHub() {
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: '',
    experience: '',
    language: ''
  });
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState({
    specializations: [] as string[],
    experience: [] as string[],
    languages: [] as string[]
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const authToken = localStorage.getItem('authToken') || '';
        if (!authToken) {
          throw new Error('No authentication token found. Please log in.');
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        };

        // Fetch specializations
        const specResponse = await fetch('http://localhost/Futuremap-backend/mentors_api.php?filter=specializations', { headers });
        if (!specResponse.ok) {
          const errorData = await specResponse.json();
          throw new Error(errorData.error || 'Failed to fetch specializations');
        }
        const specializations = await specResponse.json();

        // Fetch experience
        const expResponse = await fetch('http://localhost/Futuremap-backend/mentors_api.php?filter=experience', { headers });
        if (!expResponse.ok) {
          const errorData = await expResponse.json();
          throw new Error(errorData.error || 'Failed to fetch experience');
        }
        const experience = await expResponse.json();

        // Fetch languages
        const langResponse = await fetch('http://localhost/Futuremap-backend/mentors_api.php?filter=languages', { headers });
        if (!langResponse.ok) {
          const errorData = await specResponse.json();
          throw new Error(errorData.error || 'Failed to fetch languages');
        }
        const languages = await langResponse.json();

        setFilterOptions({ specializations, experience, languages });
      } catch (err: any) {
        console.error('Error fetching filter options:', err);
        setError(err.message || 'Failed to load filter options.');
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const authToken = localStorage.getItem('authToken') || '';
        if (!authToken) {
          throw new Error('No authentication token found. Please log in.');
        }

        const query = new URLSearchParams();
        if (selectedFilters.specialization) query.append('specialization', selectedFilters.specialization);
        if (selectedFilters.experience) query.append('experience', selectedFilters.experience);
        if (selectedFilters.language) query.append('language', selectedFilters.language);

        const response = await fetch(`http://localhost/Futuremap-backend/mentors_api.php?${query.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data: Mentor[] = await response.json();
        // Validate data to ensure arrays and strings
        const validatedData = data.map(mentor => ({
          ...mentor,
          specialization: Array.isArray(mentor.specialization) ? mentor.specialization : [],
          languages: Array.isArray(mentor.languages) ? mentor.languages : [],
          education_level: typeof mentor.education_level === 'string' ? mentor.education_level : '',
        }));
        setMentors(validatedData);
      } catch (err: any) {
        console.error('Error fetching mentors:', err);
        setError(err.message || 'Failed to load mentors.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, [selectedFilters]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="glass-panel p-6">
            <h1 className="text-4xl font-futuristic font-bold neon-text mb-4">
              Mentor & Community Hub
            </h1>
            <p className="text-gray-400 font-cyber">
              Connect with mentors and join peer communities
            </p>
          </div>

          {/* Live Session Banner */}
          <div className="glass-panel p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-futuristic text-white">Live Session: "Cracking Tech Interviews"</h3>
                  <p className="text-gray-400 font-cyber">Starting in 15 minutes • 234 registered</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                <Calendar className="w-4 h-4 mr-2" />
                Join Session
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-futuristic text-white">Find Your Perfect Mentor</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-cyber text-gray-300 mb-2">Specialization</label>
                <select 
                  className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                  value={selectedFilters.specialization}
                  onChange={(e) => setSelectedFilters(prev => ({...prev, specialization: e.target.value}))}
                >
                  <option value="">All Specializations</option>
                  {filterOptions.specializations.map((spec, idx) => (
                    <option key={idx} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-cyber text-gray-300 mb-2">Experience</label>
                <select 
                  className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                  value={selectedFilters.experience}
                  onChange={(e) => setSelectedFilters(prev => ({...prev, experience: e.target.value}))}
                >
                  <option value="">All Experience</option>
                  {filterOptions.experience.map((exp, idx) => (
                    <option key={idx} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-cyber text-gray-300 mb-2">Language</label>
                <select 
                  className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                  value={selectedFilters.language}
                  onChange={(e) => setSelectedFilters(prev => ({...prev, language: e.target.value}))}
                >
                  <option value="">All Languages</option>
                  {filterOptions.languages.map((lang, idx) => (
                    <option key={idx} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mentor Grid */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-futuristic text-white">Available Mentors</h2>
              
              {isLoading && (
                <p className="text-cyan-400 font-cyber">Loading mentors...</p>
              )}
              {error && (
                <p className="text-red-400 font-cyber">{error}</p>
              )}
              
              {!isLoading && !error && mentors.length === 0 && (
                <p className="text-gray-400 font-cyber">No mentors available.</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="glass-panel border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover-float">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={mentor.avatar} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <CardTitle className="text-white font-futuristic text-lg">{mentor.name}</CardTitle>
                          <p className="text-cyan-400 font-cyber text-sm">{mentor.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white font-cyber text-sm">{mentor.rating}</span>
                            <span className="text-gray-400 text-sm">({mentor.sessions} sessions)</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-gray-400 font-cyber text-sm">Experience: {mentor.experience}</p>
                        <p className="text-green-400 font-cyber font-bold">{mentor.price}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-cyan-400 font-cyber text-sm mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(mentor.specialization) && mentor.specialization.length > 0 ? (
                            mentor.specialization.map((spec, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs">None</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-cyan-400 font-cyber text-sm mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(mentor.languages) && mentor.languages.length > 0 ? (
                            mentor.languages.map((lang, idx) => (
                              <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                {lang}
                              </Badge>
                            ))
                          ) : (
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">None</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-cyan-400 font-cyber text-sm mb-2">Education Level</h4>
                        <div className="flex flex-wrap gap-1">
                          {mentor.education_level ? (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                              {mentor.education_level}
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">None</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-4">
                        <BookSessionDialog mentorId={mentor.id} mentorName={mentor.name} />
                        <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Peer Groups Sidebar */}
            <div className="space-y-6">
              <h2 className="text-xl font-futuristic text-white">Join Peer Groups</h2>
              
              <div className="space-y-4">
                {mockPeerGroups.map((group) => (
                  <Card key={group.id} className="glass-panel border-cyan-400/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white font-futuristic text-lg">{group.name}</CardTitle>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mt-2">
                            {group.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-cyan-400" />
                          <span className="text-cyan-400 font-cyber text-sm">{group.members}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-400 font-cyber text-sm mb-4">{group.description}</p>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* AI Recommendations */}
              <div className="glass-panel p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/30">
                <h3 className="text-lg font-futuristic text-white mb-3">
                  AI Recommended Mentors
                </h3>
                <p className="text-gray-400 font-cyber text-sm mb-4">
                  Based on your interests in engineering and data science
                </p>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  View Recommendations
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Chat Button */}
          <div className="fixed bottom-6 right-6">
            <Button 
              size="lg" 
              className="rounded-full w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}