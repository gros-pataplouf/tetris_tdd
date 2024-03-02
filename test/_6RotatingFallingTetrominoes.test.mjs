import { beforeEach, describe, test, expect } from "vitest"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { fallToBottom, moveDownUntilStops, moveToLeftUntilStops, moveToRightUntilStops } from "./testHelpers.mjs"

describe('a falling tetromino can be rotated', () => {
    let board
    beforeEach(() => {
        board = new Board(10, 6)
        
    })
    test('can be rotated right', () => {
        board.drop(Tetromino.T_SHAPE)
        board.rotateRight()
        expect(board.toString()).to.equalShape(
            `....T.....
             ....TT....
             ....T.....
             ..........
             ..........
             ..........`
          );
    }),
    test('can be rotated left', () => {
        board.drop(Tetromino.T_SHAPE)
        board.rotateLeft()
        expect(board.toString()).to.equalShape(
            `....T.....
             ...TT.....
             ....T.....
             ..........
             ..........
             ..........`
          );
    }), 
    test('4 rotations lead back to beginning', () => {
        board.drop(Tetromino.T_SHAPE)
        for (let i = 0; i < 4; i++) {
            board.rotateLeft()
        }
        expect(board.toString()).to.equalShape(
            `....T.....
             ...TTT....
             ..........
             ..........
             ..........
             ..........`
          );
    })
})


// # Level 6: Rotating falling tetrominoes

// > Let's keep adding player controls: rotations.

// You're now responsible for covering all the corner cases. Here are the features to be implemented:

// - a falling tetromino can be rotated
// - it cannot be rotated when there is no room to rotate
// - [wall kick](https://tetris.fandom.com/wiki/Wall_kick): when it is up against a wall (or other blocks) and is rotated,
//   but there is no room to rotate, move it away from the wall if possible

// ## 🚀 [Continue to the next level](level-7.md)
