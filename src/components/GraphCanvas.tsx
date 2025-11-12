import { useEffect, useRef } from 'react';
import { GraphNode, Edge, AlgorithmStep, nodeIdToLabel } from '@/utils/graphAlgorithms';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: Edge[];
  currentStep: AlgorithmStep | null;
  mstEdges: Set<string>;
}

export const GraphCanvas = ({ nodes, edges, currentStep, mstEdges }: GraphCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const getEdgeKey = (edge: Edge) => {
    const [a, b] = [edge.from, edge.to].sort();
    return `${a}-${b}`;
  };

  const isEdgeInMST = (edge: Edge) => {
    return mstEdges.has(getEdgeKey(edge));
  };

  const getEdgeColor = (edge: Edge) => {
    if (currentStep?.edge && 
        currentStep.edge.from === edge.from && 
        currentStep.edge.to === edge.to) {
      if (currentStep.type === 'consider') return 'stroke-yellow-400';
      if (currentStep.type === 'add') return 'stroke-primary animate-pulse-glow';
      if (currentStep.type === 'reject') return 'stroke-destructive';
    }
    if (isEdgeInMST(edge)) return 'stroke-primary';
    return 'stroke-muted';
  };

  const getEdgeWidth = (edge: Edge) => {
    if (currentStep?.edge && 
        currentStep.edge.from === edge.from && 
        currentStep.edge.to === edge.to) {
      return '3';
    }
    if (isEdgeInMST(edge)) return '3';
    return '1.5';
  };

  return (
    <div 
      ref={canvasRef} 
      className="relative w-full h-[600px] glass-effect rounded-xl border border-primary/30 overflow-hidden"
    >
      <svg className="w-full h-full">
        {/* Draw edges */}
        {edges.map((edge, idx) => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;

          return (
            <g key={idx}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={`${getEdgeColor(edge)} transition-all duration-300`}
                strokeWidth={getEdgeWidth(edge)}
              />
              <circle
                cx={midX}
                cy={midY}
                r="18"
                className="fill-card stroke-border"
                strokeWidth="2"
              />
              <text
                x={midX}
                y={midY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-sm font-semibold pointer-events-none"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              className="fill-primary/20 stroke-primary transition-all duration-300 hover:fill-primary/40"
              strokeWidth="3"
              filter="url(#glow)"
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-lg font-bold pointer-events-none"
            >
              {nodeIdToLabel(node.id)}
            </text>
          </g>
        ))}

        {/* SVG Filters */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};
