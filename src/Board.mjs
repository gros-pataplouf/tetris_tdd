import { Shape } from "./Shape.mjs";

export class Board {
  width;
  height;
  fallingShape = null;
  nextBoard = null;

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
    return this.fallingShape ? true : false
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
    if (this.hasFalling()) {
      throw new Error('already falling')
    }
    const block = this.shapeFormatter(input)
    const offset = Math.floor((this.width - block.width)/2)
    for (let i = 0; i < block.height; i++) {
      for (let j = offset; j - offset < block.width; j++) {
        this.board[i][j] = block.shape[i][j-offset]
      }
    }
    this.fallingShape = {block, x: offset, y: 0}
  }
  currentCellCanFall(rowIndex, colIndex) {
    const {block, x, y} = this.fallingShape;
    return !(block.shape[rowIndex][colIndex] !== '.'
    && (!block.shape[rowIndex + 1] || block.shape[rowIndex + 1][colIndex] === '.')
    && (!this.board[y+rowIndex+1] || this.board[y+rowIndex+1][colIndex + x] !== '.'))
  }
  updateNextBoard(rowIndex, colIndex) {
    const {block, x, y} = this.fallingShape;
    this.nextBoard[rowIndex + y + 1][colIndex + x] = block.shape[rowIndex][colIndex]
    this.nextBoard[rowIndex + y][colIndex + x] = '.'
  } 
  boardCanFall() {
    if (!this.hasFalling()) {
      return false
    }
    const {block, x, y} = this.fallingShape;
    this.nextBoard = this.board.map(row => row.map(elt => elt))
    for (let rowIndex = block.height - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = block.width - 1; colIndex >= 0; colIndex--) {
        if (this.currentCellCanFall(rowIndex, colIndex)) {

          if (block.shape[rowIndex][colIndex] !== '.') {
            this.updateNextBoard(rowIndex, colIndex)

        }
        } else {
          delete this.fallingShape
          return false
        }
      }}
    return true
  }
  fall() {
    this.board = this.nextBoard.map(row => row.map(elt => elt))
    this.fallingShape.y += 1   
  }
  tick() {
    if (this.boardCanFall()) {
      this.fall()
    }}
}
