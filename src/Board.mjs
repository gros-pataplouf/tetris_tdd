import { Shape } from "./Shape.mjs";

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
  shapeFormatter(shape) {
    if (shape instanceof Shape) {
      return shape
    } else {
      const newShape = new Shape(shape)
      return newShape
    }
  }

  drop(block) {
    const boardMiddle = Math.floor(this.width / 2)
    const blocktoMatrix = this.shapeFormatter(block)
    console.log(blocktoMatrix.shape)
    if (this.board[0][boardMiddle] !== '.') {
      throw new Error('already falling')
    }
    const shapeMiddle = Math.floor(blocktoMatrix.width / 2)
    const offset = boardMiddle - shapeMiddle
    console.log(offset)
    for (let i = 0; i < blocktoMatrix.height; i++) {
      for (let j = offset; j - offset < blocktoMatrix.width; j++) {
        this.board[i][j] = blocktoMatrix.shape[i][j-offset]
      }
    }
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
