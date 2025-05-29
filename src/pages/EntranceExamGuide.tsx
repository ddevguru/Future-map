
import { useState } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Users, Target, Plus, Lightbulb } from 'lucide-react';

const mockExams = [
  {
    id: 1,
    name: "JEE Advanced",
    purpose: "Gateway to IITs for Engineering programs",
    difficulty: "Very High",
    timeline: [
      { date: "Nov 2024", event: "Registration Opens", status: "upcoming" },
      { date: "Jan 2025", event: "Application Deadline", status: "upcoming" },
      { date: "May 2025", event: "Exam Date", status: "upcoming" },
      { date: "Jun 2025", event: "Results", status: "upcoming" }
    ],
    eligibility: "Must qualify JEE Main with top 2.5 lakh rank",
    syllabus: ["Physics", "Chemistry", "Mathematics"],
    aiTips: [
      "Focus on conceptual understanding over memorization",
      "Practice previous year papers religiously",
      "Time management is crucial - solve mock tests daily"
    ],
    linkedCareers: ["Software Engineer", "Mechanical Engineer", "Research Scientist"]
  },
  {
    id: 2,
    name: "NEET UG",
    purpose: "National eligibility test for medical courses",
    difficulty: "High",
    timeline: [
      { date: "Dec 2024", event: "Registration Opens", status: "active" },
      { date: "Mar 2025", event: "Application Deadline", status: "upcoming" },
      { date: "May 2025", event: "Exam Date", status: "upcoming" },
      { date: "Jun 2025", event: "Results", status: "upcoming" }
    ],
    eligibility: "12th with Physics, Chemistry, Biology",
    syllabus: ["Physics", "Chemistry", "Biology"],
    aiTips: [
      "NCERT books are your best friend",
      "Focus on Biology - it carries the most weightage",
      "Practice diagrams and biological processes"
    ],
    linkedCareers: ["Doctor", "Surgeon", "Medical Researcher"]
  }
];

export default function EntranceExamGuide() {
  const [selectedExam, setSelectedExam] = useState(mockExams[0]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="glass-panel p-6">
            <h1 className="text-4xl font-futuristic font-bold neon-text mb-4">
              Entrance Exam Guide
            </h1>
            <p className="text-gray-400 font-cyber">
              Master your entrance exams with AI-powered preparation strategies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Exam Selection */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-futuristic text-white mb-4">Select Exam</h2>
              {mockExams.map((exam) => (
                <Card 
                  key={exam.id}
                  className={`glass-panel cursor-pointer transition-all duration-300 ${
                    selectedExam.id === exam.id ? 'border-cyan-400 bg-cyan-400/10' : 'border-cyan-400/20 hover:border-cyan-400/50'
                  }`}
                  onClick={() => setSelectedExam(exam)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white font-futuristic text-lg">{exam.name}</CardTitle>
                    <p className="text-gray-400 text-sm font-cyber">{exam.purpose}</p>
                  </CardHeader>
                  <CardContent>
                    <Badge 
                      className={`${
                        exam.difficulty === 'Very High' ? 'bg-red-500/20 text-red-300' :
                        exam.difficulty === 'High' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {exam.difficulty} Difficulty
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Exam Overview */}
              <Card className="glass-panel border-cyan-400/20">
                <CardHeader>
                  <CardTitle className="text-white font-futuristic text-2xl flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-cyan-400" />
                    {selectedExam.name}
                  </CardTitle>
                  <p className="text-gray-400 font-cyber">{selectedExam.purpose}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-cyan-400 font-cyber font-semibold mb-2">Difficulty Level</h3>
                      <Badge className={`${
                        selectedExam.difficulty === 'Very High' ? 'bg-red-500/20 text-red-300' :
                        selectedExam.difficulty === 'High' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {selectedExam.difficulty}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-cyan-400 font-cyber font-semibold mb-2">Eligibility</h3>
                      <p className="text-gray-300 text-sm font-cyber">{selectedExam.eligibility}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Animated Timeline */}
              <Card className="glass-panel border-cyan-400/20">
                <CardHeader>
                  <CardTitle className="text-white font-futuristic text-xl flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedExam.timeline.map((event, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-black/20 rounded-lg border border-cyan-400/10">
                        <div className={`w-3 h-3 rounded-full ${
                          event.status === 'active' ? 'bg-green-400 animate-pulse' : 
                          event.status === 'completed' ? 'bg-gray-400' : 
                          'bg-cyan-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-cyber font-semibold">{event.event}</h4>
                            <span className="text-cyan-400 font-cyber text-sm">{event.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expandable Sections */}
              <div className="space-y-4">
                {/* Syllabus Section */}
                <Card className="glass-panel border-cyan-400/20">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedSection(expandedSection === 'syllabus' ? null : 'syllabus')}
                  >
                    <CardTitle className="text-white font-futuristic text-lg flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-cyan-400" />
                        Syllabus Overview
                      </span>
                      <span className="text-cyan-400">
                        {expandedSection === 'syllabus' ? '−' : '+'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  {expandedSection === 'syllabus' && (
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedExam.syllabus.map((subject, index) => (
                          <div key={index} className="p-4 bg-black/20 rounded-lg border border-cyan-400/10">
                            <h4 className="text-cyan-400 font-cyber font-semibold mb-2">{subject}</h4>
                            <p className="text-gray-400 text-sm">Detailed topics and chapters</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* AI Prep Tips */}
                <Card className="glass-panel border-green-400/20">
                  <CardHeader>
                    <CardTitle className="text-white font-futuristic text-lg flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-green-400" />
                      AI Prep Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedExam.aiTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-400/5 rounded-lg border border-green-400/20">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-300 font-cyber text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Linked Careers */}
                <Card className="glass-panel border-purple-400/20">
                  <CardHeader>
                    <CardTitle className="text-white font-futuristic text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      Career Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedExam.linkedCareers.map((career, index) => (
                        <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-cyber">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Career Plan
                </Button>
                <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 font-cyber">
                  Get Coaching
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
