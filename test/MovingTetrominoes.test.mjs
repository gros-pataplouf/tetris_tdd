import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"

describe('falling tetrominoes', () => {
    let board
    beforeEach(() => {
        board = new Board(10, 6)
        
    })
    test('a falling tetromino can be moved left', () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()
        expect(board.toString()).to.equalShape(
            `...T......
             ..TTT.....
             ..........
             ..........
             ..........
             ..........`
          );
    })

    test('a falling tetromino can be moved right', () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.moveRight()
        expect(board.toString()).to.equalShape(
            `..........
             .....T....
             ....TTT...
             ..........
             ..........
             ..........`
          );
    })

    test('a falling tetromino can be moved down', () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.moveRight()
        board.moveDown()
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             .....T....
             ....TTT...
             ..........
             ..........`
          );
    })

    test('it cannot be moved left beyond the board', () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.moveRight()
        board.moveDown()
        for (let i = 0; i < 10; i++) {
            board.moveLeft()
        }
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             .T........
             TTT.......
             ..........
             ..........`
          );
    })
    test('it cannot be moved right beyond the board', () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.moveRight()
        board.moveDown()
        for (let i = 0; i < 10; i++) {
            board.moveRight()
        }
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ........T.
             .......TTT
             ..........
             ..........`
          );
    })
    test('it cannot be moved down beyond the board', () => {
        board.drop(Tetromino.O_SHAPE)
        for (let i = 0; i < 10; i++) {
            board.moveDown()
        }
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..........
             ....OO....
             ....OO....`
          );
        expect(board.hasFalling()).to.be.false
    })

})


/* - a falling tetromino can be moved left OK
 - a falling tetromino can be moved right OK
 - a falling tetromino can be moved down OK
 - it cannot be moved left beyond the board OK
 - it cannot be moved right beyond the board
 - it cannot be moved down beyond the board (will stop falling)
 - it cannot be moved left through other blocks
 - it cannot be moved right through other blocks
 - it cannot be moved down through other blocks (will stop falling)
*/