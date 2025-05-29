
import { useState } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  GraduationCap, 
  Building, 
  BookOpen, 
  TrendingUp,
  Check,
  X,
  Edit,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';

const mockStats = {
  totalUsers: 15420,
  activeMentors: 234,
  partneredInstitutes: 89,
  coursesAvailable: 567,
  monthlyGrowth: 23.5
};

const mockPendingMentors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    expertise: "Data Science",
    experience: "10 years",
    applications: 45,
    status: "pending"
  },
  {
    id: 2,
    name: "Priya Sharma",
    expertise: "Product Management",
    experience: "7 years",
    applications: 23,
    status: "pending"
  }
];

const mockInstitutes = [
  {
    id: 1,
    name: "IIT Delhi",
    type: "Engineering",
    courses: 45,
    students: 1200,
    status: "verified"
  },
  {
    id: 2,
    name: "AIIMS Mumbai",
    type: "Medical",
    courses: 23,
    students: 800,
    status: "pending"
  }
];

const mockAnalytics = [
  { metric: "User Signups", value: "1,245", change: "+15.2%", trend: "up" },
  { metric: "Mentor Sessions", value: "3,456", change: "+8.7%", trend: "up" },
  { metric: "Career Paths Created", value: "2,789", change: "+22.1%", trend: "up" },
  { metric: "Institute Applications", value: "156", change: "+5.3%", trend: "up" }
];

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleApproveMentor = (id: number) => {
    console.log('Approving mentor:', id);
  };

  const handleRejectMentor = (id: number) => {
    console.log('Rejecting mentor:', id);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="glass-panel p-6">
            <h1 className="text-4xl font-futuristic font-bold neon-text mb-4">
              Admin Control Center
            </h1>
            <p className="text-gray-400 font-cyber">
              Manage platform operations and content
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="glass-panel border-cyan-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-cyber text-sm">Total Users</p>
                    <p className="text-2xl font-futuristic text-white">{mockStats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-cyan-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-cyber text-sm">Active Mentors</p>
                    <p className="text-2xl font-futuristic text-white">{mockStats.activeMentors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-cyan-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-cyber text-sm">Institutes</p>
                    <p className="text-2xl font-futuristic text-white">{mockStats.partneredInstitutes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-cyan-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-cyber text-sm">Courses</p>
                    <p className="text-2xl font-futuristic text-white">{mockStats.coursesAvailable}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-cyan-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-cyber text-sm">Growth</p>
                    <p className="text-2xl font-futuristic text-white">+{mockStats.monthlyGrowth}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="glass-panel p-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4 bg-black/20">
                <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="mentors" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  Mentor Management
                </TabsTrigger>
                <TabsTrigger value="institutes" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  Institute Partners
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-panel border-cyan-400/20">
                    <CardHeader>
                      <CardTitle className="text-white font-futuristic">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded bg-black/20">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-cyber text-sm">New mentor approved</p>
                            <p className="text-gray-400 font-cyber text-xs">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded bg-black/20">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Building className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white font-cyber text-sm">Institute partnership request</p>
                            <p className="text-gray-400 font-cyber text-xs">5 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded bg-black/20">
                          <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-white font-cyber text-sm">New course added</p>
                            <p className="text-gray-400 font-cyber text-xs">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border-cyan-400/20">
                    <CardHeader>
                      <CardTitle className="text-white font-futuristic">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Course
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Exam
                        </Button>
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                          <Eye className="w-4 h-4 mr-2" />
                          View Reports
                        </Button>
                        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="mentors" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-futuristic text-white">Pending Mentor Approvals</h3>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Invite Mentor
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {mockPendingMentors.map((mentor) => (
                      <Card key={mentor.id} className="glass-panel border-cyan-400/20">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-futuristic text-white text-lg">{mentor.name}</h4>
                              <p className="text-cyan-400 font-cyber">{mentor.expertise}</p>
                              <p className="text-gray-400 font-cyber text-sm">{mentor.experience} experience</p>
                              <p className="text-gray-400 font-cyber text-sm">{mentor.applications} applications received</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleApproveMentor(mentor.id)}
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-red-400/30 text-red-400 hover:bg-red-400/20"
                                onClick={() => handleRejectMentor(mentor.id)}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                              <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="institutes" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-futuristic text-white">Institute Partners</h3>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Institute
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {mockInstitutes.map((institute) => (
                      <Card key={institute.id} className="glass-panel border-cyan-400/20">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-futuristic text-white text-lg">{institute.name}</h4>
                              <p className="text-cyan-400 font-cyber">{institute.type}</p>
                              <p className="text-gray-400 font-cyber text-sm">{institute.courses} courses • {institute.students} students</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge 
                                className={institute.status === 'verified' 
                                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                  : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                                }
                              >
                                {institute.status}
                              </Badge>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockAnalytics.map((item, index) => (
                    <Card key={index} className="glass-panel border-cyan-400/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-futuristic text-white">{item.metric}</h4>
                          <Badge className={`${
                            item.trend === 'up' 
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}>
                            {item.change}
                          </Badge>
                        </div>
                        <p className="text-3xl font-futuristic text-white mb-2">{item.value}</p>
                        <div className="h-20 bg-black/20 rounded flex items-center justify-center">
                          <p className="text-gray-400 font-cyber text-sm">Chart visualization</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
