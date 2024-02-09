import { Shape } from "./Shape.mjs";

export class Board {
  width;
  height;
  #falling = false;
  fallingShape = null;

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

  drop(input) {
    const boardMiddle = Math.floor(this.width / 2)
    const block = this.shapeFormatter(input)
    if (this.board[0][boardMiddle] !== '.') {
      throw new Error('already falling')
    }
    const offset = Math.floor((this.width - block.width)/2)
    for (let i = 0; i < block.height; i++) {
      for (let j = offset; j - offset < block.width; j++) {
        this.board[i][j] = block.shape[i][j-offset]
      }
    }
    this.fallingShape = {block, x: offset, y: 0}
  }
  canFall() {
    const {block, x, y} = this.fallingShape;
    for (let rowIndex in block.shape) {
      for (let eltIndex in block.shape[rowIndex]) {
        if (block.shape[rowIndex][eltIndex] !== '.') {
          if (!this.board[parseInt(rowIndex) + y]) {
            return false
            console.log(block.shape[rowIndex][eltIndex], parseInt(rowIndex), y, this.board[parseInt(rowIndex) + y + 1])
          }
        }}}
    return true
  }
  tick() {
    if (this.canFall()) {
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
    }}
    if (this.#falling) {
      this.fallingShape.y += 1      
    }
  }
}
