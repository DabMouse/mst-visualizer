MST Nexus

Interactive Minimum Spanning Tree Visualizer

A web application that allows users to visualize, explore, and interact with minimum spanning tree (MST) algorithms (such as Kruskal’s algorithm and Prim’s algorithm) on weighted undirected graphs.

Live demo: mst-nexus.lovable.app

🧠 Why this project?

MSTs form a fundamental concept in graph theory: a spanning tree of a connected, undirected, weighted graph whose total edge-weight is minimum. 
Wikipedia
+2
W3Schools
+2

Visualising how MST algorithms proceed step-by-step helps learners understand greedy algorithms, cycle detection, and graph connectivity.

As a VLSI/CS student (you) with interest in algorithms and modelling, having an interactive tool strengthens understanding of foundational algorithmic design — useful when you tackle larger topics in modelling, circuit graphs, network design, etc.

✅ Features

Draw or import a weighted undirected graph (nodes + weighted edges).

Choose algorithm: Kruskal’s, Prim’s (possibly other variants).

Step through algorithm: highlight which edge is considered, accepted, or rejected (cycle detection, connectivity).

Show final MST, total weight, and possibly compare different runs/algorithms.

Responsive UI, visual colour cues, animations to illustrate how the MST “grows”.

(Optional) Customisation: add/remove nodes/edges, change weights, random graph generation, reset.

📦 Tech Stack

Frontend: (specify) e.g., React / Vue / vanilla JavaScript + HTML5 Canvas / SVG for graph drawing.

Graph layout: force-directed or manual positioning.

Algorithm logic: implementation of Kruskal’s & Prim’s in JavaScript/TypeScript.

Styling: CSS/SCSS (responsive design).

Hosting: (specify) e.g., deployed via lovable.app; maybe static site.

(Optional) Backend: none or simple serverless if needed for graph upload/saving.

🛠 Installation & Setup

Clone the repo and run locally for development.

git clone https://github.com/<your-username>/mst-nexus.git
cd mst-nexus
# install dependencies
npm install
# start dev server
npm run dev


Build for production:

npm run build
# then deploy to your hosting platform


Dependencies:

Node.js (>= version)

npm / yarn

(List any major libraries e.g., d3.js, vis.js, react, etc.)

🧮 Usage

Open the app in your browser (e.g., http://localhost:3000).

Create a graph:

Add nodes via button.

Connect nodes with edges, assign weights.

Optionally generate a random graph.

Choose algorithm (Kruskal or Prim).

Press Start or Next Step to progress through the algorithm.

The edge being considered is highlighted.

If accepted into MST, it turns green (for example). If rejected (cycle or higher weight), it turns red.

After finishing, view the resulting MST, total weight, maybe highlight unused edges.

Reset or modify the graph to try other scenarios.

🎯 Why this is helpful for learners

Bridges the gap between abstract pseudocode and dynamic execution.

Visual cues (highlighting, step-by-step) make the greedy decisions more intuitive.

By trying different graphs (dense vs sparse, equal weights vs distinct weights), users can experiment and internalise algorithmic principles such as the cut-property or cycle‐property of MST. 
algs4.cs.princeton.edu
+1

As a student of VLSI and systems design, these graph algorithms can map to network design, circuit interconnect optimisation, and other modelling tasks.

🧩 Future / Enhancements

Support for dynamic graphs (adding/removing edges during execution).

Visual comparison of multiple algorithms side-by-side (Kruskal vs Prim).

Export of graph as JSON / import of saved graphs.

Larger graphs: performance optimisation for hundreds of nodes.

Animation speed control, step-backwards ability.

Add other MST algorithms (e.g., Borůvka’s algorithm) or MST variants (minimum bottleneck spanning tree, etc.).

Mobile/touch-friendly interface.

📄 Licence

Specify your licence (MIT, Apache 2.0, etc).
Example:

MIT Licence – see LICENSE file for details.

🧑‍💻 Contributors

Sharvil – initial development, UI design, algorithm logic.

(If others) list contributors.

📬 Contact

If you find any issues, bugs, or have feature requests, please open an issue or submit a pull-request.
You can also reach me at: [your email or contact link]

Thanks for checking out MST Nexus — happy visualising and learning! 🚀
