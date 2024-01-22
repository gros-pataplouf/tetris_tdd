export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(height).fill('.').map(elt => Array.from('.'.repeat(width)))
  }

  toString() {
    let boardToString = '';
    for (let row of this.board) {
      boardToString += row.concat('\n').join('')
    }
    return boardToString
  }
  drop(block) {
    const middleIndex = Math.floor(this.width / 2)
    this.board[0][middleIndex] = block
  }
  tick() {
    for (let i = this.height - 1; i >= 0; i--) {
      for (let j = this.width - 1; j >= 0; j--) {
        if (this.board[i][j] !== '.') {
          this.board[i+1][j] = this.board[i][j]
          this.board[i][j] = '.'
        }
      }
    }
  }
}
