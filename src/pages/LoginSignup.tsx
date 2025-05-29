import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, GraduationCap, Building, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginSignup() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const navigate = useNavigate();

  const validateSignup = (data) => {
    if (!data.firstName || data.firstName.length < 2) {
      return 'First name must be at least 2 characters.';
    }
    if (!data.lastName || data.lastName.length < 2) {
      return 'Last name must be at least 2 characters.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'Please enter a valid email address.';
    }
    if (data.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return null;
  };

  const validateSignIn = (data) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'Please enter a valid email address.';
    }
    if (!data.password) {
      return 'Password is required.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('firstName')?.trim(),
      lastName: formData.get('lastName')?.trim(),
      email: formData.get('signupEmail')?.trim(),
      password: formData.get('signupPassword'),
      role: selectedRole,
    };

    const validationError = validateSignup(data);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/Futuremap-backend/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess('Account created successfully! Please sign in.');
        setActiveTab('signin');
        e.target.reset();
      } else {
        setError(result.message || 'Failed to create account.');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email')?.trim(),
      password: formData.get('password'),
    };

    const validationError = validateSignIn(data);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/Futuremap-backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Login successful, storing token:', result.token); // Debug
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/dashboard');
      } else {
        setError(result.message || 'Failed to sign in.');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      id: 'student',
      name: 'Student',
      icon: User,
      description: 'Explore careers and build your path',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'mentor',
      name: 'Mentor',
      icon: GraduationCap,
      description: 'Guide students on their journey',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'institute',
      name: 'Institute',
      icon: Building,
      description: 'Connect with prospective students',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-4xl relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-futuristic font-bold neon-text mb-4">
            Welcome to FutureMap
          </h1>
          <p className="text-gray-400 font-cyber">
            Your AI-powered career navigation platform
          </p>
        </div>

        <Card className="glass-panel border-cyan-400/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-futuristic text-white">
              Join the Future of Career Planning
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/20">
                <TabsTrigger value="signin" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <div className="mb-8">
                <Label className="text-cyan-400 font-cyber mb-4 block">Choose Your Role</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roleOptions.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <Card
                        key={role.id}
                        className={`cursor-pointer transition-all duration-300 border-2 ${
                          selectedRole === role.id
                            ? 'border-cyan-400/50 bg-cyan-400/10'
                            : 'border-gray-600/30 bg-black/20 hover:border-gray-500/50'
                        }`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center mx-auto mb-3`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-futuristic text-white font-bold">{role.name}</h3>
                          <p className="text-gray-400 font-cyber text-sm mt-1">{role.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-300 font-cyber">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-black/20 border-cyan-400/30 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-gray-300 font-cyber">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 bg-black/20 border-cyan-400/30 text-white placeholder-gray-400"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 font-cyber text-sm text-center">{error}</p>
                  )}
                  {success && (
                    <p className="text-green-400 font-cyber text-sm text-center">{success}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 font-futuristic"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300 font-cyber">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter first name"
                        className="bg-black/20 border-cyan-400/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300 font-cyber">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter last name"
                        className="bg-black/20 border-cyan-400/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signupEmail" className="text-gray-300 font-cyber">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="signupEmail"
                        name="signupEmail"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-black/20 border-cyan-400/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signupPassword" className="text-gray-300 font-cyber">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="signupPassword"
                        name="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 bg-black/20 border-cyan-400/30 text-white placeholder-gray-400"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 font-cyber text-sm text-center">{error}</p>
                  )}
                  {success && (
                    <p className="text-green-400 font-cyber text-sm text-center">{success}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-futuristic"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}