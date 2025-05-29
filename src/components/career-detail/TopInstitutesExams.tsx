
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Calendar, Users, ExternalLink } from 'lucide-react';

interface TopInstitutesExamsProps {
  careerType: string;
}

// Mock data - in a real app this would come from API
const mockInstitutes = [
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    rating: 4.8,
    fees: '₹2-8 LPA',
    seats: 120,
    entranceExams: ['JEE Advanced'],
    deadline: '15 Oct 2024'
  },
  {
    id: 'iisc-bangalore',
    name: 'IISc Bangalore',
    location: 'Bangalore, Karnataka',
    rating: 4.9,
    fees: '₹1-5 LPA',
    seats: 80,
    entranceExams: ['GATE', 'JAM'],
    deadline: '30 Nov 2024'
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    rating: 4.6,
    fees: '₹15-20 LPA',
    seats: 200,
    entranceExams: ['BITSAT'],
    deadline: '20 Sep 2024'
  }
];

const mockExams = [
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    type: 'Engineering',
    difficulty: 'High',
    deadline: '15 Oct 2024',
    eligibility: 'JEE Main qualified'
  },
  {
    id: 'gate',
    name: 'GATE',
    type: 'Postgraduate',
    difficulty: 'High',
    deadline: '30 Sep 2024',
    eligibility: 'B.Tech/B.E completed'
  },
  {
    id: 'cat',
    name: 'CAT',
    type: 'Management',
    difficulty: 'High',
    deadline: '25 Nov 2024',
    eligibility: 'Graduate degree'
  }
];

export function TopInstitutesExams({ careerType }: TopInstitutesExamsProps) {
  return (
    <div className="space-y-8">
      {/* Top Institutes Section */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-futuristic font-bold neon-text mb-2">
            Top Institutes
          </h2>
          <p className="text-gray-400 font-cyber">
            Premier institutions offering relevant programs
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {mockInstitutes.map((institute) => (
              <CarouselItem key={institute.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="glass-panel border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover-float h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white font-cyber text-lg">
                        {institute.name}
                      </CardTitle>
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        ⭐ {institute.rating}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="font-cyber text-sm">{institute.location}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400 font-cyber">Fees</p>
                        <p className="text-green-400 font-bold">{institute.fees}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-cyber">Seats</p>
                        <p className="text-blue-400 font-bold">{institute.seats}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 font-cyber text-sm mb-2">Entrance Exams:</p>
                      <div className="flex flex-wrap gap-1">
                        {institute.entranceExams.map((exam) => (
                          <Badge key={exam} className="bg-purple-500/20 text-purple-400">
                            {exam}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-red-400">
                        <Calendar className="w-4 h-4" />
                        <span className="font-cyber text-sm">{institute.deadline}</span>
                      </div>
                      <Button size="sm" className="bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="glass-panel border-cyan-400/30" />
          <CarouselNext className="glass-panel border-cyan-400/30" />
        </Carousel>
      </div>

      {/* Entrance Exams Section */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-futuristic font-bold neon-text mb-2">
            Key Entrance Exams
          </h2>
          <p className="text-gray-400 font-cyber">
            Important exams for this career path
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExams.map((exam) => (
            <Card key={exam.id} className="glass-panel border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover-float">
              <CardHeader>
                <CardTitle className="text-white font-cyber">{exam.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400">{exam.type}</Badge>
                  <Badge className={`${
                    exam.difficulty === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {exam.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-400 font-cyber text-sm">Eligibility:</p>
                  <p className="text-white text-sm">{exam.eligibility}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400">
                    <Calendar className="w-4 h-4" />
                    <span className="font-cyber text-sm">{exam.deadline}</span>
                  </div>
                  <Button size="sm" className="bg-purple-500/20 border border-purple-400/30 text-purple-400 hover:bg-purple-500/30">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
