import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, FastForward, Rewind } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onSpeedChange: (value: number[]) => void;
}

export const ControlPanel = ({
  isPlaying,
  speed,
  onPlayPause,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
}: ControlPanelProps) => {
  return (
    <div className="glass-effect rounded-xl p-6 border border-primary/30">
      <h3 className="text-lg font-semibold mb-4 glow-text">Controls</h3>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={onPlayPause}
          variant="default"
          size="lg"
          className="bg-primary hover:bg-primary/90 glow-border"
        >
          {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        <Button
          onClick={onReset}
          variant="secondary"
          size="lg"
        >
          <RotateCcw className="mr-2" />
          Reset
        </Button>

        <Button
          onClick={onStepBackward}
          variant="secondary"
          size="lg"
        >
          <Rewind className="mr-2" />
          Previous
        </Button>

        <Button
          onClick={onStepForward}
          variant="secondary"
          size="lg"
        >
          <FastForward className="mr-2" />
          Next
        </Button>
      </div>

      <div className="space-y-3">
        <label className="text-sm text-muted-foreground">
          Animation Speed: {speed}x
        </label>
        <Slider
          value={[speed]}
          onValueChange={onSpeedChange}
          min={0.5}
          max={3}
          step={0.5}
          className="w-full"
        />
      </div>
    </div>
  );
};
