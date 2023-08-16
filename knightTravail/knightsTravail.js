function Graph() {
  return {
    chessBoard: new Map(),

    addVertices(size = 8) {
      // create a square board
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          // the key need to be set as a string or else the get() in addEdges() does not work
          this.chessBoard.set(`${[i, j]}`, []);
        }
      }
      // console.log(this.chessBoard);
    },

    // connect all board squares based on Knight's move pattern
    addEdges(board = this.chessBoard) {
      for (let [element] of board) {
        const positionArr = element.split(",");
        console.log(positionArr);
        const x = parseInt(positionArr[0]);
        const y = parseInt(positionArr[1]);
        // Change direction based on clock position
        const direction = {
          1: [x + 1, y + 2],
          2: [x + 2, y + 1],
          4: [x + 2, y - 1],
          5: [x + 1, y - 2],
          7: [x - 1, y - 2],
          8: [x - 2, y - 1],
          10: [x - 2, y + 1],
          11: [x - 1, y + 2],
        };
        for (let clock in direction) {
          const move = direction[clock].toString();
          if (board.has(move) && !board.get(element).includes(move)) {
            this.chessBoard.get(element).push(move);
          }
        }
      }
    },
  };
}

const g = new Graph();

g.addVertices();
g.addEdges();
