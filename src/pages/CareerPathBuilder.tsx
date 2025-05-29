
import { useState, useEffect, useRef } from 'react';
import { UserInputPanel } from '@/components/career-builder/UserInputPanel';
import { SaveExportPanel } from '@/components/career-builder/SaveExportPanel';
import { FloatingCTAButton } from '@/components/career-builder/FloatingCTAButton';
import { AddBlockModal } from '@/components/career-builder/AddBlockModal';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkles, Zap, FolderPlus, X, Clock, DollarSign, User, Trash2, Link, Save, Download, Users, Award, Building, Briefcase, FileText, GraduationCap, MessageSquare, Star } from 'lucide-react';
import { DraggableWrapper } from '@/components/career-builder/DraggableWrapper';
import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import html2canvas from 'html2canvas';

// Define interfaces
export interface DroppedCard {
  id: string;
  type: 'course' | 'exam' | 'skill' | 'institution' | 'internship';
  title: string;
  duration: string;
  cost: number;
  position: { x: number; y: number };
}

export interface UserInputs {
  educationLevel: string;
  scoreRange: string;
  interests: string[];
  budget: string;
  timeline: string;
}

export interface CareerPath {
  id: string;
  cards: DroppedCard[];
  connections: Array<{ from: string; to: string }>;
  createdAt: Date;
}

interface DragDropCanvasProps {
  droppedCards: DroppedCard[];
  onCardDrop: (card: Omit<DroppedCard, 'position'>, position: { x: number; y: number }) => void;
  onCardRemove: (cardId: string) => void;
  onCardDrag: (cardId: string, position: { x: number; y: number }) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  pathIndex: number;
  pathId: string;
  onRemovePath: () => void;
  onAddConnection: (fromCardId: string, toCardId: string) => void;
  connections: Array<{ from: string; to: string }>;
  connectingMode: string | null;
  setConnectingMode: (cardId: string | null) => void;
}

// DragDropCanvas Component
export const DragDropCanvas = forwardRef<HTMLDivElement, DragDropCanvasProps>(
  (
    {
      droppedCards,
      onCardDrop,
      onCardRemove,
      onCardDrag,
      isDragging,
      setIsDragging,
      pathIndex,
      pathId,
      onRemovePath,
      onAddConnection,
      connections,
      connectingMode,
      setConnectingMode,
    },
    ref
  ) => {
    const [dragOverPosition, setDragOverPosition] = useState<{ x: number; y: number } | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top - 80;
      const snappedX = Math.round(Math.max(0, Math.min(x, 340)) / 30) * 30;
      const snappedY = Math.round(Math.max(0, Math.min(y, 460)) / 30) * 30;
      setDragOverPosition({ x: snappedX, y: snappedY });
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setDragOverPosition(null);

      try {
        const cardData = JSON.parse(e.dataTransfer.getData('application/json'));
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top - 80;
        const snappedX = Math.round(Math.max(0, Math.min(x, 340)) / 30) * 30;
        const snappedY = Math.round(Math.max(0, Math.min(y, 460)) / 30) * 30;

        const newCard = { ...cardData, id: `${cardData.type}-${Date.now()}`, position: { x: snappedX, y: snappedY } };
        onCardDrop(cardData, { x: snappedX, y: snappedY });
        new Audio('/sounds/drop.mp3').play();
      } catch (error) {
        console.error('Error parsing dropped data:', error);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
        setDragOverPosition(null);
      }
    };

    const handleCardDragStop = (cardId: string, e: any, data: any) => {
      const snappedX = Math.round(Math.max(0, Math.min(data.x, 340)) / 30) * 30;
      const snappedY = Math.round(Math.max(0, Math.min(data.y - 80, 460)) / 30) * 30;
      onCardDrag(cardId, { x: snappedX, y: snappedY });
    };

    const handleConnectClick = (cardId: string) => {
      if (connectingMode) {
        if (connectingMode !== cardId) {
          onAddConnection(connectingMode, cardId);
        }
        setConnectingMode(null);
      } else {
        setConnectingMode(cardId);
      }
    };

    const handleSavePath = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Authentication token not found. Please log in.');
          return;
        }

        const response = await fetch('http://localhost/Futuremap-backend/career_paths_api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            pathId,
            cards: droppedCards,
            connections,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Career path saved successfully!');
        } else {
          alert(`Failed to save career path: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error saving career path:', error);
        alert('An error occurred while saving the career path.');
      }
    };

    const handleDownloadImage = async () => {
      if (canvasRef.current) {
        try {
          const canvasElement = canvasRef.current.querySelector('.absolute.inset-0');
          if (canvasElement) {
            const canvas = await html2canvas(canvasElement as HTMLElement, {
              backgroundColor: null,
              y: 80, // Exclude the sticky header
              height: canvasRef.current.offsetHeight - 80, // Adjust height to exclude header
            });
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `career_path_${pathId}.png`;
            link.click();
          }
        } catch (error) {
          console.error('Error generating canvas image:', error);
          alert('An error occurred while downloading the image.');
        }
      }
    };

    const getCardTypeColor = (type: string) => {
      switch (type) {
        case 'course':
          return 'from-blue-400/20 to-blue-500/20 border-blue-400/30 shadow-blue-400/20';
        case 'exam':
          return 'from-magenta-400/20 to-magenta-500/20 border-magenta-400/30 shadow-magenta-400/20';
        case 'skill':
          return 'from-green-400/20 to-green-500/20 border-green-400/30 shadow-green-400/20';
        case 'institution':
          return 'from-purple-400/20 to-purple-500/20 border-purple-400/30 shadow-purple-400/20';
        case 'internship':
          return 'from-orange-400/20 to-orange-500/20 border-orange-400/30 shadow-orange-400/20';
        default:
          return 'from-gray-400/20 to-gray-500/20 border-gray-400/30 shadow-gray-400/20';
      }
    };

    return (
      <motion.div
        ref={canvasRef}
        className={`relative w-[400px] h-[1000px] overflow-hidden glass-panel border-cyan-400/30 ${
          isDragging ? 'ring-2 ring-cyan-400/50' : ''
        } transition-all duration-300 cursor-default hover-glow animate-scale-in`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,243,255,0.15) 1px, transparent 0),
            linear-gradient(to right, rgba(0,243,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,243,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 30px 30px, 30px 30px',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0" style={{ minWidth: '400px', minHeight: '600px' }}>
          <motion.div
            className="sticky top-0 z-20 glass-panel border-b border-cyan-400/20 p-4 mb-4 backdrop-blur-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-futuristic font-bold text-cyan-400 flex items-center neon-text animate-neon-pulse">
                <Sparkles className="w-5 h-5 mr-2 text-magenta-400 animate-pulse" />
                Path {pathIndex + 1}
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleSavePath}
                  variant="ghost"
                  size="icon"
                  className="glass-panel hover-glow text-green-400 hover:text-white"
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleDownloadImage}
                  variant="ghost"
                  size="icon"
                  className="glass-panel hover-glow text-blue-400 hover:text-white"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  onClick={onRemovePath}
                  variant="ghost"
                  size="icon"
                  className="glass-panel hover-glow text-magenta-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <svg className="absolute inset-0 pointer-events-none z-10" style={{ top: 80 }}>
            {connections.map((connection, index) => {
              const fromCard = droppedCards.find((card) => card.id === connection.from);
              const toCard = droppedCards.find((card) => card.id === connection.to);
              if (!fromCard || !toCard) return null;
              return (
                <motion.line
                  key={index}
                  x1={fromCard.position.x + 128}
                  y1={fromCard.position.y + 64}
                  x2={toCard.position.x + 128}
                  y2={toCard.position.y + 64}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              );
            })}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {droppedCards.map((card, index) => (
            <DraggableWrapper
              key={card.id}
              cardId={card.id}
              defaultPosition={{ x: card.position.x, y: card.position.y + 80 }}
              onStop={handleCardDragStop}
              bounds="parent"
              grid={[30, 30]}
            >
              <motion.div
                className={`absolute w-56 p-4 glass-panel bg-gradient-to-br ${getCardTypeColor(
                  card.type
                )} rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-30 group ${
                  connectingMode ? 'cursor-pointer' : ''
                } ${connectingMode === card.id ? 'ring-2 ring-cyan-400' : ''}`}
                onClick={() => connectingMode && handleConnectClick(card.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-cyber font-semibold text-white text-sm">{card.title}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleConnectClick(card.id)}
                      className={`text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 ${
                        connectingMode === card.id ? 'text-cyan-400' : ''
                      }`}
                    >
                      <Link className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onCardRemove(card.id)}
                      className="text-gray-400 hover:text-magenta-400 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-400 font-cyber">
                    <Clock className="w-3 h-3" />
                    <span>{card.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 font-cyber">
                    <DollarSign className="w-3 h-3" />
                    <span>₹{card.cost.toLocaleString()}</span>
                  </div>
                </div>
                <div
                  className={`mt-3 px-3 py-1 rounded-full text-xs font-cyber text-center ${
                    card.type === 'course'
                      ? 'bg-blue-400/20 text-blue-400'
                      : card.type === 'exam'
                      ? 'bg-magenta-400/20 text-magenta-400'
                      : card.type === 'skill'
                      ? 'bg-green-400/20 text-green-400'
                      : card.type === 'institution'
                      ? 'bg-purple-400/20 text-purple-400'
                      : 'bg-orange-400/20 text-orange-400'
                  }`}
                >
                  {card.type.toUpperCase()}
                </div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 100}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
              </motion.div>
            </DraggableWrapper>
          ))}

          {isDragging && dragOverPosition && (
            <motion.div
              className="absolute w-56 h-28 border-2 border-dashed border-cyan-400/50 rounded-lg bg-gradient-to-br from-cyan-400/10 to-purple-500/10 animate-pulse backdrop-blur-sm"
              style={{
                left: dragOverPosition.x,
                top: dragOverPosition.y + 80,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Sparkles className="w-6 h-6 text-cyan-400 mx-auto mb-2 animate-spin" />
                  <span className="text-cyan-400 font-cyber text-sm">Drop here</span>
                </div>
              </div>
            </motion.div>
          )}

          {droppedCards.length === 0 && !isDragging && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <div className="w-28 h-28 mx-auto mb-6 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-400/5 to-purple-500/5">
                  <Sparkles className="text-5xl animate-pulse text-cyan-400" />
                </div>
                <h3 className="text-2xl font-futuristic font-bold text-gray-400 mb-3">
                  Start Building Path {pathIndex + 1}
                </h3>
                <p className="text-gray-400 font-cyber max-w-xs">
                  Drag cards from the right panel to create your career journey.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }
);

DragDropCanvas.displayName = 'DragDropCanvas';

// FlashcardDrawer Component
const FlashcardDrawer = ({
  onDragStart,
  isDragging,
  customBlocks,
  userInputs,
  flashcards,
  loading,
  error,
}: {
  onDragStart: (isDragging: boolean) => void;
  isDragging: boolean;
  customBlocks: any[];
  userInputs: UserInputs;
  flashcards: { [key: string]: { icon: string; color: string; items: any[] } };
  loading: boolean;
  error: string | null;
}) => {
  const iconMap: { [key: string]: JSX.Element } = {
    GraduationCap: <GraduationCap />,
    FileText: <FileText />,
    Award: <Award />,
    Building: <Building />,
    Briefcase: <Briefcase />,
  };

  const handleDragStart = (block: any) => (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(block));
    onDragStart(true);
    new Audio('/sounds/drag.mp3').play();
  };

  return (
    <Card className="glass-panel border-cyan-400/30 hover-glow animate-scale-in h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-cyan-400 font-futuristic">
          <Sparkles className="w-6 h-6" />
          <span>Career Building Blocks</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto">
        {loading && (
          <div className="text-center text-gray-400 font-cyber">Loading flashcards...</div>
        )}
        {error && (
          <div className="text-center text-magenta-400 font-cyber">{error}</div>
        )}
        {!loading && !error && Object.keys(flashcards).length === 0 && (
          <div className="text-center text-gray-400 font-cyber">No flashcards available for your education level.</div>
        )}
        {Object.entries(flashcards).map(([category, { icon, color, items }], index) => (
          <div key={category} className="space-y-2">
            <h4 className={`text-sm font-cyber text-${color}-400 flex items-center mb-2`} style={{ animationDelay: `${index * 0.1}s` }}>
              {iconMap[icon] || <Sparkles />}
              <span className="ml-2">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </h4>
            {items.map((block, idx) => (
              <motion.div
                key={idx}
                draggable
                onDragStart={handleDragStart(block)}
                className={`p-3 glass-panel bg-gradient-to-r from-${color}-400/20 to-${color}-500/20 rounded-lg cursor-move hover:shadow-lg hover:shadow-${color}-400/30`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h5 className="text-sm font-cyber text-white font-semibold">{block.title}</h5>
                <p className="text-xs text-gray-400 font-cyber">{block.duration}</p>
                <p className="text-xs text-gray-400 font-cyber">₹{block.cost.toLocaleString()}</p>
              </motion.div>
            ))}
            {customBlocks
              .filter((block) => block.type === items[0]?.type)
              .map((block, idx) => (
                <motion.div
                  key={`custom-${idx}`}
                  draggable
                  onDragStart={handleDragStart(block)}
                  className={`p-3 glass-panel bg-gradient-to-r from-${color}-400/20 to-${color}-500/20 rounded-lg cursor-move hover:shadow-lg hover:shadow-${color}-400/30`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h5 className="text-sm font-cyber text-white font-semibold">{block.title}</h5>
                  <p className="text-xs text-gray-400 font-cyber">{block.duration}</p>
                  <p className="text-xs text-gray-400 font-cyber">₹{block.cost.toLocaleString()}</p>
                </motion.div>
              ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// CareerPathBuilder Component
const CareerPathBuilder = () => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([
    {
      id: '1',
      cards: [],
      connections: [],
      createdAt: new Date(),
    },
  ]);
  const [currentPathId, setCurrentPathId] = useState('1');
  const [isDragging, setIsDragging] = useState(false);
  const [customBlocks, setCustomBlocks] = useState<any[]>([]);
  const [userInputs, setUserInputs] = useState<UserInputs>({
    educationLevel: '12th',
    scoreRange: '60-80',
    interests: [],
    budget: 'Medium',
    timeline: 'Standard',
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [connectingModes, setConnectingModes] = useState<{ [pathId: string]: string | null }>({});
  const [flashcards, setFlashcards] = useState<{ [key: string]: { icon: string; color: string; items: any[] } }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost/Futuremap-backend/flashcards_api.php?action=getFlashcards', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setFlashcards(data);
        }
      } catch (err) {
        setError('Failed to fetch flashcards: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [userInputs.educationLevel]);

  const handleCardDrop = (pathId: string) => (card: Omit<DroppedCard, 'position'>, position: { x: number; y: number }) => {
    const newCard: DroppedCard = {
      ...card,
      id: `${card.type}-${Date.now()}`,
      position,
    };
    setCareerPaths((prev) =>
      prev.map((path) =>
        path.id === pathId ? { ...path, cards: [...path.cards, newCard] } : path
      )
    );
  };

  const handleCardRemove = (pathId: string) => (cardId: string) => {
    setCareerPaths((prev) =>
      prev.map((path) =>
        path.id === pathId
          ? {
              ...path,
              cards: path.cards.filter((card) => card.id !== cardId),
              connections: path.connections.filter(
                (conn) => conn.from !== cardId && conn.to !== cardId
              ),
            }
          : path
      )
    );
    setConnectingModes((prev) => {
      const newModes = { ...prev };
      if (newModes[pathId] === cardId) {
        newModes[pathId] = null;
      }
      return newModes;
    });
  };

  const handleCardDrag = (pathId: string) => (cardId: string, position: { x: number; y: number }) => {
    setCareerPaths((prev) =>
      prev.map((path) =>
        path.id === pathId
          ? {
              ...path,
              cards: path.cards.map((card) =>
                card.id === cardId ? { ...card, position } : card
              ),
            }
          : path
      )
    );
  };

  const handleAddConnection = (pathId: string) => (fromCardId: string, toCardId: string) => {
    setCareerPaths((prev) =>
      prev.map((path) =>
        path.id === pathId
          ? {
              ...path,
              connections: [...path.connections, { from: fromCardId, to: toCardId }],
            }
          : path
      )
    );
    setConnectingModes((prev) => ({ ...prev, [pathId]: null }));
  };

  const handleAddCustomBlock = (block: any) => {
    setCustomBlocks((prev) => [...prev, block]);
  };

  const handleCreateNewPath = () => {
    const newPath: CareerPath = {
      id: Date.now().toString(),
      cards: [],
      connections: [],
      createdAt: new Date(),
    };
    setCareerPaths((prev) => [...prev, newPath]);
    setCurrentPathId(newPath.id);
    setConnectingModes((prev) => ({ ...prev, [newPath.id]: null }));
    setTimeout(() => {
      if (canvasContainerRef.current) {
        const lastCanvas = canvasContainerRef.current.querySelector(`#canvas-${newPath.id}`);
        if (lastCanvas) {
          lastCanvas.scrollIntoView({ behavior: 'smooth', inline: 'end' });
        }
      }
    }, 0);
  };

  const handleRemovePath = (pathId: string) => {
    if (careerPaths.length <= 1) return;
    setCareerPaths((prev) => prev.filter((path) => path.id !== pathId));
    setConnectingModes((prev) => {
      const newModes = { ...prev };
      delete newModes[pathId];
      return newModes;
    });
    if (currentPathId === pathId) {
      const newCurrentPath = careerPaths.find((path) => path.id !== pathId) || {
        id: Date.now().toString(),
        cards: [],
        connections: [],
        createdAt: new Date(),
      };
      if (!careerPaths.find((path) => path.id === newCurrentPath.id)) {
        setCareerPaths((prev) => [...prev, newCurrentPath]);
        setConnectingModes((prev) => ({ ...prev, [newCurrentPath.id]: null }));
      }
      setCurrentPathId(newCurrentPath.id);
    }
  };

  const handleAIOptimize = () => {
    const button = document.activeElement as HTMLElement;
    button?.classList.add('animate-pulse');
    setTimeout(() => {
      button?.classList.remove('animate-pulse');
    }, 2000);
    new Audio('/sounds/optimize.mp3').play();
  };

  const handleConnectMentor = () => {
    new Audio('/sounds/click.mp3').play();
  };

  return (
    <div className="min-h-screen bg-black circuit-bg relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none particles"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-magenta-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </motion.div>

      <HamburgerMenu />

      <div className="relative z-10">
        <header className="glass-panel border-b border-cyan-400/20 p-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-4xl font-futuristic font-bold neon-text animate-neon-pulse ml-10">
                  Career Path Builder
                </h1>
                <p className="text-gray-400 font-cyber text-lg ml-10">
                  Design your future with drag-and-drop pathways
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="glass-panel hover-glow text-cyan-400 hover:text-white"
                onClick={() => setIsProfileModalOpen(true)}
              >
                <User className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-panel hover-glow text-cyan-400 hover:text-white"
              >
                <Zap className="w-6 h-6" onClick={handleAIOptimize} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-panel hover-glow text-cyan-400 hover:text-white"
                onClick={handleCreateNewPath}
              >
                <FolderPlus className="w-6 h-6" />
              </Button>
              <AddBlockModal onAddBlock={handleAddCustomBlock} />
              <Button
                variant="ghost"
                size="icon"
                className="glass-panel hover-glow text-cyan-400 hover:text-white"
                onClick={handleConnectMentor}
              >
                <Users className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </header>

        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogContent className="glass-panel border-cyan-400/30 w-full max-w-md animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-center text-cyan-400 font-futuristic text-2xl">
                Your Profile
              </DialogTitle>
              <p className="text-center text-gray-400 font-cyber">
                Please fill out your profile details
              </p>
            </DialogHeader>
            <CardContent className="space-y-4">
              <UserInputPanel
                userInputs={userInputs}
                onInputChange={setUserInputs}
              />
            </CardContent>
          </DialogContent>
        </Dialog>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div ref={canvasContainerRef} className="col-span-2 flex overflow-x-auto space-x-6 snap-x snap-mandatory">
            <AnimatePresence>
              {careerPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  id={`canvas-${path.id}`}
                  className="flex-shrink-0 glass-panel border-cyan-400/30 hover-glow animate-scale-in"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DragDropCanvas
                    droppedCards={path.cards}
                    onCardDrop={handleCardDrop(path.id)}
                    onCardRemove={handleCardRemove(path.id)}
                    onCardDrag={handleCardDrag(path.id)}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                    pathIndex={index}
                    pathId={path.id}
                    onRemovePath={() => handleRemovePath(path.id)}
                    onAddConnection={handleAddConnection(path.id)}
                    connections={path.connections}
                    connectingMode={connectingModes[path.id] || null}
                    setConnectingMode={(cardId) =>
                      setConnectingModes((prev) => ({ ...prev, [path.id]: cardId }))
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <FlashcardDrawer
            onDragStart={setIsDragging}
            isDragging={isDragging}
            customBlocks={customBlocks}
            userInputs={userInputs}
            flashcards={flashcards}
            loading={loading}
            error={error}
          />
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setShowFeedback(true)}
            className="bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-400 hover:to-purple-400 w-16 h-16 rounded-full shadow-2xl hover-glow btn-glow animate-pulse"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </div>

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
      <FloatingCTAButton />
    </div>
  );
};

export default CareerPathBuilder;
