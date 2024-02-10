import { Shape } from "./Shape.mjs";

export class Board {
  width;
  height;
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
    return this.fallingShape ? true: false
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
    if (!this.fallingShape) {
      return false
    }
    const {block, x, y} = this.fallingShape;
    for (let rowIndex = block.shape.length - 1; rowIndex >= 0; rowIndex--) {
      for (let eltIndex = block.shape[rowIndex].length - 1; eltIndex >= 0; eltIndex--) {
        if (
          block.shape[rowIndex][eltIndex] !== '.'
          && (!block.shape[rowIndex + 1] || block.shape[rowIndex + 1][eltIndex] === '.')
          && (!this.board[y+rowIndex+1] || this.board[y+rowIndex+1][eltIndex + x] !== '.')
          ) {
          delete this.fallingShape
          return false
        }}}
    return true
  }
  tick() {
    if (this.canFall()) {
      const {block, x, y} = this.fallingShape;
      for (let rowIndex = y + block.width - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = x + block.height - 1; colIndex >= 0; colIndex--) {
        if (this.board[rowIndex][colIndex] !== '.') {
            this.board[rowIndex+1][colIndex] = this.board[rowIndex][colIndex]
            this.board[rowIndex][colIndex] = '.'
        }
      }
    }
    this.fallingShape.y += 1   
    }}
}
