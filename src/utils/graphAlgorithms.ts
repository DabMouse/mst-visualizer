export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface GraphNode {
  id: number;
  x: number;
  y: number;
}

export interface AlgorithmStep {
  type: 'consider' | 'add' | 'reject' | 'complete';
  edge: Edge;
  message: string;
  totalCost?: number;
}

// Utility function to convert node ID to alphabet label
export const nodeIdToLabel = (id: number): string => {
  return String.fromCharCode(65 + id); // 65 is ASCII for 'A'
};

// Utility function to convert alphabet label to node ID
export const labelToNodeId = (label: string): number => {
  return label.toUpperCase().charCodeAt(0) - 65;
};

// Union-Find data structure for Kruskal's algorithm
class UnionFind {
  parent: number[];
  rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Prim's Algorithm
export function primsAlgorithm(nodes: GraphNode[], edges: Edge[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = nodes.length;
  const visited = new Set<number>();
  const mstEdges: Edge[] = [];
  let totalCost = 0;

  if (n === 0) return steps;

  visited.add(0);

  while (visited.size < n) {
    let minEdge: Edge | null = null;
    let minWeight = Infinity;

    for (const edge of edges) {
      const fromVisited = visited.has(edge.from);
      const toVisited = visited.has(edge.to);

      if (fromVisited !== toVisited) {
        if (edge.weight < minWeight) {
          minWeight = edge.weight;
          minEdge = edge;
        }
      }
    }

    if (!minEdge) break;

    steps.push({
      type: 'consider',
      edge: minEdge,
      message: `Considering edge ${nodeIdToLabel(minEdge.from)}-${nodeIdToLabel(minEdge.to)} (weight: ${minEdge.weight})`,
    });

    totalCost += minEdge.weight;
    mstEdges.push(minEdge);
    visited.add(minEdge.from);
    visited.add(minEdge.to);

    steps.push({
      type: 'add',
      edge: minEdge,
      message: `Added edge ${nodeIdToLabel(minEdge.from)}-${nodeIdToLabel(minEdge.to)} to MST`,
      totalCost,
    });
  }

  if (steps.length > 0) {
    steps.push({
      type: 'complete',
      edge: steps[steps.length - 1].edge,
      message: `MST complete! Total cost: ${totalCost}`,
      totalCost,
    });
  }

  return steps;
}

// Kruskal's Algorithm
export function kruskalsAlgorithm(nodes: GraphNode[], edges: Edge[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = nodes.length;
  const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(n);
  let totalCost = 0;
  let edgesAdded = 0;

  for (const edge of sortedEdges) {
    steps.push({
      type: 'consider',
      edge,
      message: `Considering edge ${nodeIdToLabel(edge.from)}-${nodeIdToLabel(edge.to)} (weight: ${edge.weight})`,
    });

    if (uf.union(edge.from, edge.to)) {
      totalCost += edge.weight;
      edgesAdded++;

      steps.push({
        type: 'add',
        edge,
        message: `Added edge ${nodeIdToLabel(edge.from)}-${nodeIdToLabel(edge.to)} to MST (no cycle)`,
        totalCost,
      });

      if (edgesAdded === n - 1) break;
    } else {
      steps.push({
        type: 'reject',
        edge,
        message: `Rejected edge ${nodeIdToLabel(edge.from)}-${nodeIdToLabel(edge.to)} (creates cycle)`,
        totalCost,
      });
    }
  }

  if (steps.length > 0) {
    steps.push({
      type: 'complete',
      edge: steps[steps.length - 1].edge,
      message: `MST complete! Total cost: ${totalCost}`,
      totalCost,
    });
  }

  return steps;
}

// Reverse Delete Algorithm
export function reverseDeleteAlgorithm(nodes: GraphNode[], edges: Edge[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = nodes.length;
  const sortedEdges = [...edges].sort((a, b) => b.weight - a.weight);
  const remainingEdges = [...edges];
  let totalCost = edges.reduce((sum, e) => sum + e.weight, 0);

  const isConnected = (edgeList: Edge[]): boolean => {
    if (edgeList.length < n - 1) return false;

    const adj = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
      adj.set(i, []);
    }

    for (const edge of edgeList) {
      adj.get(edge.from)!.push(edge.to);
      adj.get(edge.to)!.push(edge.from);
    }

    const visited = new Set<number>();
    const queue = [0];
    visited.add(0);

    while (queue.length > 0) {
      const node = queue.shift()!;
      for (const neighbor of adj.get(node)!) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return visited.size === n;
  };

  for (const edge of sortedEdges) {
    steps.push({
      type: 'consider',
      edge,
      message: `Considering removal of edge ${nodeIdToLabel(edge.from)}-${nodeIdToLabel(edge.to)} (weight: ${edge.weight})`,
    });

    const tempEdges = remainingEdges.filter(
      e => !(e.from === edge.from && e.to === edge.to && e.weight === edge.weight)
    );

    if (isConnected(tempEdges)) {
      totalCost -= edge.weight;
      remainingEdges.splice(
        remainingEdges.findIndex(
          e => e.from === edge.from && e.to === edge.to && e.weight === edge.weight
        ),
        1
      );

      steps.push({
        type: 'reject',
        edge,
        message: `Removed edge ${nodeIdToLabel(edge.from)}-${nodeIdToLabel(edge.to)} (graph stays connected)`,
        totalCost,
      });
    } else {
      steps.push({
        type: 'add',
        edge,
        message: `Kept edge ${nodeIdToLabel(edge.from)}-${nodeIdToLabel(edge.to)} (removal disconnects graph)`,
        totalCost,
      });
    }
  }

  steps.push({
    type: 'complete',
    edge: steps[steps.length - 1].edge,
    message: `MST complete! Total cost: ${totalCost}`,
    totalCost,
  });

  return steps;
}
