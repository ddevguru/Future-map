
import { useState } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, Settings, Filter, MessageCircle, Calendar, Award, AlertTriangle } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'achievement',
    title: 'New Badge Earned!',
    message: 'You earned the "Career Explorer" badge for saving 5 career paths.',
    time: '2 minutes ago',
    read: false,
    priority: 'medium'
  },
  {
    id: 2,
    type: 'deadline',
    title: 'Application Deadline Approaching',
    message: 'JEE Main registration closes in 3 days. Complete your application now.',
    time: '1 hour ago',
    read: false,
    priority: 'high'
  },
  {
    id: 3,
    type: 'mentor',
    title: 'Mentor Message',
    message: 'Dr. Sharma replied to your career guidance question.',
    time: '3 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: 4,
    type: 'event',
    title: 'Upcoming Session',
    message: 'Your career counseling session starts in 2 hours.',
    time: '5 hours ago',
    read: false,
    priority: 'high'
  },
  {
    id: 5,
    type: 'update',
    title: 'New Career Path Added',
    message: 'Check out the new Data Science pathway we added to your recommendations.',
    time: '1 day ago',
    read: true,
    priority: 'low'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement': return Award;
      case 'deadline': return AlertTriangle;
      case 'mentor': return MessageCircle;
      case 'event': return Calendar;
      default: return Bell;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'high') return notif.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FuturisticSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-futuristic font-bold neon-text mb-2">
                  Notifications
                </h1>
                <p className="text-gray-400 font-cyber">
                  Stay updated with your career journey
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  {unreadCount} unread
                </Badge>
                <Button 
                  onClick={markAllAsRead}
                  variant="outline" 
                  className="border-green-400/30 text-green-400 hover:bg-green-400/20"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Notifications List */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filter Tabs */}
              <div className="glass-panel p-4">
                <div className="flex items-center gap-4">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  <div className="flex gap-2">
                    {['all', 'unread', 'high'].map((filterType) => (
                      <Button
                        key={filterType}
                        size="sm"
                        variant={filter === filterType ? "default" : "outline"}
                        onClick={() => setFilter(filterType)}
                        className={filter === filterType 
                          ? "bg-cyan-500 hover:bg-cyan-600" 
                          : "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20"
                        }
                      >
                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const IconComponent = getIcon(notification.type);
                  
                  return (
                    <Card 
                      key={notification.id} 
                      className={`glass-panel transition-all duration-200 ${
                        notification.read 
                          ? 'border-gray-600/20 opacity-75' 
                          : 'border-cyan-400/30 bg-cyan-400/5'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              notification.type === 'achievement' ? 'bg-yellow-500/20' :
                              notification.type === 'deadline' ? 'bg-red-500/20' :
                              notification.type === 'mentor' ? 'bg-green-500/20' :
                              notification.type === 'event' ? 'bg-blue-500/20' :
                              'bg-gray-500/20'
                            }`}>
                              <IconComponent className={`w-5 h-5 ${
                                notification.type === 'achievement' ? 'text-yellow-400' :
                                notification.type === 'deadline' ? 'text-red-400' :
                                notification.type === 'mentor' ? 'text-green-400' :
                                notification.type === 'event' ? 'text-blue-400' :
                                'text-gray-400'
                              }`} />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-futuristic ${
                                  notification.read ? 'text-gray-300' : 'text-white'
                                }`}>
                                  {notification.title}
                                </h3>
                                {notification.priority === 'high' && (
                                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                                    High
                                  </Badge>
                                )}
                              </div>
                              <p className={`font-cyber text-sm ${
                                notification.read ? 'text-gray-400' : 'text-gray-300'
                              }`}>
                                {notification.message}
                              </p>
                              <p className="text-gray-500 font-cyber text-xs mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsRead(notification.id)}
                                className="border-green-400/30 text-green-400 hover:bg-green-400/20"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteNotification(notification.id)}
                              className="border-red-400/30 text-red-400 hover:bg-red-400/20"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-futuristic text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-cyber text-sm text-gray-300">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-cyber text-sm text-gray-300">Push Notifications</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-cyber text-sm text-gray-300">Deadline Alerts</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-cyber text-sm text-gray-300">Mentor Messages</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-futuristic text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-cyber text-sm text-gray-400">Total Notifications</span>
                    <span className="text-cyan-400 font-futuristic">{notifications.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-cyber text-sm text-gray-400">Unread</span>
                    <span className="text-yellow-400 font-futuristic">{unreadCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-cyber text-sm text-gray-400">High Priority</span>
                    <span className="text-red-400 font-futuristic">
                      {notifications.filter(n => n.priority === 'high').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
