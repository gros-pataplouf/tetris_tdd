```mermaid
---
title: Tetris
---

 
classDiagram
    MatrixToolsProvider ..|> Shape
    MatrixToolsProvider ..|> Board
    MatrixToolsProvider: +matrixToString(input=this)
    MatrixToolsProvider: +rotateMatrix(input=this)
    MatrixToolsProvider: +mergeMatrix(target, inserted, x, y)
    Shape --|> Tetromino
    RotatableComplex --|> Tetromino
    Shape --|> RotatingShape
    RotatableSimple --|> RotatingShape
    RotatableSimple: +rotateRight()
    RotatableSimple: +rotateLeft()
    RotatableComplex: +int orientations
    RotatableComplex: +string[] variants
    RotatableComplex: +rotateRight()
    RotatableComplex: +rotateLeft()
    Shape: +str[][] shape
    Shape: +int height
    Shape: +int width
    Shape: + private matrixToString(matrix)
    Shape: +toString()
    Board: +int width
    Board: +int height
    Board: +str[][] | null nextBoard - copy
    Board: +null | {block Tetromino, x int, y int} fallingShape 
    Board: + toString()
    Board: + hasFalling()
    Board: + private formatShape(shape)
    Board: + drop(input)
    Board: + stopFalling()
    Board: + private move(dirX, dirY)
    Board: + tick()
    Board: + moveRight()
    Board: + moveLeft()
    Board: + moveDown()
    Board: + private currentCellCanMove(rowIndex, colIndex, dirX, dirY)
    Board: + private shapeCanMove(dirX, dirY)





```