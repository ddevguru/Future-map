
import { useState } from 'react';
import { CareerSnapshotPanel } from '@/components/career-detail/CareerSnapshotPanel';
import { PathwayOverview } from '@/components/career-detail/PathwayOverview';
import { EntryPathsCards } from '@/components/career-detail/EntryPathsCards';
import { TopInstitutesExams } from '@/components/career-detail/TopInstitutesExams';
import { SuccessStories } from '@/components/career-detail/SuccessStories';
import { AIRecommendationBox } from '@/components/career-detail/AIRecommendationBox';
import { QuickActionBar } from '@/components/career-detail/QuickActionBar';
import { useQuery } from '@tanstack/react-query';

// Mock data for the career - in a real app this would come from API
const mockCareerData = {
  id: 'data-scientist',
  title: 'Data Scientist',
  icon: '🧠',
  stats: {
    averageSalary: '₹12-25 LPA',
    growthRate: '22%',
    workHours: '40-45 hrs/week',
    satisfactionScore: 4.2
  },
  timeline: [
    { step: '10th Grade', description: 'Complete secondary education with focus on Math & Science' },
    { step: '12th Grade', description: 'Choose PCM stream with Computer Science' },
    { step: 'Entrance Exam', description: 'JEE Main/Advanced, State CET' },
    { step: 'Bachelor\'s Degree', description: 'B.Tech in CSE/IT or B.Sc in Stats/Math' },
    { step: 'Skills & Certifications', description: 'Python, R, SQL, Machine Learning' },
    { step: 'Internship', description: '3-6 months industry experience' },
    { step: 'Entry-Level Job', description: 'Junior Data Analyst/Scientist' }
  ],
  entryPaths: [
    {
      id: 'path-a',
      title: 'Engineering Route',
      duration: '4 years',
      steps: ['12th PCM', 'JEE Main/Advanced', 'B.Tech CSE', 'Internship'],
      eligibility: '75% in 12th',
      difficulty: 'High'
    },
    {
      id: 'path-b',
      title: 'Science Route',
      duration: '3 years',
      steps: ['12th PCM', 'B.Sc Mathematics/Statistics', 'Certifications'],
      eligibility: '60% in 12th',
      difficulty: 'Medium'
    },
    {
      id: 'path-c',
      title: 'Diploma Route',
      duration: '5 years',
      steps: ['10th', 'Diploma in CS', 'B.Tech Lateral', 'Specialization'],
      eligibility: '50% in 10th',
      difficulty: 'Medium'
    }
  ]
};

const CareerDetailExplorer = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Mock query for career data
  const { data: careerData, isLoading } = useQuery({
    queryKey: ['career-detail', 'data-scientist'],
    queryFn: () => Promise.resolve(mockCareerData),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-white mt-4 font-cyber">Loading career details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Career Snapshot Panel */}
        <CareerSnapshotPanel career={careerData} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Pathway Overview */}
          <PathwayOverview timeline={careerData.timeline} />

          {/* Entry Paths & Eligibility Cards */}
          <EntryPathsCards 
            paths={careerData.entryPaths}
            selectedPath={selectedPath}
            onPathSelect={setSelectedPath}
          />

          {/* Top Institutes & Exams */}
          <TopInstitutesExams careerType={careerData.id} />

          {/* Success Stories */}
          <SuccessStories careerType={careerData.id} />

          {/* AI-Powered Recommendation Box */}
          <AIRecommendationBox career={careerData} />
        </div>

        {/* Quick Action Bar */}
        <QuickActionBar career={careerData} />
      </div>
    </div>
  );
};

export default CareerDetailExplorer;
