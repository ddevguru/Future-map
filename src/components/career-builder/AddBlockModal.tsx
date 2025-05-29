
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Sparkles } from 'lucide-react';

interface AddBlockModalProps {
  onAddBlock: (block: {
    title: string;
    duration: string;
    cost: number;
    type: 'course' | 'exam' | 'skill' | 'institution' | 'internship';
  }) => void;
}

export function AddBlockModal({ onAddBlock }: AddBlockModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    cost: 0,
    type: 'course' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.duration) {
      onAddBlock(formData);
      setFormData({ title: '', duration: '', cost: 0, type: 'course' });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 
                     text-black font-futuristic font-bold transition-all duration-300 hover:scale-105 
                     hover:shadow-lg hover:shadow-cyan-400/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Block
          <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="glass-panel border-cyan-400/30 bg-black/80 animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-futuristic font-bold neon-text flex items-center">
            <Plus className="w-5 h-5 mr-2 text-cyan-400" />
            Create Custom Building Block
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-cyan-400 font-cyber">Block Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="glass-panel border-cyan-400/30 bg-black/40 text-white font-cyber"
              placeholder="e.g., Advanced React Course"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="type" className="text-cyan-400 font-cyber">Block Type</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="glass-panel border-cyan-400/30 bg-black/40 text-white font-cyber">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-panel border-cyan-400/30 bg-black/90">
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="skill">Skill</SelectItem>
                <SelectItem value="institution">Institution</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="duration" className="text-cyan-400 font-cyber">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="glass-panel border-cyan-400/30 bg-black/40 text-white font-cyber"
              placeholder="e.g., 3 months"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="cost" className="text-cyan-400 font-cyber">Cost (₹)</Label>
            <Input
              id="cost"
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) || 0 })}
              className="glass-panel border-cyan-400/30 bg-black/40 text-white font-cyber"
              placeholder="0"
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 
                       text-black font-futuristic font-bold transition-all duration-300 hover:scale-105"
          >
            Create Block
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
