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
    const shape = this.shapeFormatter(block)
    if (this.board[0][boardMiddle] !== '.') {
      throw new Error('already falling')
    }
    const offset = Math.floor((this.width - shape.width)/2)
    for (let i = 0; i < shape.height; i++) {
      for (let j = offset; j - offset < shape.width; j++) {
        this.board[i][j] = shape.shape[i][j-offset]
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
