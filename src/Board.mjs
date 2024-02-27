import { Shape } from "./Shape.mjs";
import { loopAndExecute } from "./helpers.mjs";

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

  formatShape(shape) {
    if (shape instanceof Shape) {
      return shape
    }
    return new Shape(shape)
  }

  drop(input) {
    if (this.hasFalling()) {
      throw new Error('already falling')
    }
    const block = this.formatShape(input)
    const numOfEmptyFirstRows = block.shape.map(row => row.some(elt => elt !== '.') ? "F" : "E").join('').split('F')[0].length
    let offsetY = 0 - numOfEmptyFirstRows
    const offsetX = Math.floor((this.width - block.width)/2)
    for (let i = offsetY; i - offsetY < block.height; i++) {
      if (i >= 0) {
      for (let j = offsetX; j - offsetX < block.width; j++) {
        if (block.shape[i][j] !== '.' && this.board[i][j] === '.') {
          this.board[i][j] = block.shape[i - offsetY][j-offsetX]
        }
      }
    }}
    this.fallingShape = {block, x: offsetX, y: offsetY}
  }
  currentCellCanMove(rowIndex, colIndex, dirX, dirY) {
    const {block, x, y} = this.fallingShape;
    const cellIsFull = () => block.shape[rowIndex][colIndex] !== '.'
    const isBorderCell = (dirX, dirY) => !block.shape[rowIndex + dirY] || !block.shape[rowIndex + dirY][colIndex + dirX] || block.shape[rowIndex + dirY][colIndex + dirX] === '.'
    const canMoveInDirection = (dirX, dirY) => this.board[y + rowIndex + dirY] &&  this.board[y + rowIndex + dirY][x+ colIndex + dirX] === '.'
    if (cellIsFull() && isBorderCell(dirX, dirY)) {
      return canMoveInDirection(dirX, dirY) //check for full border cells whether there space on the board
    }
    return true
  }
  moveCellOnNextBoard(rowIndex, colIndex, dirX, dirY) {
    const {block, x, y} = this.fallingShape;
    if (block.shape[rowIndex][colIndex] !== '.') {
      const {block, x, y} = this.fallingShape;
      this.nextBoard[rowIndex + y + dirY][colIndex + x + dirX] = block.shape[rowIndex][colIndex]
      this.nextBoard[rowIndex + y][colIndex + x] = '.'
    }
  } 
  shapeCanMove(dirX, dirY) {
    if (!this.hasFalling()) {
      return false
    }
    const {block, x, y} = this.fallingShape;
    this.nextBoard = this.board.map(row => row.map(elt => elt)) // work on a copy while looking at next board, so current board can be overwritten without further looping
    for (let rowIndex = block.height - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = dirX <= 0? 0: block.width -1; dirX <= 0? colIndex < block.width : colIndex >= 0; dirX <= 0? colIndex++ : colIndex--) { //loop from left to right or right to left
        if (!this.currentCellCanMove(rowIndex, colIndex, dirX, dirY)) {
          return false
        } else {
          this.moveCellOnNextBoard(rowIndex, colIndex, dirX, dirY)
        }
      }}
    return true
  }

  stopFalling() {
      delete this.fallingShape
  }

  move(dirX, dirY) {
    this.board = this.nextBoard.map(row => row.map(elt => elt))
    this.fallingShape.y += dirY
    this.fallingShape.x += dirX   
  }
  tick() {
    if (this.shapeCanMove(0,1)) {
      this.move(0,1)
    } else {
      this.stopFalling()
    }}
  moveLeft() {
    if (this.shapeCanMove(-1, 0)) {
      this.move(-1, 0)
    }
  }
  moveRight() {
    if (this.shapeCanMove(1, 0)) {
      this.move(1, 0)
    }
  }
  moveDown() {
    if (this.shapeCanMove(0, 1)) {
      this.move(0, 1)
    } else {
      this.stopFalling()
    }
  }
}
