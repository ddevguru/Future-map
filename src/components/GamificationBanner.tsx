
import { useState, useEffect } from 'react';
import { Star, Rocket, TrendingUp } from 'lucide-react';

export function GamificationBanner() {
  const [currentXP, setCurrentXP] = useState(2847);
  const [targetXP, setTargetXP] = useState(3000);
  const [level, setLevel] = useState(12);
  
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  const badges = [
    { name: 'Python Master', icon: '🐍', unlocked: true },
    { name: 'Data Wizard', icon: '📊', unlocked: true },
    { name: 'ML Pioneer', icon: '🤖', unlocked: true },
    { name: 'Code Ninja', icon: '⚡', unlocked: false },
    { name: 'AI Architect', icon: '🏗️', unlocked: false },
  ];

  const quests = [
    { name: 'Complete Advanced Python Course', progress: 85, xp: 150 },
    { name: 'Build ML Portfolio Project', progress: 60, xp: 300 },
    { name: 'Attend 3 Mentorship Sessions', progress: 33, xp: 100 },
  ];

  const quotes = [
    "The future belongs to those who learn more skills and combine them in creative ways. - Robert Greene",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "The journey of a thousand miles begins with one step. - Lao Tzu"
  ];

  useEffect(() => {
    // Simulate AI-generated quote
    const getNewQuote = () => {
      setIsLoadingQuote(true);
      setTimeout(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setMotivationalQuote(randomQuote);
        setIsLoadingQuote(false);
      }, 1000);
    };

    getNewQuote();
    const interval = setInterval(getNewQuote, 30000); // New quote every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (currentXP / targetXP) * 100;
  const xpToNext = targetXP - currentXP;

  return (
    <div className="space-y-4">
      {/* XP and Level Card */}
      <div className="glass-panel p-6 hover-float">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-futuristic font-bold text-white mb-1">
              Level {level}
            </h2>
            <p className="text-gray-400 font-cyber text-sm">
              {xpToNext} XP to next level
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <Rocket className="w-8 h-8 text-black" />
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-cyan-400 font-cyber">{currentXP} XP</span>
            <span className="text-purple-400 font-cyber">{targetXP} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h3 className="text-green-400 font-cyber font-semibold text-sm mb-3">
            Achievements
          </h3>
          <div className="flex space-x-2">
            {badges.map((badge, index) => (
              <div
                key={badge.name}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                  ${badge.unlocked 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:scale-110 cursor-pointer' 
                    : 'bg-gray-700 opacity-50'
                  }
                `}
                title={badge.name}
              >
                <span className="text-lg">{badge.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Quests */}
      <div className="glass-panel p-6 hover-float">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-400" />
          <h3 className="text-yellow-400 font-cyber font-semibold">
            Active Quests
          </h3>
        </div>

        <div className="space-y-3">
          {quests.map((quest, index) => (
            <div key={index} className="glass-panel p-3 border border-yellow-400/30">
              <div className="flex justify-between items-start mb-2">
                <span className="text-white font-cyber text-sm">
                  {quest.name}
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs font-cyber">
                    +{quest.xp} XP
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${quest.progress}%` }}
                  ></div>
                </div>
                <span className="text-yellow-400 text-xs font-cyber font-bold">
                  {quest.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Motivational Quote */}
      <div className="glass-panel p-6 hover-float border border-pink-500/30">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-black font-futuristic font-bold text-xs">AI</span>
          </div>
          <h3 className="text-pink-400 font-cyber font-semibold">
            Daily Inspiration
          </h3>
        </div>

        <div className="min-h-[60px] flex items-center">
          {isLoadingQuote ? (
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-pink-400/30 border-t-pink-400 rounded-full animate-spin"></div>
              <span className="font-cyber text-sm">Generating inspiration...</span>
            </div>
          ) : (
            <blockquote className="text-gray-300 font-cyber text-sm italic leading-relaxed">
              "{motivationalQuote}"
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
