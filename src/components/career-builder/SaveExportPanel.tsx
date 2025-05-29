import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Save, Download, Users, Share } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { DroppedCard } from '@/pages/CareerPathBuilder';
import { useNavigate } from 'react-router-dom';

interface SaveExportPanelProps {
  droppedCards: DroppedCard[];
  pathId?: string;
  connections?: Array<{ from: string; to: string }>;
}

export function SaveExportPanel({ droppedCards, pathId, connections = [] }: SaveExportPanelProps) {
  const navigate = useNavigate();

  const handleSavePath = async () => {
    if (!pathId) {
      console.error('Error: No path selected');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken') || '';
      if (!authToken) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch('http://localhost/Futuremap-backend/career_paths_api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          pathId,
          cards: droppedCards,
          connections,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log('Career path saved successfully!');
    } catch (err: any) {
      console.error('Error saving career path:', err.message || 'Failed to save career path');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPosition = margin;

    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        doc.text(line, x, y);
        y += lineHeight;
      });
      return y;
    };

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Career Path: ${pathId || 'Unnamed'}`, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Cards: ${droppedCards.length}`, margin, yPosition);
    yPosition += 5;
    doc.text(`Total Cost: ₹${droppedCards.reduce((sum, card) => sum + card.cost, 0).toLocaleString()}`, margin, yPosition);
    yPosition += 10;

    if (droppedCards.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Cards', margin, yPosition);
      yPosition += 7;

      droppedCards.forEach((card, index) => {
        if (yPosition > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          yPosition = margin;
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        yPosition = addWrappedText(
          `${index + 1}. ${card.title} (${card.type.toUpperCase()})`,
          margin,
          yPosition,
          pageWidth - 2 * margin,
          5
        );

        doc.setFont('helvetica', 'normal');
        yPosition = addWrappedText(`Duration: ${card.duration}`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 5);
        yPosition = addWrappedText(`Cost: ₹${card.cost.toLocaleString()}`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 5);
        yPosition = addWrappedText(
          `Position: (${card.position.x}, ${card.position.y})`,
          margin + 5,
          yPosition,
          pageWidth - 2 * margin - 5,
          5
        );
        yPosition += 5;
      });
    }

    if (connections.length > 0) {
      if (yPosition > doc.internal.pageSize.getHeight() - margin - 20) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Connections', margin, yPosition);
      yPosition += 7;

      connections.forEach((conn, index) => {
        if (yPosition > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          yPosition = margin;
        }

        const fromCard = droppedCards.find(c => c.id === conn.from)?.title || conn.from;
        const toCard = droppedCards.find(c => c.id === conn.to)?.title || conn.to;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        yPosition = addWrappedText(
          `${index + 1}. ${fromCard} → ${toCard}`,
          margin,
          yPosition,
          pageWidth - 2 * margin,
          5
        );
      });
    }

    doc.save(`career_path_${pathId || 'unnamed'}_${new Date().toLocaleDateString('en-CA')}.pdf`);
  };

  const handleConnectMentor = () => {
    navigate('/mentor-community');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Career Path',
        text: `Check out my career path with ${droppedCards.length} milestones!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={handleSavePath}
        disabled={droppedCards.length === 0}
        className="bg-green-500/20 border border-green-400/30 text-green-400 hover:bg-green-500/30 font-cyber"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Path
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={droppedCards.length === 0}
            className="bg-blue-500/20 border border-blue-400/30 text-blue-400 hover:bg-blue-500/30 font-cyber"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-panel border-cyan-400/30 bg-gray-900/95">
          <DropdownMenuItem onClick={handleDownloadPDF} className="font-cyber text-white hover:bg-cyan-400/20">
            <Download className="w-4 h-4 mr-2" />
            Download as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare} className="font-cyber text-white hover:bg-cyan-400/20">
            <Share className="w-4 h-4 mr-2" />
            Share Path
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        onClick={handleConnectMentor}
        className="bg-purple-500/20 border border-purple-400/30 text-purple-400 hover:bg-purple-500/30 font-cyber"
      >
        <Users className="w-4 h-4 mr-2" />
        Connect Mentor
      </Button>
    </div>
  );
}