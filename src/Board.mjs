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
  currentCellCanMove(rowIndex, colIndex, dirX, dirY) {
    const {block, x, y} = this.fallingShape;
    if (dirX === 0) {
      return !(block.shape[rowIndex][colIndex] !== '.'
      && (!block.shape[rowIndex + dirY] || block.shape[rowIndex + dirY][colIndex] === '.')
      && (!this.board[y+rowIndex+dirY] || this.board[y+rowIndex+dirY][colIndex + x] !== '.'))
    } else {
      return !(block.shape[rowIndex][colIndex] !== '.'
      && (!block.shape[rowIndex][colIndex + dirX] || block.shape[rowIndex][colIndex + dirX] === '.')
      && (!this.board[y+rowIndex][x+colIndex+dirX] || this.board[y+rowIndex][colIndex + x + dirX] !== '.'))
    }
  }
  moveCellOnNextBoard(rowIndex, colIndex, dirX, dirY) {
    const {block, x, y} = this.fallingShape;
    if (block.shape[rowIndex][colIndex] !== '.') {
      const {block, x, y} = this.fallingShape;
      this.nextBoard[rowIndex + y + dirY][colIndex + x + dirX] = block.shape[rowIndex][colIndex]
      this.nextBoard[rowIndex + y][colIndex + x] = '.'
    }
  } 
  boardCanMove(dirX, dirY) {
    if (!this.hasFalling()) {
      return false
    }
    const {block, x, y} = this.fallingShape;
    this.nextBoard = this.board.map(row => row.map(elt => elt)) // work on a copy while looking at next board, so current board can be overwritten without further looping

    for (let rowIndex = block.height - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = dirX <= 0? 0: block.width -1; dirX <= 0? colIndex < block.width : colIndex >= 0; dirX <= 0? colIndex++ : colIndex--) { //whether we loop from left to right or right 
        if (this.currentCellCanMove(rowIndex, colIndex, dirX, dirY)) {
            this.moveCellOnNextBoard(rowIndex, colIndex, dirX, dirY)
        } else {
          if (dirX === 0) {
            delete this.fallingShape
          }
          delete this.nextBoard
          return false
        }
      }}
    return true
  }
  move(dirX, dirY) {
    this.board = this.nextBoard.map(row => row.map(elt => elt))
    this.fallingShape.y += dirY
    this.fallingShape.x += dirX   
  }
  tick() {
    if (this.boardCanMove(0,1)) {
      this.move(0,1)
    }}
  moveLeft() {
    if (this.boardCanMove(-1, 0)) {
      this.move(-1, 0)
    }
  }
  moveRight() {
    if (this.boardCanMove(1, 0)) {
      this.move(1, 0)
    }
  }
  moveDown() {
    if (this.boardCanMove(0, 1)) {
      this.move(0, 1)
    }
  }

}
