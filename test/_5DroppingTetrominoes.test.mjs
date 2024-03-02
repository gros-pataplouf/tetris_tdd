import { test  } from "vitest";
import {expect} from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./testHelpers.mjs";


test('empty cells of the dropped forms do not overwrite non-empty cells of another shape', () => {
    const board = new Board(5,5)
    board.drop(Tetromino.O_SHAPE)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE)
    fallToBottom(board)
    expect(board.toString()).to.equalShape(
        `.....
        IIII.
        IIII.
        ..OO.
        ..OO.
        `
    )
})