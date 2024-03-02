import { Shape } from "./Shape.mjs";
import MatrixToolsProvider from "./Matrix.mjs";

export class Board extends MatrixToolsProvider {
  #fallingShape = null;

  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.board = Array(height).fill('.').map(elt => Array.from('.'.repeat(width)))
  }

  #formatShape(input) {
    if (input instanceof Shape) {
      return input
    }
    return new Shape(input)
  }
 
  #setShapeOffset(block) {
    const numOfEmptyFirstRows = block.shape.map(row => row.some(elt => elt !== '.') ? "F" : "E").join('').split('F')[0].length
    let offsetY = 0 - numOfEmptyFirstRows
    const offsetX = Math.floor((this.width - block.width)/2)
    this.#fallingShape = {block, x: offsetX, y: offsetY}
  }

  #insertShape() {
    this.board = this.mergeMatrix(this.board, this.#fallingShape.block.shape, this.#fallingShape.x, this.#fallingShape.y)
  }

  #currentCellCanMove(rowIndex, colIndex, dirX, dirY) {
    const {block, x, y} = this.#fallingShape;
    const canMoveInDirection = this.board[y + rowIndex + dirY] &&  this.board[y + rowIndex + dirY][x+ colIndex + dirX] === '.'
    if (block.currentCellIsFull(rowIndex, colIndex) && block.nextCellInDirectionEmptyOrNull(rowIndex, colIndex, dirX, dirY)) {
      return canMoveInDirection //check for full border cells whether there space on the board
    }
    return true //all inner cells can move by definition
  }

  #shapeCanMove(dirX, dirY) {
    if (!this.hasFalling()) {
      return false
    }
    const {block, x, y} = this.#fallingShape;
    for (let rowIndex = block.height - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = dirX <= 0? 0: block.width -1; dirX <= 0? colIndex < block.width : colIndex >= 0; dirX <= 0? colIndex++ : colIndex--) { //loop from left to right or right to left
        if (!this.#currentCellCanMove(rowIndex, colIndex, dirX, dirY)) {
          return false
        }
      }}
    return true
  }

  #stopFalling() {
      if (this.#fallingShape) {
        this.#insertShape()
        this.#fallingShape = null
      }
  }

  #move(dirX, dirY) {
    this.#fallingShape.y += dirY
    this.#fallingShape.x += dirX
  }

  drop(input) {
    if (this.hasFalling()) {
      throw new Error('already falling')
    }
    const block = this.#formatShape(input)
    this.#setShapeOffset(block)
  }

  hasFalling() {
    return this.#fallingShape ? true : false
  }

  tick() {
    if (this.#shapeCanMove(0,1)) {
      this.#move(0,1)
    } else {
      this.#stopFalling()
    }}

  moveLeft() {
    if (this.#shapeCanMove(-1, 0)) {
      this.#move(-1, 0)
    }
  }
  
  moveRight() {
    if (this.#shapeCanMove(1, 0)) {
      this.#move(1, 0)
    }
  }
  
  moveDown() {
    if (this.#shapeCanMove(0, 1)) {
      this.#move(0, 1)
    } else {
      this.#stopFalling()
    }
  }

  rotateRight() {
    this.#fallingShape.block = this.#fallingShape.block.rotateRight()
  }

  rotateLeft() {
    this.#fallingShape.block = this.#fallingShape.block.rotateLeft()
  }

  
  toString() {
    if (this.#fallingShape) {
      const mergedMatrix = this.mergeMatrix(this.board, this.#fallingShape.block.shape, this.#fallingShape.x, this.#fallingShape.y)
      return this.matrixToString(mergedMatrix)
    }
    return this.matrixToString(this.board)
  }
}
