import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { 
  Search, 
  Bell, 
  User, 
  Route, 
  GraduationCap, 
  Users, 
  Award, 
  TrendingUp, 
  Bookmark, 
  MessageSquare,
  Star,
  MapPin,
  MessageCircle,
  Trophy,
} from 'lucide-react';

export default function UserDashboard() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [paths, setPaths] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const firstName = user.firstName || 'User';
  const userId = user.id;

  useEffect(() => {
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Career Paths
        const pathsResponse = await fetch('http://localhost/Futuremap-backend/get_career_paths.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        });
        const pathsData = await pathsResponse.json();
        if (pathsData.success) setPaths(pathsData.data);

        // Fetch Institutions
        const instResponse = await fetch('http://localhost/Futuremap-backend/get_user_profiles.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        });
        const instData = await instResponse.json();
        if (instData.success) setInstitutions(instData.data);

        // Fetch Mentors
        const mentorsResponse = await fetch('http://localhost/Futuremap-backend/get_session_bookings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        });
        const mentorsData = await mentorsResponse.json();
        if (mentorsData.success) setMentors(mentorsData.data);

        // Fetch Peers
        const peersResponse = await fetch('http://localhost/Futuremap-backend/get_peers.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        });
        const peersData = await peersResponse.json();
        if (peersData.success) setPeers(peersData.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Mock badges and bookmarks (unchanged as no database table provided)
  const mockBadges = [
    { name: 'Code Warrior', level: 'Gold', description: 'Completed 50+ coding challenges', rarity: 'Epic' },
    { name: 'AI Pioneer', level: 'Silver', description: 'Built first neural network', rarity: 'Rare' },
    { name: 'Team Leader', level: 'Bronze', description: 'Led 3 successful projects', rarity: 'Common' },
  ];

  const mockBookmarks = [
    { title: 'Advanced ML Algorithms', type: 'Course', category: 'Study Material' },
    { title: 'Python Data Structures', type: 'Article', category: 'Reference' },
    { title: 'Google AI Internship', type: 'Opportunity', category: 'Career' },
  ];

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-400 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-black circuit-bg relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 particles">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-magenta-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <HamburgerMenu />

      <div className="relative z-10">
        {/* Header */}
        <header className="glass-panel border-b border-cyan-400/20 p-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-4xl font-futuristic font-bold neon-text animate-neon-pulse ml-10">
                  Dashboard
                </h1>
                <p className="text-gray-400 font-cyber text-lg ml-10">
                  Welcome, {firstName}! Your personalized career journey overview
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="glass-panel hover-glow text-cyan-400 hover:text-white">
                <Search className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-panel hover-glow text-cyan-400 hover:text-white relative">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-magenta-500 rounded-full animate-pulse"></div>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="glass-panel hover-glow text-cyan-400 hover:text-white"
                onClick={() => navigate('/profile')}
              >
                <User className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* My Paths */}
          <Card className="glass-panel border-cyan-400/30 hover-glow animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400 font-futuristic">
                <Route className="w-6 h-6" />
                <span>My Paths</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paths.map((path) => (
                <div key={path.id} className="glass-panel p-4 hover-glow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-cyber text-white font-semibold">Path {path.path_id}</h4>
                    <Badge className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold">
                      {path.card_count} cards
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm mt-1 font-cyber">{path.progress}% Complete</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Institutions */}
          <Card className="glass-panel border-cyan-400/30 hover-glow animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400 font-futuristic">
                <GraduationCap className="w-6 h-6" />
                <span>My Institutions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {institutions.map((inst, index) => (
                <div key={index} className="glass-panel p-4 hover-glow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-cyber text-white font-semibold">{inst.name}</h4>
                    <Badge className={`${inst.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'} text-black font-bold`}>
                      {inst.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm font-cyber">{inst.type}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
                      style={{ width: `${inst.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Mentors */}
          <Card className="glass-panel border-cyan-400/30 hover-glow animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400 font-futuristic">
                <Users className="w-6 h-6" />
                <span>My Mentors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentors.map((mentor, index) => (
                <div key={index} className="glass-panel p-4 hover-glow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-cyber text-white font-semibold">{mentor.name}</h4>
                    <Button size="sm" className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover-glow">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm font-cyber">{mentor.expertise}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-cyber">{mentor.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm font-cyber">{mentor.sessions} sessions</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="glass-panel border-cyan-400/30 hover-glow animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400 font-futuristic">
                <Award className="w-6 h-6" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBadges.map((badge, index) => (
                <div key={index} className="glass-panel p-4 hover-glow badge-3d cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      badge.level === 'Gold' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                      badge.level === 'Silver' ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                      'bg-gradient-to-r from-orange-600 to-orange-800'
                    } shadow-lg`}>
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-cyber text-white font-semibold">{badge.name}</h4>
                        <Badge className={`${
                          badge.rarity === 'Epic' ? 'bg-purple-500' :
                          badge.rarity === 'Rare' ? 'bg-blue-500' :
                          'bg-gray-500'
                        } text-white font-bold`}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm font-cyber">{badge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Peer Comparison */}
          <Card className="glass-panel border-cyan-400/30 hover-glow animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400 font-futuristic">
                <TrendingUp className="w-6 h-6" />
                <span>Peer Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {peers.map((peer, index) => (
                <div key={index} className="glass-panel p-4 hover-glow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-cyber text-white font-semibold">{peer.name}</h4>
                    <Badge className="bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold">
                      {peer.similarity}% match
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm font-cyber">{peer.path} • {peer.institution}</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="w-4 h-4 text-cyan-400 mr-1" />
                    <span className="text-gray-400 text-sm font-cyber">Similar interests & goals</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bookmarks */}
          <Card className="glass-panel border-cyan-400/30 hover-glow animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400 font-futuristic">
                <Bookmark className="w-6 h-6" />
                <span>Bookmarks & Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBookmarks.map((bookmark, index) => (
                <div key={index} className="glass-panel p-4 hover-glow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-cyber text-white font-semibold">{bookmark.title}</h4>
                    <Badge className="bg-gray-600 text-white font-cyber">
                      {bookmark.type}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm font-cyber">{bookmark.category}</p>
                </div>
              ))}
              <div className="glass-panel p-4">
                <h4 className="font-cyber text-white font-semibold mb-2">Quick Notes</h4>
                <Textarea 
                  placeholder="Jot down important thoughts..."
                  className="glass-panel border-cyan-400/30 text-white placeholder-gray-500 font-cyber resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Floating Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setShowFeedback(true)}
            className="bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-400 hover:to-purple-400 w-16 h-16 rounded-full shadow-2xl hover-glow btn-glow animate-pulse"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <Card className="glass-panel border-cyan-400/30 w-full max-w-md animate-scale-in">
              <CardHeader>
                <CardTitle className="text-center text-cyan-400 font-futuristic text-2xl">
                  Your Opinion Matters
                </CardTitle>
                <p className="text-center text-gray-400 font-cyber">
                  Help us improve your experience
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-cyan-400 font-cyber mb-2 block">Rate Your Experience</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-8 h-8 text-yellow-400 cursor-pointer hover:scale-110 transition-transform fill-current" 
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-cyan-400 font-cyber mb-2 block">Feedback</label>
                  <Textarea 
                    placeholder="Tell us what you think..."
                    className="glass-panel border-cyan-400/30 text-white placeholder-gray-500 font-cyber"
                    rows={4}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => setShowFeedback(false)}
                    variant="outline" 
                    className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800 font-cyber"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setShowFeedback(false)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-cyber"
                  >
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}