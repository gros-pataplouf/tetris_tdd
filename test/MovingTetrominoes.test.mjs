import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { fallToBottom, moveDownUntilStops, moveToLeftUntilStops, moveToRightUntilStops } from "./testHelpers.mjs"

describe('falling tetrominoes can be moved', () => {
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

describe('moving tetrominoes are stopped by other blocks', () => {
    let board
    beforeEach(() => {
        board = new Board(10, 6)
        
    })
    test('it cannot be moved left through other blocks', () => {
        for (let i = 0; i < 3; i++) {
            board.drop(Tetromino.O_SHAPE)
            moveToLeftUntilStops(board)
            fallToBottom(board)
        }
        board.drop(Tetromino.T_SHAPE)
        moveToLeftUntilStops(board)
        expect(board.toString()).to.equalShape(
            `OO.T......
             OOTTT.....
             OO........
             OO........
             OO........
             OO........`
          );
    })
    test('it cannot be moved right through other blocks', () => {
        for (let i = 0; i < 3; i++) {
            board.drop(Tetromino.O_SHAPE)
            moveToRightUntilStops(board)
            fallToBottom(board)
        }
        board.drop(Tetromino.T_SHAPE)
        moveToRightUntilStops(board)
        expect(board.toString()).to.equalShape(
            `......T.OO
             .....TTTOO
             ........OO
             ........OO
             ........OO
             ........OO`
          );
    })
    test('it cannot be moved down through other blocks (will stop falling)', () => {
        board.drop(Tetromino.I_SHAPE)
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE)
        fallToBottom(board)
        board.moveDown()
        board.drop(Tetromino.O_SHAPE)
        board.moveDown()
        expect(board.toString()).to.equalShape(
            `..........
             ....OO....
             ....OO....
             ....T.....
             ...TTT....
             ..IIII....`
          );
    })
    test('a complex scenario with I, T, O, L, Z-Shape', () => {
        board.drop(Tetromino.O_SHAPE)
        moveToLeftUntilStops(board)
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE)
        moveToRightUntilStops(board)
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE)
        fallToBottom(board)
        board.drop(Tetromino.L_SHAPE)
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.Z_SHAPE)
        board.moveRight()
        fallToBottom(board)
        expect(board.toString()).to.equalShape(
            `..........
            ....ZZ....
            ....LZZ...
            ..LLL.....
            OO..T.....
            OO.TTTIIII`
          );
    })

})


/* - a falling tetromino can be moved left OK
 - a falling tetromino can be moved right OK
 - a falling tetromino can be moved down OK
 - it cannot be moved left beyond the board OK
 - it cannot be moved right beyond the board OK
 - it cannot be moved down beyond the board (will stop falling) OK
 - it cannot be moved left through other blocks OK
 - it cannot be moved right through other blocks OK
 - it cannot be moved down through other blocks (will stop falling)
*/