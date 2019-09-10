import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'

export default class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.uniqRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.shuffleRow();
    this.initBoard();
    this.fillBoard(0, 0);
  }

  initBoard = () => {
    let board = new Array(9);
    for (let i = 0; i < 9; i++)
      board[i] = new Array(9);

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        board[i][j] = 0;
    this.board = board;
  }

  checkHorizontal = (num, row) => {
    for (let i = 0; i < 9; i++)
      if (this.board[row][i] === num)
        return false;
    return true;
  }

  checkVertical = (num, col) => {
    for (let i = 0; i < 9; i++)
      if (this.board[i][col] === num)
        return false;
    return true;
  }

  checkBox = (num, row, col) => {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (this.board[row + i][col + j] === num)
          return false;
    return true;
  }

  isSafe = (num, row, col) => {
    if (this.checkHorizontal(num, row) && this.checkVertical(num, col) && this.checkBox(num, row - row % 3, col - col % 3))
      return true;
    return false;
  }

  swapNum = (i, j) => {
    const num = this.uniqRow[i];
    this.uniqRow[i] = this.uniqRow[j];
    this.uniqRow[j] = num;
  }

  shuffleRow = () => {
    for (let i = 0; i < 5; i++)
      this.swapNum(Math.floor(Math.random() * 9), Math.floor(Math.random() * 9))
  }

  fillBoard = (row, col) => {
    if (col === 9) {
      this.shuffleRow();
      row++;
      col = 0;
    }
    if (row === 9) return true;

    for (let i = 0; i < 9; i++) {
      const num = this.uniqRow[i];

      if (this.isSafe(num, row, col)) {
        this.board[row][col] = num;

        if (this.fillBoard(row, col + 1))
          return true;
        this.board[row][col] = 0;
      }
    }
    return false;
  }

  componentWillMount = () => {
  }

  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' backgroundColor='#34515e' />
        <View style={{ padding: 20 }}>
          <Text>Game Screen</Text>
        </View>
      </>
    )
  }
}
