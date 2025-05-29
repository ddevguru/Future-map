
import { Home, Map, Users, Calendar, Bell, Settings, User, LogOut, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Career Builder',
    url: '/career-builder',
    icon: Map,
  },
  {
    title: 'Community',
    url: '/mentor-community',
    icon: Users,
  },
  {
    title: 'Schedule',
    url: '/schedule',
    icon: Calendar,
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function FuturisticSidebar() {
  const location = useLocation();

  return (
    <div className="glass-panel border-r border-cyan-400/20 h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-cyan-400/20 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-futuristic font-bold text-white text-lg">FutureMap</h2>
            <p className="text-xs text-gray-400 font-cyber">AI Career Architect</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-2">
        <div className="mb-4">
          <h3 className="text-cyan-400 font-cyber text-sm mb-2 px-2">Navigation</h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.url;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 ${
                    isActive ? 'bg-cyan-400/20 text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-cyber">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-400/20 p-4 space-y-2">
        <Link
          to="/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 text-gray-300"
        >
          <User className="w-5 h-5" />
          <span className="font-cyber">Profile</span>
        </Link>
        <Link
          to="/login"
          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-400/20 hover:text-red-400 transition-all duration-300 text-gray-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-cyber">Logout</span>
        </Link>
      </div>
    </div>
  );
}
