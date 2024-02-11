export function fallToBottom(board) {
    for (let i = 0; i < board.height; i++) {
      board.tick();
    }
}

export function moveToLeftUntilStops(board) {
    for (let i = 0; i < board.width; i++) {
      board.moveLeft();
    }
  }

export function moveToRightUntilStops(board) {
    for (let i = 0; i < board.width; i++) {
      board.moveRight();
    }
  }


export function moveDownUntilStops(board) {
    for (let i = 0; i < board.height; i++) {
      board.moveRight();
    }
  }
