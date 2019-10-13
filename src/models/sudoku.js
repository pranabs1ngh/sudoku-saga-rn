let board, hide, uniqRow

export const init = () => {
  board = new Array(9)
  uniqRow = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  for (let i = 0; i < 9; i++)
    board[i] = new Array(9)

  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      board[i][j] = 0

  shuffleRow()
  fillBoard(0, 0)
}

const hideElements = hide => {
  board = board.map(el => {
    return el.map(el => ({ num: el, unum: [], pencil: [], visible: true }))
  })

  while (hide) {
    let row = Math.floor(Math.random() * 9)
    let col = Math.floor(Math.random() * 9)

    if (board[row][col].visible) {
      board[row][col].visible = false
      hide--
    }
  }
}

const checkHorizontal = (num, row) => {
  for (let i = 0; i < 9; i++)
    if (board[row][i] === num)
      return false
  return true
}

const checkVertical = (num, col) => {
  for (let i = 0; i < 9; i++)
    if (board[i][col] === num)
      return false
  return true
}

const checkBox = (num, row, col) => {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[row + i][col + j] === num)
        return false
  return true
}

const isSafe = (num, row, col) => {
  if (checkHorizontal(num, row) && checkVertical(num, col) && checkBox(num, row - row % 3, col - col % 3))
    return true
  return false
}

const swapNum = (i, j) => {
  const num = uniqRow[i]
  uniqRow[i] = uniqRow[j]
  uniqRow[j] = num
}

const shuffleRow = () => {
  for (let i = 0; i < 5; i++)
    swapNum(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9))
}

const fillBoard = (row, col) => {
  if (col === 9) {
    shuffleRow()
    row++
    col = 0
  }
  if (row === 9) return true

  for (let i = 0; i < 9; i++) {
    const num = uniqRow[i]

    if (isSafe(num, row, col)) {
      board[row][col] = num

      if (fillBoard(row, col + 1))
        return true
      board[row][col] = 0
    }
  }
  return false
}

export const loadSudoku = level => {
  if (level === 'Easy') hide = 40
  if (level === 'Medium') hide = 45
  if (level === 'Hard') hide = 50
  if (level === 'Expert') hide = 55

  hideElements(hide)

  return board
}