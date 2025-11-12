import { AlgorithmStep } from '@/utils/graphAlgorithms';
import { Info } from 'lucide-react';

interface StepDisplayProps {
  currentStep: AlgorithmStep | null;
  stepNumber: number;
  totalSteps: number;
}

export const StepDisplay = ({ currentStep, stepNumber, totalSteps }: StepDisplayProps) => {
  if (!currentStep) {
    return (
      <div className="glass-effect rounded-xl p-6 border border-primary/30 text-center">
        <Info className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-muted-foreground">Select an algorithm and press Play to start</p>
      </div>
    );
  }

  const getStepColor = () => {
    switch (currentStep.type) {
      case 'consider':
        return 'text-yellow-400';
      case 'add':
        return 'text-primary';
      case 'reject':
        return 'text-destructive';
      case 'complete':
        return 'text-green-400';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 border border-primary/30 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold glow-text">Algorithm Progress</h3>
        <span className="text-sm text-muted-foreground">
          Step {stepNumber} / {totalSteps}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
            currentStep.type === 'consider' ? 'bg-yellow-400/20 text-yellow-400' :
            currentStep.type === 'add' ? 'bg-primary/20 text-primary' :
            currentStep.type === 'reject' ? 'bg-destructive/20 text-destructive' :
            'bg-green-400/20 text-green-400'
          }`}>
            {currentStep.type}
          </div>
        </div>

        <p className={`text-lg font-medium ${getStepColor()}`}>
          {currentStep.message}
        </p>

        {currentStep.totalCost !== undefined && (
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">Current MST Cost</p>
            <p className="text-2xl font-bold text-primary glow-text">
              {currentStep.totalCost}
            </p>
          </div>
        )}
      </div>

      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
