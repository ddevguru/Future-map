
import { forwardRef, useRef, useState } from 'react';
import { DroppedCard } from '@/pages/CareerPathBuilder';
import { X, Clock, DollarSign, Sparkles } from 'lucide-react';

interface DragDropCanvasProps {
  droppedCards: DroppedCard[];
  onCardDrop: (card: Omit<DroppedCard, 'position'>, position: { x: number; y: number }) => void;
  onCardRemove: (cardId: string) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const DragDropCanvas = forwardRef<HTMLDivElement, DragDropCanvasProps>(
  ({ droppedCards, onCardDrop, onCardRemove, isDragging, setIsDragging }, ref) => {
    const [dragOverPosition, setDragOverPosition] = useState<{ x: number; y: number } | null>(null);
    const [connections, setConnections] = useState<Array<{ from: string; to: string }>>([]);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Enhanced snap to grid (every 30px for better alignment)
      const snappedX = Math.round(x / 30) * 30;
      const snappedY = Math.round(y / 30) * 30;
      
      setDragOverPosition({ x: snappedX, y: snappedY });
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setDragOverPosition(null);

      try {
        const cardData = JSON.parse(e.dataTransfer.getData('application/json'));
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Enhanced snap to grid
        const snappedX = Math.round(x / 30) * 30;
        const snappedY = Math.round(y / 30) * 30;
        
        onCardDrop(cardData, { x: snappedX, y: snappedY });

        // Auto-connect cards if they're close enough
        const newCard = { ...cardData, id: `${cardData.type}-${Date.now()}`, position: { x: snappedX, y: snappedY } };
        const nearbyCards = droppedCards.filter(card => 
          Math.abs(card.position.x - snappedX) < 100 && 
          Math.abs(card.position.y - snappedY) < 100 &&
          card.id !== newCard.id
        );
        
        if (nearbyCards.length > 0) {
          const closestCard = nearbyCards[0];
          setConnections(prev => [...prev, { from: closestCard.id, to: newCard.id }]);
        }
      } catch (error) {
        console.error('Error parsing dropped data:', error);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setDragOverPosition(null);
      }
    };

    const getCardTypeColor = (type: string) => {
      switch (type) {
        case 'course': return 'from-blue-500/20 to-blue-600/20 border-blue-400/30 shadow-blue-400/20';
        case 'exam': return 'from-red-500/20 to-red-600/20 border-red-400/30 shadow-red-400/20';
        case 'skill': return 'from-green-500/20 to-green-600/20 border-green-400/30 shadow-green-400/20';
        case 'institution': return 'from-purple-500/20 to-purple-600/20 border-purple-400/30 shadow-purple-400/20';
        case 'internship': return 'from-orange-500/20 to-orange-600/20 border-orange-400/30 shadow-orange-400/20';
        default: return 'from-gray-500/20 to-gray-600/20 border-gray-400/30 shadow-gray-400/20';
      }
    };

    return (
      <div 
        ref={ref}
        className={`relative w-full h-full overflow-auto bg-gradient-to-br from-gray-900/50 to-blue-900/30 ${
          isDragging ? 'bg-cyan-400/5' : ''
        } transition-all duration-300`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,243,255,0.15) 1px, transparent 0),
            linear-gradient(to right, rgba(0,243,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,243,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 30px 30px, 30px 30px'
        }}
      >
        {/* Enhanced Timeline Header */}
        <div className="sticky top-0 z-20 glass-panel border-b border-cyan-400/20 p-4 mb-4 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-futuristic font-bold text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-cyan-400 animate-pulse" />
              Career Timeline Canvas
            </h3>
            <div className="text-sm text-gray-400 font-cyber flex items-center space-x-4">
              <span>Cards: {droppedCards.length}</span>
              <span>Connections: {connections.length}</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 pointer-events-none z-10" style={{ top: 80 }}>
          {connections.map((connection, index) => {
            const fromCard = droppedCards.find(card => card.id === connection.from);
            const toCard = droppedCards.find(card => card.id === connection.to);
            
            if (!fromCard || !toCard) return null;
            
            return (
              <line
                key={index}
                x1={fromCard.position.x + 128}
                y1={fromCard.position.y + 64}
                x2={toCard.position.x + 128}
                y2={toCard.position.y + 64}
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dropped Cards with Enhanced Design */}
        {droppedCards.map((card, index) => (
          <div
            key={card.id}
            className={`absolute w-64 p-4 glass-panel bg-gradient-to-br ${getCardTypeColor(card.type)} 
                       rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 
                       hover:z-30 animate-fade-in group`}
            style={{
              left: card.position.x,
              top: card.position.y + 80,
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-futuristic font-bold text-white text-sm">
                {card.title}
              </h4>
              <button
                onClick={() => onCardRemove(card.id)}
                className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 
                           opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Clock className="w-3 h-3" />
                <span>{card.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <DollarSign className="w-3 h-3" />
                <span>₹{card.cost.toLocaleString()}</span>
              </div>
            </div>
            
            <div className={`mt-3 px-3 py-1 rounded-full text-xs font-cyber text-center ${
              card.type === 'course' ? 'bg-blue-400/20 text-blue-400' :
              card.type === 'exam' ? 'bg-red-400/20 text-red-400' :
              card.type === 'skill' ? 'bg-green-400/20 text-green-400' :
              card.type === 'institution' ? 'bg-purple-400/20 text-purple-400' :
              'bg-orange-400/20 text-orange-400'
            }`}>
              {card.type.toUpperCase()}
            </div>

            {/* Progress indicator for simulation */}
            <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${Math.random() * 100}%` }}
              ></div>
            </div>
          </div>
        ))}

        {/* Enhanced Drag Preview */}
        {isDragging && dragOverPosition && (
          <div
            className="absolute w-64 h-32 border-2 border-dashed border-cyan-400/50 rounded-xl 
                       bg-gradient-to-br from-cyan-400/10 to-purple-500/10 animate-pulse 
                       backdrop-blur-sm"
            style={{
              left: dragOverPosition.x,
              top: dragOverPosition.y + 80,
            }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Sparkles className="w-6 h-6 text-cyan-400 mx-auto mb-2 animate-spin" />
                <span className="text-cyan-400 font-cyber text-sm">Drop here</span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Empty State */}
        {droppedCards.length === 0 && !isDragging && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-fade-in">
              <div className="w-32 h-32 mx-auto mb-6 border-2 border-dashed border-gray-600 rounded-xl 
                             flex items-center justify-center bg-gradient-to-br from-cyan-400/5 to-purple-500/5">
                <Sparkles className="text-6xl animate-pulse text-cyan-400" />
              </div>
              <h3 className="text-2xl font-futuristic font-bold text-gray-400 mb-3">
                Start Building Your Path
              </h3>
              <p className="text-gray-500 font-cyber max-w-md">
                Drag cards from the right panel to create your personalized career journey. 
                Cards will automatically connect when placed nearby.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DragDropCanvas.displayName = 'DragDropCanvas';
