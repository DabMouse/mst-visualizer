import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { GraphNode, Edge, nodeIdToLabel, labelToNodeId } from '@/utils/graphAlgorithms';
import { toast } from 'sonner';

interface GraphInputProps {
  onGraphUpdate: (nodes: GraphNode[], edges: Edge[]) => void;
}

export const GraphInput = ({ onGraphUpdate }: GraphInputProps) => {
  const [nodeCount, setNodeCount] = useState(5);
  const [edgeInput, setEdgeInput] = useState({ from: '', to: '', weight: '' });
  const [edges, setEdges] = useState<Edge[]>([
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 3 },
    { from: 1, to: 2, weight: 1 },
    { from: 1, to: 3, weight: 2 },
    { from: 2, to: 3, weight: 4 },
    { from: 3, to: 4, weight: 2 },
    { from: 2, to: 4, weight: 5 },
  ]);

  const generateNodes = (count: number): GraphNode[] => {
    const nodes: GraphNode[] = [];
    const centerX = 400;
    const centerY = 300;
    const radius = 200;

    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2;
      nodes.push({
        id: i,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }
    return nodes;
  };

  const handleAddEdge = () => {
    // Convert letter inputs to numeric IDs
    let from: number;
    let to: number;
    
    // Check if input is a letter or number
    if (/^[a-zA-Z]$/.test(edgeInput.from)) {
      from = labelToNodeId(edgeInput.from);
    } else {
      from = parseInt(edgeInput.from);
    }

    if (/^[a-zA-Z]$/.test(edgeInput.to)) {
      to = labelToNodeId(edgeInput.to);
    } else {
      to = parseInt(edgeInput.to);
    }

    const weight = parseInt(edgeInput.weight);

    if (isNaN(from) || isNaN(to) || isNaN(weight)) {
      toast.error('Please enter valid node labels (A-Z) or numbers');
      return;
    }

    if (from < 0 || from >= nodeCount || to < 0 || to >= nodeCount) {
      toast.error(`Nodes must be between A and ${nodeIdToLabel(nodeCount - 1)}`);
      return;
    }

    if (from === to) {
      toast.error('Cannot add self-loop');
      return;
    }

    const newEdges = [...edges, { from, to, weight }];
    setEdges(newEdges);
    onGraphUpdate(generateNodes(nodeCount), newEdges);
    setEdgeInput({ from: '', to: '', weight: '' });
    toast.success('Edge added');
  };

  const handleRemoveEdge = (index: number) => {
    const newEdges = edges.filter((_, i) => i !== index);
    setEdges(newEdges);
    onGraphUpdate(generateNodes(nodeCount), newEdges);
    toast.success('Edge removed');
  };

  const handleNodeCountChange = (count: number) => {
    if (count < 2) {
      toast.error('Need at least 2 nodes');
      return;
    }
    setNodeCount(count);
    const validEdges = edges.filter(e => e.from < count && e.to < count);
    setEdges(validEdges);
    onGraphUpdate(generateNodes(count), validEdges);
  };

  const loadDefaultGraph = () => {
    setNodeCount(5);
    const defaultEdges = [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 2, weight: 3 },
      { from: 1, to: 2, weight: 1 },
      { from: 1, to: 3, weight: 2 },
      { from: 2, to: 3, weight: 4 },
      { from: 3, to: 4, weight: 2 },
      { from: 2, to: 4, weight: 5 },
    ];
    setEdges(defaultEdges);
    onGraphUpdate(generateNodes(5), defaultEdges);
    toast.success('Default graph loaded');
  };

  return (
    <div className="glass-effect rounded-xl p-6 border border-primary/30 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold glow-text">Graph Configuration</h3>
        <Button onClick={loadDefaultGraph} variant="secondary" size="sm">
          Load Default
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nodeCount">Number of Nodes</Label>
          <Input
            id="nodeCount"
            type="number"
            value={nodeCount}
            onChange={(e) => handleNodeCountChange(parseInt(e.target.value) || 2)}
            min={2}
            max={12}
            className="mt-2"
          />
        </div>

        <div className="border-t border-border pt-4">
          <Label className="mb-3 block">Add Edge (use letters A-Z or numbers)</Label>
          <div className="grid grid-cols-4 gap-2">
            <Input
              placeholder="From (A)"
              type="text"
              value={edgeInput.from}
              onChange={(e) => setEdgeInput({ ...edgeInput, from: e.target.value })}
              maxLength={1}
            />
            <Input
              placeholder="To (B)"
              type="text"
              value={edgeInput.to}
              onChange={(e) => setEdgeInput({ ...edgeInput, to: e.target.value })}
              maxLength={1}
            />
            <Input
              placeholder="Weight"
              type="number"
              value={edgeInput.weight}
              onChange={(e) => setEdgeInput({ ...edgeInput, weight: e.target.value })}
            />
            <Button onClick={handleAddEdge} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Label className="mb-3 block">Current Edges ({edges.length})</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {edges.map((edge, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-card/50 p-2 rounded border border-border"
              >
                <span className="text-sm">
                  {nodeIdToLabel(edge.from)} → {nodeIdToLabel(edge.to)} (weight: {edge.weight})
                </span>
                <Button
                  onClick={() => handleRemoveEdge(idx)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
