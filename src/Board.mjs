import { Shape } from './Shape'

export class Board {
  width;
  height;
  #falling = false;

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

  hasFalling() {
    return this.#falling
  }
  blockToMatrix(block) {
    if (block instanceof Shape) {
      return block.shape
    } else {
      const blockShape = new Shape(block)
      return blockShape.shape
    }
  }

  drop(block) {
    const boardMiddle = Math.floor(this.width / 2)
    const blocktoMatrix = this.blockToMatrix(block)
    if (this.board[0][boardMiddle] !== '.') {
      throw new Error('already falling')
    }
    const shapeMiddle = Math.floor(blocktoMatrix.width / 2)
    const offset = boardMiddle - shapeMiddle
    this.board[0][boardMiddle] = block
    
  }
  tick() {
    for (let i = this.height - 1; i >= 0; i--) {
      for (let j = this.width - 1; j >= 0; j--) {
        if (this.board[i][j] !== '.') {
          if (i+1 < this.height && this.board[i+1][j] === '.') {
            this.#falling = true
            this.board[i+1][j] = this.board[i][j]
            this.board[i][j] = '.'
          } else {
            this.#falling = false
          }
        }
      }
    }
  }
}
