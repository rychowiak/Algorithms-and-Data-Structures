function Graph(numOfVertices) {
  return {
    // defining vertex array and adjacent List
    numOfVertices: numOfVertices,
    adjList: new Map(),

    // functions to be implemented

    // adds vertex (v) as key to adjList and initializes its value with an array
    addVertex(v) {
      // initialize adjList with a null array
      return this.adjList.set(v, []);
    },

    // adds an edge between src and dest
    addEdge(v, w) {
      // get the list for vertex v and put vertex w denoting edge between v and w
      this.adjList.get(v).push(w);
      // since graph is undirected, add an edge from w to v also
      this.adjList.get(w).push(v);
    },
    printGraph() {
      // get all vertices
      const get_keys = this.adjList.keys();
      //iterate over the vertices
      for (let i of get_keys) {
        const get_values = this.adjList.get(i);
        let conc = "";
        // iterate over adjList
        // concatenate the values into a string
        for (let j of get_values) {
          conc += j + " ";

          // print the vertex and its adjacency list
          console.log(i + " -> " + conc);
        }
      }
    },
    //  It performs Breadth First Search from the given startingNode
    bfs(startingNode) {
      const visited = {};

      visited[startingNode] = true;
      const queue = [startingNode];

      while (queue.length) {
        const getQueueElement = queue.shift();
        console.log(getQueueElement);

        const get_list = this.adjList.get(getQueueElement);

        for (let i in get_list) {
          const neighbor = get_list[i];

          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
          }
        }
      }
    },
    // dfs(v)
  };
}

const g = new Graph(6);
const vertices = ["A", "B", "C", "D", "E", "F"];

// adding vertices
for (let i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

// adding edges
g.addEdge("A", "B");
g.addEdge("A", "D");
g.addEdge("A", "E");
g.addEdge("B", "C");
g.addEdge("D", "E");
g.addEdge("E", "F");
g.addEdge("E", "C");
g.addEdge("C", "F");
// prints all vertex and
// its adjacency list
// A -> B D E
// B -> A C
// C -> B E F
// D -> A E
// E -> A D F C
// F -> E C
g.printGraph();

console.log("BFS");
g.bfs("A");
