import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // User data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}') || {
    firstName: 'User',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  // State for form inputs
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [address, setAddress] = useState('');
  const [grade, setGrade] = useState('');
  const [stream, setStream] = useState('');
  const [grades, setGrades] = useState([]);
  const [streams, setStreams] = useState([]);

  // Define tabs for sidebar navigation
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'language', name: 'Language', icon: Globe },
  ];

  // Fetch grades and streams on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Please sign in to load options.');
          setDialogOpen(true);
          return;
        }

        const response = await fetch('http://localhost/Futuremap-backend/fetch_options.php', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token.trim()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        const text = await response.text();
        if (!response.ok) {
          console.error('Fetch error response:', response.status, text);
          throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}...`);
        }

        try {
          const data = JSON.parse(text);
          if (!data.success) {
            throw new Error(data.message || 'Failed to fetch options');
          }

          setGrades(data.grades || []);
          setStreams(data.streams || []);

          if (data.grades?.length > 0) setGrade(data.grades[0]);
          if (data.streams?.length > 0) setStream(data.streams[0]);
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError, 'Response:', text);
          throw new Error('Invalid JSON response from server');
        }
      } catch (err) {
        console.error('Fetch options error:', err);
        setError(`Unable to load grades and streams: ${err.message}`);
        setDialogOpen(true);
      }
    };

    fetchOptions();
  }, []);

  const validatePhoneNumber = (phone) => {
    if (!phone) return 'Phone number is required.';
    if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return 'Please enter a valid phone number (e.g., +919876543210).';
    }
    return null;
  };

  const validateAddress = (addr) => {
    if (!addr) return 'Address is required.';
    if (addr.length > 255) return 'Address cannot exceed 255 characters.';
    return null;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const phoneError = validatePhoneNumber(phoneNumber);
    const addressError = validateAddress(address);
    if (phoneError || addressError) {
      setError(phoneError || addressError);
      setDialogOpen(true);
      setIsLoading(false);
      return;
    }

    if (!grade || !stream) {
      setError('Please select a grade and stream.');
      setDialogOpen(true);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please sign in again.');
        setDialogOpen(true);
        setTimeout(() => navigate('/login'), 2000);
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost/Futuremap-backend/update_profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.trim()}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          phoneNumber,
          address,
          grade,
          stream
        })
      });

      const text = await response.text();
      if (!response.ok) {
        console.error('Update profile error:', response.status, text);
        throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}...`);
      }

      const result = JSON.parse(text);
      if (result.success) {
        const updatedUser = { ...user, phoneNumber, address };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccess('Profile updated successfully.');
        setDialogOpen(true);
      } else {
        setError(result.message || 'Failed to update profile.');
        setDialogOpen(true);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Unable to connect to the server: ${err.message}`);
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-futuristic font-bold neon-text mb-2">
                  Settings
                </h1>
                <p className="text-gray-400 font-cyber">
                  Customize your FutureMap experience
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                onClick={handleSaveProfile}
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6">
              <h3 className="text-xl font-futuristic text-white mb-4">Categories</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${activeTab === tab.id
                          ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-cyber">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <Card className="glass-panel border-cyan-400/20">
                    <CardHeader>
                      <CardTitle className="font-futuristic text-white">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 font-cyber text-sm mb-2">First Name</label>
                          <Input 
                            value={user.firstName} 
                            className="bg-black/20 border-cyan-400/30 text-white"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-cyber text-sm mb-2">Last Name</label>
                          <Input 
                            value={user.lastName} 
                            className="bg-black/20 border-cyan-400/30 text-white"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-300 font-cyber text-sm mb-2">Email</label>
                        <Input 
                          value={user.email} 
                          type="email"
                          className="bg-black/20 border-cyan-400/30 text-white"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-cyber text-sm mb-2">Phone</label>
                        <Input 
                          value={phoneNumber} 
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+919876543210"
                          className="bg-black/20 border-cyan-400/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-cyber text-sm mb-2">Address</label>
                        <Textarea 
                          value={address} 
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your address"
                          className="bg-black/20 border-cyan-400/30 text-white"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border-cyan-400/20">
                    <CardHeader>
                      <CardTitle className="font-futuristic text-white">Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 font-cyber text-sm mb-2">Current Grade</label>
                          <select 
                            value={grade} 
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white font-cyber"
                          >
                            {grades.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-cyber text-sm mb-2">Stream</label>
                          <select 
                            value={stream} 
                            onChange={(e) => setStream(e.target.value)}
                            className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white font-cyber"
                          >
                            {streams.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'notifications' && (
                <Card className="glass-panel border-cyan-400/20">
                  <CardHeader>
                    <CardTitle className="font-futuristic text-white">Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { name: 'Email Notifications', desc: 'Receive updates via email' },
                      { name: 'Push Notifications', desc: 'Browser push notifications' },
                      { name: 'SMS Alerts', desc: 'Important deadlines via SMS' },
                      { name: 'Weekly Summary', desc: 'Weekly progress report' },
                      { name: 'Mentor Messages', desc: 'New messages from mentors' },
                      { name: 'Career Updates', desc: 'New career opportunities' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                        <div>
                          <h4 className="font-cyber text-white">{item.name}</h4>
                          <p className="text-gray-400 font-cyber text-sm">{item.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <Card className="glass-panel border-cyan-400/20">
                    <CardHeader>
                      <CardTitle className="font-futuristic text-white">Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-gray-300 font-cyber text-sm mb-2">Current Password</label>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            className="bg-black/20 border-cyan-400/30 text-white pr-10"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-300 font-cyber text-sm mb-2">New Password</label>
                        <Input 
                          type="password"
                          className="bg-black/20 border-cyan-400/30 text-white"
                        />
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600">
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border-cyan-400/20">
                    <CardHeader>
                      <CardTitle className="font-futuristic text-white">Data & Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full border-blue-400/30 text-blue-400 hover:bg-blue-400/20">
                        <Download className="w-4 h-4 mr-2" />
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full border-red-400/30 text-red-400 hover:bg-red-400/20">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'appearance' && (
                <Card className="glass-panel border-cyan-400/20">
                  <CardHeader>
                    <CardTitle className="font-futuristic text-white">Appearance Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-cyber text-white mb-4">Theme</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {['Dark', 'Neon', 'Cyber'].map((theme) => (
                          <button
                            key={theme}
                            className="p-4 bg-black/20 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 transition-colors"
                          >
                            <div className="h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded mb-2"></div>
                            <span className="font-cyber text-sm text-white">{theme}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-cyber text-white mb-4">Animation Speed</h4>
                      <select className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white font-cyber">
                        <option>Normal</option>
                        <option>Fast</option>
                        <option>Slow</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'language' && (
                <Card className="glass-panel border-cyan-400/20">
                  <CardHeader>
                    <CardTitle className="font-futuristic text-white">Language & Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-cyber text-sm mb-2">Language</label>
                      <select className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white font-cyber">
                        <option>English</option>
                        <option>हिंदी (Hindi)</option>
                        <option>বাংলা (Bengali)</option>
                        <option>தமிழ் (Tamil)</option>
                        <option>తెలుగు (Telugu)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 font-cyber text-sm mb-2">Region</label>
                      <select className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white font-cyber">
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 font-cyber text-sm mb-2">Time Zone</label>
                      <select className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white font-cyber">
                        <option>IST (UTC+5:30)</option>
                        <option>PST (UTC-8:00)</option>
                        <option>EST (UTC-5:00)</option>
                        <option>GMT (UTC+0:00)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 glass-panel border-cyan-400/20 p-6 rounded-lg max-w-md w-full">
                <VisuallyHidden>
                  <Dialog.Title>Profile Update Status</Dialog.Title>
                  <Dialog.Description>Notification about the status of your profile update.</Dialog.Description>
                </VisuallyHidden>
                <div className="space-y-4">
                  {success && (
                    <p className="text-green-400 font-cyber text-center">{success}</p>
                  )}
                  {error && (
                    <p className="text-red-400 font-cyber text-center">{error}</p>
                  )}
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    onClick={() => setDialogOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                <Dialog.Close asChild>
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </main>
      </div>
    </SidebarProvider>
  );
}