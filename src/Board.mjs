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
    for (let rowIndex = block.shape.length - 1; rowIndex >= 0; rowIndex--) {
      for (let eltIndex = block.shape[rowIndex].length - 1; eltIndex >= 0; eltIndex--) {
        if (
          block.shape[rowIndex][eltIndex] !== '.'
          && (!block.shape[rowIndex + 1] || block.shape[rowIndex + 1][eltIndex] === '.')
          && (!this.board[y+rowIndex+1] || this.board[y+rowIndex+1][eltIndex + x] !== '.')
          ) {
          this.#falling = false
          return false
        }}}
    return true
  }
  tick() {
    if (this.canFall()) {
      const {block, x, y} = this.fallingShape;
      for (let i = y + block.shape.length - 1; i >= 0; i--) {
      for (let j = x + block.shape[0].length - 1; j >= 0; j--) {
        if (this.board[i][j] !== '.') {
            this.#falling = true
            this.board[i+1][j] = this.board[i][j]
            this.board[i][j] = '.'
          }
        
      }
    }
    this.fallingShape.y += 1   
    }}
}
