import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FuturisticSidebar } from './FuturisticSidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=" fixed top-4 left-4 z-50 glass-panel hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80 bg-transparent border-none">
        <FuturisticSidebar />
      </SheetContent>
    </Sheet>
  );
}