import { beforeEach, describe, test, expect } from "vitest"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { fallToBottom, moveDownUntilStops, moveToLeftUntilStops, moveToRightUntilStops } from "./testHelpers.mjs"

// # Level 6: Rotating falling tetrominoes

// > Let's keep adding player controls: rotations.

// You're now responsible for covering all the corner cases. Here are the features to be implemented:

// - a falling tetromino can be rotated
// - it cannot be rotated when there is no room to rotate
// - [wall kick](https://tetris.fandom.com/wiki/Wall_kick): when it is up against a wall (or other blocks) and is rotated,
//   but there is no room to rotate, move it away from the wall if possible

// ## 🚀 [Continue to the next level](level-7.md)
