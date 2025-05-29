
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Quote } from 'lucide-react';

interface SuccessStoriesProps {
  careerType: string;
}

// Mock data - in a real app this would come from API
const mockStories = [
  {
    id: 'story-1',
    name: 'Priya Sharma',
    role: 'Senior Data Scientist at Google',
    path: '12th → B.Tech CSE → Internship → Google',
    duration: '4 years',
    quote: "The journey wasn't easy, but every step was worth it. Focus on building strong fundamentals in math and programming.",
    videoThumbnail: '👩‍💻',
    company: 'Google'
  },
  {
    id: 'story-2',
    name: 'Arjun Patel',
    role: 'Lead Data Scientist at Microsoft',
    path: '10th → Diploma → B.Tech → MS → Microsoft',
    duration: '6 years',
    quote: "Taking the diploma route gave me practical experience early. Don't underestimate alternative paths!",
    videoThumbnail: '👨‍💻',
    company: 'Microsoft'
  },
  {
    id: 'story-3',
    name: 'Sneha Reddy',
    role: 'Data Science Manager at Amazon',
    path: '12th → B.Sc Stats → Certifications → Amazon',
    duration: '5 years',
    quote: "Statistics background was perfect for data science. Online certifications bridged the gap to tech skills.",
    videoThumbnail: '👩‍🔬',
    company: 'Amazon'
  }
];

export function SuccessStories({ careerType }: SuccessStoriesProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-futuristic font-bold neon-text mb-2">
          Real Success Stories
        </h2>
        <p className="text-gray-400 font-cyber">
          See how others made it here - their journeys, challenges, and advice
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStories.map((story) => (
          <Card key={story.id} className="glass-panel border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover-float group cursor-pointer">
            <CardContent className="p-6 space-y-4">
              {/* Video Thumbnail */}
              <div className="relative">
                <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-4xl relative overflow-hidden">
                  {story.videoThumbnail}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center border border-cyan-400/50">
                      <Play className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
                <Badge className="absolute top-2 right-2 bg-blue-500/20 text-blue-400">
                  {story.company}
                </Badge>
              </div>

              {/* Story Details */}
              <div>
                <h3 className="text-white font-bold text-lg">{story.name}</h3>
                <p className="text-cyan-400 font-cyber text-sm">{story.role}</p>
              </div>

              {/* Career Path */}
              <div>
                <p className="text-gray-400 font-cyber text-xs mb-1">Career Path:</p>
                <p className="text-gray-300 text-sm">{story.path}</p>
                <p className="text-green-400 font-cyber text-xs mt-1">Duration: {story.duration}</p>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="w-4 h-4 text-purple-400 absolute -top-1 -left-1" />
                <p className="text-gray-300 text-sm italic pl-4 font-cyber">
                  "{story.quote}"
                </p>
              </div>

              {/* Watch Video Button */}
              <div className="pt-2">
                <div className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-lg text-center text-cyan-400 font-cyber text-sm hover:from-cyan-500/30 hover:to-purple-500/30 transition-all">
                  🎥 Watch Full Story
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
