import { Button } from '@/components/ui/button';
import { Network, GitBranch, Trash2 } from 'lucide-react';

export type Algorithm = 'prim' | 'kruskal' | 'reverse-delete';

interface AlgorithmSelectorProps {
  selectedAlgorithm: Algorithm | null;
  onSelect: (algorithm: Algorithm) => void;
}

export const AlgorithmSelector = ({ selectedAlgorithm, onSelect }: AlgorithmSelectorProps) => {
  const algorithms = [
    { id: 'prim' as Algorithm, name: "Prim's Algorithm", icon: Network, description: 'Greedy MST construction' },
    { id: 'kruskal' as Algorithm, name: "Kruskal's Algorithm", icon: GitBranch, description: 'Edge-based MST using Union-Find' },
    { id: 'reverse-delete' as Algorithm, name: 'Reverse Delete', icon: Trash2, description: 'Remove heaviest edges without disconnecting' },
  ];

  return (
    <div className="glass-effect rounded-xl p-6 border border-primary/30">
      <h3 className="text-lg font-semibold mb-4 glow-text">Select Algorithm</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {algorithms.map((algo) => {
          const Icon = algo.icon;
          const isSelected = selectedAlgorithm === algo.id;
          
          return (
            <button
              key={algo.id}
              onClick={() => onSelect(algo.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 ${
                isSelected
                  ? 'border-primary bg-primary/10 glow-border'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                <h4 className={`font-semibold ${isSelected ? 'text-primary' : ''}`}>
                  {algo.name}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">{algo.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
