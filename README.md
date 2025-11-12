# MST Nexus

MST Nexus is a client-side web application for visualizing and exploring minimum spanning tree algorithms on weighted undirected graphs. The application presents algorithm execution as a sequence of steps, highlights edges under consideration, and reports the final minimum spanning tree and its total weight.

## Features

- Interactive visualization of Kruskal and Prim implementations.
- Step-by-step playback with controls to advance, pause, and reset.
- Visual indicators for considered, accepted, and rejected edges.
- Import and edit graph topology and edge weights through the UI.
- Responsive interface and modular components to simplify extension.

## Demo

If a public demo is available, include the URL here. Otherwise run the application locally using the instructions below.

## Technology

- Frontend: React with TypeScript
- Build tool: Vite
- Styling: Tailwind CSS
- Rendering: SVG or Canvas for graph visuals

Source code and main responsibilities:

- Visualization page and orchestration: `src/pages/Visualizer.tsx`
- Reusable UI components: `src/components` and `src/components/ui`
- Algorithms and utilities: `src/utils` and `src/lib`

## Installation

Requirements

- Node.js 16 or later
- npm, yarn, or bun

Steps

```powershell
git clone https://github.com/DabMouse/mst-visualizer.git
cd mst-visualizer
npm install
npm run dev
```

Open the local address printed by Vite in a browser to use the application.

To create a production build:

```powershell
npm run build
```

## Usage

1. Open the application in a browser.
2. Create a graph by adding nodes and edges or import a saved graph if supported.
3. Choose an algorithm (Kruskal or Prim) from the control panel.
4. Use playback controls to step through the algorithm and observe visual highlights.
5. Review the final minimum spanning tree and the computed total weight.

## Development notes

- Modify visualization logic in `src/pages/Visualizer.tsx`.
- Shared UI primitives are under `src/components/ui`.
- Hooks and utilities are in `src/hooks` and `src/lib`.
- New algorithms should emit a sequence of step objects compatible with the visualization state.

Recommended workflow

1. Create a feature branch for changes.
2. Implement the feature and add tests where appropriate.
3. Run the development server and verify behavior.
4. Submit a pull request with a clear description and screenshots if useful.

## Contributing

Contributions are welcome. When contributing, follow existing code conventions and provide tests for new behavior where applicable. Open an issue to discuss larger changes before implementing them.

## License

Choose and include an open source license for the project. If a `LICENSE` file exists, ensure the license name here matches that file.

Example

```
MIT License
See the LICENSE file for details.
```

## Contact

For issues, feature requests, or questions, open an issue or submit a pull request in this repository.

## Acknowledgments

This project is intended as a teaching and experimentation tool to demonstrate greedy graph algorithms and their behavior on different graph topologies.
