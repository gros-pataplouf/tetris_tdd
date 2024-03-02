```mermaid
---
title: Tetris
---

 
classDiagram
    MatrixToolsProvider ..|> Board
    MatrixToolsProvider ..|> Shape
    MatrixToolsProvider: +matrixToString(input=this)
    MatrixToolsProvider: +rotateMatrix(input=this)
    MatrixToolsProvider: +mergeMatrix(target, inserted, x, y)
    RotatableSimple --|> RotatingShape
    Shape --|> RotatingShape
    Shape --|> Tetromino
    RotatableComplex --|> Tetromino
    RotatableSimple: +rotateRight()
    RotatableSimple: +rotateLeft()
    RotatableComplex: +int orientations
    RotatableComplex: +string[] variants
    RotatableComplex: +rotateRight()
    RotatableComplex: +rotateLeft()
    Shape: +str[][] shape
    Shape: +int height
    Shape: +int width
    Shape: +toString()
    Shape: +currentCellIsFull(rowIndex, colIndex)
    Shape: +nextCellInDirectionEmptyOrNull(rowIndex, colIndex, dirX, dirY)

    Board: +int width
    Board: +int height
    Board: +null | {block Tetromino, x int, y int} private fallingShape 
    Board: + private formatShape(shape)
    Board: + private setShapeOffset(shape)
    Board: + private move(dirX, dirY)
    Board: + private stopFalling()
    Board: + private shapeCanMove(dirX, dirY)
    Board: + private currentCellCanMove(rowIndex, colIndex, dirX, dirY)
    Board: + toString()
    Board: + hasFalling()
    Board: + drop(input)
    Board: + tick()
    Board: + moveRight()
    Board: + moveLeft()
    Board: + moveDown()
```