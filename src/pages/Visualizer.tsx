import { useState, useEffect } from 'react';
import { GraphCanvas } from '@/components/GraphCanvas';
import { AlgorithmSelector, Algorithm } from '@/components/AlgorithmSelector';
import { ControlPanel } from '@/components/ControlPanel';
import { GraphInput } from '@/components/GraphInput';
import { StepDisplay } from '@/components/StepDisplay';
import {
  GraphNode,
  Edge,
  AlgorithmStep,
  primsAlgorithm,
  kruskalsAlgorithm,
  reverseDeleteAlgorithm,
} from '@/utils/graphAlgorithms';
import { toast } from 'sonner';

const Index = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [mstEdges, setMstEdges] = useState<Set<string>>(new Set());

  // Initialize with default graph
  useEffect(() => {
    const defaultNodes: GraphNode[] = [
      { id: 0, x: 400, y: 100 },
      { id: 1, x: 600, y: 250 },
      { id: 2, x: 500, y: 450 },
      { id: 3, x: 300, y: 450 },
      { id: 4, x: 200, y: 250 },
    ];

    const defaultEdges: Edge[] = [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 4, weight: 3 },
      { from: 1, to: 2, weight: 1 },
      { from: 1, to: 4, weight: 2 },
      { from: 2, to: 3, weight: 4 },
      { from: 3, to: 4, weight: 2 },
      { from: 2, to: 4, weight: 5 },
    ];

    setNodes(defaultNodes);
    setEdges(defaultEdges);
  }, []);

  const handleGraphUpdate = (newNodes: GraphNode[], newEdges: Edge[]) => {
    setNodes(newNodes);
    setEdges(newEdges);
    setAlgorithmSteps([]);
    setCurrentStepIndex(-1);
    setMstEdges(new Set());
    setIsPlaying(false);
  };

  const handleAlgorithmSelect = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    setCurrentStepIndex(-1);
    setMstEdges(new Set());
    setIsPlaying(false);

    let steps: AlgorithmStep[] = [];
    if (algorithm === 'prim') {
      steps = primsAlgorithm(nodes, edges);
      toast.success("Prim's Algorithm selected");
    } else if (algorithm === 'kruskal') {
      steps = kruskalsAlgorithm(nodes, edges);
      toast.success("Kruskal's Algorithm selected");
    } else if (algorithm === 'reverse-delete') {
      steps = reverseDeleteAlgorithm(nodes, edges);
      toast.success('Reverse Delete Algorithm selected');
    }

    setAlgorithmSteps(steps);
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
    setMstEdges(new Set());
    setIsPlaying(false);
    toast.info('Visualization reset');
  };

  const handleStepForward = () => {
    if (currentStepIndex < algorithmSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      updateMSTEdges(nextIndex);
    } else {
      setIsPlaying(false);
    }
  };

  const handleStepBackward = () => {
    if (currentStepIndex > -1) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      updateMSTEdges(prevIndex);
    }
  };

  const updateMSTEdges = (stepIndex: number) => {
    const newMSTEdges = new Set<string>();
    for (let i = 0; i <= stepIndex; i++) {
      const step = algorithmSteps[i];
      if (step.type === 'add') {
        const key = [step.edge.from, step.edge.to].sort().join('-');
        newMSTEdges.add(key);
      }
    }
    setMstEdges(newMSTEdges);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentStepIndex < algorithmSteps.length - 1) {
        handleStepForward();
      } else {
        setIsPlaying(false);
        toast.success('Algorithm complete!');
      }
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, speed, algorithmSteps.length]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-in-up">
          <h1 className="text-5xl md:text-6xl font-bold glow-text tracking-tight">
            MST Visualizer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore Minimum Spanning Tree algorithms with interactive step-by-step visualization
          </p>
        </div>

        {/* Algorithm Selector */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <AlgorithmSelector
            selectedAlgorithm={selectedAlgorithm}
            onSelect={handleAlgorithmSelect}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Input and Controls */}
          <div className="space-y-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <GraphInput onGraphUpdate={handleGraphUpdate} />
            
            {algorithmSteps.length > 0 && (
              <ControlPanel
                isPlaying={isPlaying}
                speed={speed}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onReset={handleReset}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onSpeedChange={(value) => setSpeed(value[0])}
              />
            )}
          </div>

          {/* Middle Column - Graph Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <GraphCanvas
                nodes={nodes}
                edges={edges}
                currentStep={
                  currentStepIndex >= 0 ? algorithmSteps[currentStepIndex] : null
                }
                mstEdges={mstEdges}
              />
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <StepDisplay
                currentStep={
                  currentStepIndex >= 0 ? algorithmSteps[currentStepIndex] : null
                }
                stepNumber={currentStepIndex + 1}
                totalSteps={algorithmSteps.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
