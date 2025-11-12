import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const algorithms = [
    {
      title: "Prim's Algorithm",
      complexity: "O(E log V)",
      description: "Greedy algorithm that grows the MST one vertex at a time, always choosing the minimum weight edge connecting the tree to a new vertex.",
    },
    {
      title: "Kruskal's Algorithm",
      complexity: "O(E log E)",
      description: "Sorts edges by weight and adds them one by one to the MST, using union-find to detect cycles.",
    },
    {
      title: "Reverse Delete Algorithm",
      complexity: "O(E log V)",
      description: "Starts with all edges and removes the heaviest edge that doesn't disconnect the graph, working in reverse.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="container mx-auto max-w-6xl text-center space-y-8">
          <div
            id="hero-badge"
            data-animate
            className={`inline-block transition-all duration-700 ${
              visibleSections.has('hero-badge')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm glass-effect">
              <Zap className="w-4 h-4 mr-2 inline-block" />
              Advanced Graph Algorithms
            </Badge>
          </div>

          <div
            id="hero-title"
            data-animate
            className={`space-y-4 transition-all duration-700 delay-100 ${
              visibleSections.has('hero-title')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Minimum Spanning Tree
              <br />
              <span className="glow-text">Visualizer</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore and understand MST algorithms with interactive, real-time visualization. 
              Watch Prim's, Kruskal's, and Reverse Delete algorithms in action.
            </p>
          </div>

          <div
            id="hero-buttons"
            data-animate
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-200 ${
              visibleSections.has('hero-buttons')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 glow-border"
              onClick={() => navigate('/visualizer')}
            >
              Start Visualizing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 glass-effect"
              onClick={() => {
                document.getElementById('algorithms')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section id="algorithms" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div
            id="algo-header"
            data-animate
            className={`text-center space-y-4 transition-all duration-700 ${
              visibleSections.has('algo-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold">
              Supported <span className="glow-text">Algorithms</span>
            </h2>
          </div>

          <div className="grid gap-6">
            {algorithms.map((algo, index) => (
              <div
                key={algo.title}
                id={`algo-${index}`}
                data-animate
                className={`transition-all duration-700 ${
                  visibleSections.has(`algo-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="glass-effect hover:glow-border transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-2xl">{algo.title}</CardTitle>
                      <Badge variant="secondary" className="text-sm font-mono">
                        {algo.complexity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {algo.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div
            id="cta"
            data-animate
            className={`text-center pt-8 transition-all duration-700 ${
              visibleSections.has('cta')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 animate-pulse-glow"
              onClick={() => navigate('/visualizer')}
            >
              Try It Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
