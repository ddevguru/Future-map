import { useState, useEffect } from 'react';
import { FuturisticSidebar } from '@/components/FuturisticSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Users, Plus, Bell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Event {
  id: number;
  title: string;
  type: 'mentor' | 'deadline' | 'event';
  date: string;
  time: string;
  duration?: string;
  mentor?: string;
  attendees?: number;
  priority?: 'low' | 'medium' | 'high';
  status: 'confirmed' | 'pending' | 'registered' | 'cancelled';
}

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state for new event
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'mentor' as 'mentor' | 'deadline' | 'event',
    date: '',
    time: '',
    duration: '',
    mentor: '',
    attendees: '',
    priority: '' as 'low' | 'medium' | 'high' | '',
    status: 'pending' as 'confirmed' | 'pending' | 'registered' | 'cancelled',
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const authToken = localStorage.getItem('authToken') || '';
        if (!authToken) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch('http://localhost/Futuremap-backend/schedule_api.php', {
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

        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err: any) {
        console.error('Error fetching events:', err);
        setError(err.message || 'Failed to load events.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle form submission
  const handleCreateEvent = async () => {
    try {
      const authToken = localStorage.getItem('authToken') || '';
      if (!authToken) {
        throw new Error('No authentication token found. Please log in.');
      }

      const eventData = {
        title: newEvent.title,
        type: newEvent.type,
        date: newEvent.date,
        time: newEvent.time,
        duration: newEvent.duration || undefined,
        mentor: newEvent.mentor || undefined,
        attendees: newEvent.attendees ? parseInt(newEvent.attendees) : undefined,
        priority: newEvent.priority || undefined,
        status: newEvent.status,
      };

      const response = await fetch('http://localhost/Futuremap-backend/schedule_api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      // Refresh events
      const updatedResponse = await fetch('http://localhost/Futuremap-backend/schedule_api.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const updatedEvents = await updatedResponse.json();
      setEvents(updatedEvents);

      // Reset form and close dialog
      setNewEvent({
        title: '',
        type: 'mentor',
        date: '',
        time: '',
        duration: '',
        mentor: '',
        attendees: '',
        priority: '',
        status: 'pending',
      });
      setIsDialogOpen(false);
    } catch (err: any) {
      console.error('Error creating event:', err);
      setError(err.message || 'Failed to create event.');
    }
  };

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
                  Schedule Manager
                </h1>
                <p className="text-gray-400 font-cyber">
                  Manage your career journey timeline
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-panel p-6 border-cyan-400/30 max-w-md">
                  <VisuallyHidden>
                    <DialogTitle>Add New Event</DialogTitle>
                  </VisuallyHidden>
                  <DialogDescription>
                    Create a new event for your schedule.
                  </DialogDescription>
                  <div className="space-y-4">
                    <h3 className="text-white font-futuristic">Add New Event</h3>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                        placeholder="Event title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Type</label>
                      <select
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'mentor' | 'deadline' | 'event' })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                      >
                        <option value="mentor">Mentor</option>
                        <option value="deadline">Deadline</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Date</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Time</label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Duration (optional)</label>
                      <input
                        type="text"
                        value={newEvent.duration}
                        onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                        placeholder="e.g., 1 hour"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Mentor (optional)</label>
                      <input
                        type="text"
                        value={newEvent.mentor}
                        onChange={(e) => setNewEvent({ ...newEvent, mentor: e.target.value })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                        placeholder="Mentor name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Attendees (optional)</label>
                      <input
                        type="number"
                        value={newEvent.attendees}
                        onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                        placeholder="Number of attendees"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Priority (optional)</label>
                      <select
                        value={newEvent.priority}
                        onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value as 'low' | 'medium' | 'high' | '' })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                      >
                        <option value="">None</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-cyber text-gray-300 mb-1">Status</label>
                      <select
                        value={newEvent.status}
                        onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as 'confirmed' | 'pending' | 'registered' | 'cancelled' })}
                        className="w-full h-10 bg-black/20 border border-cyan-400/30 rounded-md px-3 text-white"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="registered">Registered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-blue-500 w-full"
                      onClick={handleCreateEvent}
                      disabled={!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.time || !newEvent.status}
                    >
                      Create Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-2 glass-panel p-6">
              <h2 className="text-2xl font-futuristic text-white mb-6">Calendar View</h2>
              
              {/* Mini Calendar */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-gray-400 font-cyber text-sm py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(2024, 0, i - 6);
                  const dateStr = date.toISOString().slice(0, 10);
                  const isSelected = dateStr === selectedDate;
                  const hasEvent = events.some(event => event.date === dateStr);
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`
                        h-10 rounded-lg font-cyber text-sm transition-all duration-200
                        ${isSelected 
                          ? 'bg-cyan-400 text-black font-bold' 
                          : hasEvent
                          ? 'bg-purple-500/30 text-white border border-purple-400/50'
                          : 'text-gray-400 hover:bg-white/10'
                        }
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Events List */}
              <div className="space-y-4">
                <h3 className="text-xl font-futuristic text-white">Upcoming Events</h3>
                {isLoading && <p className="text-cyan-400 font-cyber">Loading events...</p>}
                {error && <p className="text-red-400 font-cyber">{error}</p>}
                {!isLoading && !error && events.length === 0 && (
                  <p className="text-gray-400 font-cyber">No events scheduled.</p>
                )}
                {events
                  .filter(event => !selectedDate || event.date === selectedDate)
                  .map((event) => (
                    <Card key={event.id} className="glass-panel border-cyan-400/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-futuristic text-white text-lg">{event.title}</h4>
                          <Badge 
                            className={`${
                              event.type === 'mentor' 
                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                : event.type === 'deadline'
                                ? 'bg-red-500/20 text-red-300 border-red-500/30'
                                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            }`}
                          >
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 font-cyber text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          {event.duration && (
                            <span>Duration: {event.duration}</span>
                          )}
                        </div>
                        {event.mentor && (
                          <p className="text-cyan-400 font-cyber text-sm mt-2">
                            with {event.mentor}
                          </p>
                        )}
                        {event.attendees && (
                          <p className="text-cyan-400 font-cyber text-sm mt-2">
                            Attendees: {event.attendees}
                          </p>
                        )}
                        {event.priority && (
                          <p className="text-cyan-400 font-cyber text-sm mt-2">
                            Priority: {event.priority}
                          </p>
                        )}
                        <p className="text-gray-400 font-cyber text-sm mt-2">
                          Status: {event.status}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-futuristic text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Video className="w-4 h-4 mr-2" />
                    Join Live Session
                  </Button>
                  <Button variant="outline" className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button variant="outline" className="w-full border-green-400/30 text-green-400 hover:bg-green-400/20">
                    <Users className="w-4 h-4 mr-2" />
                    Find Study Group
                  </Button>
                </div>
              </div>

              {/* Deadlines */}
              <div className="glass-panel p-6">
                <h3 className="text-xl font-futuristic text-white mb-4">Critical Deadlines</h3>
                <div className="space-y-3">
                  {events
                    .filter(event => event.type === 'deadline' && event.status === 'pending')
                    .slice(0, 2)
                    .map(event => (
                      <div key={event.id} className="p-3 rounded-lg bg-red-500/10 border border-red-400/30">
                        <p className="text-red-300 font-cyber text-sm font-medium">{event.title}</p>
                        <p className="text-gray-400 font-cyber text-xs">
                          Due: {event.date} {event.time}
                        </p>
                      </div>
                    ))}
                  {events.filter(event => event.type === 'deadline' && event.status === 'pending').length === 0 && (
                    <p className="text-gray-400 font-cyber text-sm">No pending deadlines.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}