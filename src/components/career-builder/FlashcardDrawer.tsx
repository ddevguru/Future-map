import React, { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { GraduationCap, FileText, Award, Building, Briefcase, Star } from 'lucide-react';

// Define interfaces
interface FlashcardItem {
  title: string;
  duration: string;
  cost: number;
  type: string;
}

interface FlashcardCategory {
  icon: string;
  color: string;
  items: FlashcardItem[];
}

interface FlashcardDrawerProps {
  onDragStart: (isDragging: boolean) => void;
  isDragging: boolean;
  customBlocks?: FlashcardItem[];
  userInputs?: { educationLevel?: string };
}

const FlashcardDrawer: React.FC<FlashcardDrawerProps> = ({ 
  onDragStart, 
  isDragging, 
  customBlocks = [], 
  userInputs = {}
}) => {
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [categories, setCategories] = useState<Record<string, FlashcardCategory>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Backend URL
  const getBackendUrl = () => {
    return 'http://localhost/Futuremap-backend/flashcards_api.php?action=getFlashcards';
  };

  // Fetch flashcard data from backend
  useEffect(() => {
    const fetchFlashcards = async () => {
      setIsLoading(true);
      setError(null); // Reset error state
      try {
        const authToken = localStorage.getItem('authToken') || '';
        if (!authToken) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch(getBackendUrl(), {
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

        const data: Record<string, FlashcardCategory> = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Add custom blocks if provided
        const updatedCategories = { ...data };
        if (customBlocks.length > 0) {
          updatedCategories.custom = {
            icon: 'Star',
            color: 'cyan',
            items: customBlocks,
          };
        }

        if (Object.keys(updatedCategories).length === 0) {
          setError('No flashcards available for your education level.');
        } else {
          setCategories(updatedCategories);
          setError(null);
        }
      } catch (error: any) {
        console.error('Error fetching flashcards:', error);
        setError(error.message || 'Failed to load flashcards. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashcards();
  }, [customBlocks]);

  const handleDragStart = (e: React.DragEvent, item: FlashcardItem) => {
    onDragStart(true);
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';

    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.transform = 'rotate(5deg) scale(1.1)';
    dragImage.style.opacity = '0.8';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragEnd = () => {
    onDragStart(false);
  };

  const getColorClasses = (color: string): string => {
    switch (color) {
      case 'blue': return 'from-blue-500/20 to-blue-600/20 border-blue-400/30 hover:border-blue-400/50';
      case 'red': return 'from-red-500/20 to-red-600/20 border-red-400/30 hover:border-red-400/50';
      case 'green': return 'from-green-500/20 to-green-600/20 border-green-400/30 hover:border-green-400/50';
      case 'purple': return 'from-purple-500/20 to-purple-600/20 border-purple-400/30 hover:border-blue-400/50';
      case 'orange': return 'from-orange-500/20 to-orange-600/20 border-orange-400/30 hover:border-orange-400/50';
      case 'cyan': return 'from-cyan-500/20 to-cyan-600/20 border-cyan-400/30 hover:border-cyan-400/50';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-400/30 hover:border-gray-400/50';
    }
  };

  const getBadgeColorClasses = (color: string): string => {
    switch (color) {
      case 'blue': return 'bg-blue-400/20 text-blue-400';
      case 'red': return 'bg-red-400/20 text-red-400';
      case 'green': return 'bg-green-400/20 text-green-400';
      case 'purple': return 'bg-purple-400/20 text-purple-400';
      case 'orange': return 'bg-orange-400/20 text-orange-400';
      case 'cyan': return 'bg-cyan-400/20 text-cyan-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  const iconMap: Record<string, React.ComponentType<{ className: string }>> = {
    GraduationCap,
    FileText,
    Award,
    Building,
    Briefcase,
    Star,
  };

  return (
    <div className="glass-panel h-full p-4 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-futuristic font-bold text-white mb-2">
          Career Building Blocks
        </h3>
        <p className="text-sm text-gray-400 font-cyber">
          Drag and drop cards to build your path
        </p>
        {error && (
          <p className="text-sm text-red-400 font-cyber">{error}</p>
        )}
        {isLoading && (
          <p className="text-sm text-cyan-400 font-cyber">Loading flashcards...</p>
        )}
      </div>

      {!isLoading && !error && Object.keys(categories).length === 0 && (
        <p className="text-sm text-yellow-400 font-cyber">
          No flashcards available. Please check your profile settings.
        </p>
      )}

      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <Tabs.List className="grid w-full grid-cols-3 lg:grid-cols-5 glass-panel border-cyan-400/30 mb-4">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Tabs.Trigger
                key={key}
                value={key}
                className="font-cyber data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 
                           transition-all duration-300 hover:scale-105"
              >
                <IconComponent className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        <div className="flex-1 overflow-hidden">
          {Object.entries(categories).map(([key, category]) => (
            <Tabs.Content key={key} value={key} className="h-full overflow-y-auto">
              <div className="grid grid-cols-1 gap-4 pr-2">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    className={`p-4 glass-panel bg-gradient-to-br ${getColorClasses(category.color)} 
                               rounded-lg cursor-grab hover:cursor-grabbing transition-all duration-300 
                               hover:scale-105 hover:shadow-lg hover:shadow-${category.color}-400/20
                               animate-fade-in`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-futuristic font-bold text-white text-sm leading-tight">
                        {item.title}
                      </h4>
                      <div className={`text-xs ${getBadgeColorClasses(category.color)} px-2 py-1 rounded`}>
                        {item.type}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-gray-300 font-cyber">
                      <div>Duration: {item.duration}</div>
                      <div>Cost: ₹{item.cost.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
};

export default FlashcardDrawer;