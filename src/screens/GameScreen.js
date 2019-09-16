import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableWithoutFeedback } from 'react-native'

import sudoku from '../models/sudoku'
import Header from '../components/Header'
import Helpers from '../components/Helpers'
import Numpad from '../components/Numpad'
import GameOverModal from '../components/GameOverModal'
import LevelsModal from '../components/LevelsModal'

export default class GameScreen extends Component {
  init = level => {
    this.selectedCell = null
    this.btn = null
    this.level = level
    this.setState({
      gameplay: false,
      isGameOver: false,
      newGame: false,
      board: sudoku(this.level),
      srow: null,
      scol: null,
      snum: null,
      hint: 0,
      error: 0,
      taskStack: []
    })
  }

  goBack = () => {
    this.props.navigation.goBack(null)
  }

  changeGameState = () => {
    this.state.gameplay ?
      this.setState({ gameplay: false }) :
      this.setState({ gameplay: true })
  }

  handleEntry = btn => {
    let { board, error, taskStack, srow, scol } = this.state;
    if (srow + 1) {
      el = board[srow][scol];
      if (!el.visible) {
        el.unum = btn === el.unum ? 0 : btn

        if (el.unum)
          taskStack.push({ row: srow, col: scol, action: 'e', num: el.unum })
        else
          taskStack.push({ row: srow, col: scol, action: 'rm' })

        if (el.unum && el.unum != el.num) error++;

        this.setState({ board, snum: el.unum, error, taskStack });

        if (error === 3)
          setTimeout(() => { this.setState({ isGameOver: true }) }, 1000)
      }
    }
  }

  undo = () => {

  }

  eraseEntry = () => {
    let { board, taskStack, srow, scol } = this.state;
    if (srow + 1) {
      el = board[srow][scol];
      if (!el.visible) {
        el.unum = 0
        taskStack.push({ row: srow, col: scol, action: 'rm' })
        this.setState({ board, snum: el.unum, taskStack });
      }
    }
  }

  hint = () => {
    let { board, hint, srow, scol } = this.state;

    if (srow + 1 && hint < 3) {
      el = board[srow][scol];
      if (!el.visible) {
        el.unum = el.num
        hint++
        this.setState({ board, snum: el.unum, hint });
      }
    }
  }

  selectCell = (srow, scol, el) => {
    let snum;
    if (el.visible) snum = el.num;
    else if (el.unum) snum = el.unum;
    else snum = 0;
    this.setState({ srow, scol, snum })
  }

  renderCell = (el, row, col) => {
    let style = {};
    const { srow, scol, snum } = this.state;

    if (col > 0) style.borderLeftWidth = 1;
    if (row > 0) style.borderTopWidth = 1;
    if (col % 3 === 0 && col !== 0) {
      style.marginLeft = 5;
      style.borderLeftWidth = 0;
    }
    if (row % 3 === 0 && row !== 0) {
      style.marginTop = 5;
      style.borderTopWidth = 0;
    }
    if (row % 3 === 0 && col % 3 === 0) style.borderTopLeftRadius = 10;
    if (row % 3 === 0 && col % 3 === 2) style.borderTopRightRadius = 10;
    if (row % 3 === 2 && col % 3 === 0) style.borderBottomLeftRadius = 10;
    if (row % 3 === 2 && col % 3 === 2) style.borderBottomRightRadius = 10;

    style.backgroundColor = '#ECEFF1';
    if (row === srow || col === scol) style.backgroundColor = '#CFD8DC';
    if (srow && row - row % 3 === srow - srow % 3 && col - col % 3 === scol - scol % 3) style.backgroundColor = '#CFD8DC';
    if (el.visible && el.num === snum) style.backgroundColor = '#B0BEC5';
    if (el.unum && el.unum === snum) style.backgroundColor = '#B0BEC5';
    if (row === srow && col === scol)
      style.backgroundColor = '#BBDEFB';

    return (
      <TouchableWithoutFeedback onPress={() => this.selectCell(row, col, el)} key={`${row}${col}`}>
        <View style={{ ...styles.cell, ...style }}>
          {el.visible ? <Text style={styles.num}>{el.num}</Text> : null}
          {el.unum ? (el.unum === el.num ?
            <Text style={styles.unum}>{el.unum}</Text> :
            <Text style={styles.err}>{el.unum}</Text>) : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderSudoku = () => {
    let elements = []

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        elements.push(this.renderCell(this.state.board[i][j], i, j))

    return elements;
  }

  componentWillMount = () => { this.init(this.props.navigation.getParam('level')) }

  render = () => (
    <>
      <StatusBar barStyle='dark-content' hidden={false} />
      <View style={styles.container}>
        <Header gameplay={this.state.gameplay} changeGameState={this.changeGameState} goBack={this.goBack} />

        <View style={styles.infoBar}>
          <Text style={{ color: 'white', fontSize: 17 }}>Hint: {this.state.hint}/3</Text>
          <Text style={{ color: 'white', fontSize: 17 }}>{this.level}</Text>
          <Text style={{ color: 'white', fontSize: 17 }}>Errors: {this.state.error}/3</Text>
        </View>

        <View style={styles.sudoku}>
          {this.renderSudoku()}
        </View>

        <Helpers undo={this.undo} erase={this.eraseEntry} hint={this.hint} />
        <Numpad handleTouch={this.handleEntry} />
        <GameOverModal
          isVisible={this.state.isGameOver}
          startNewGame={() => this.setState({ newGame: true })}
          setVisibility={() => this.setState({ isGameOver: false })}
          goBack={this.goBack}
        />
        <LevelsModal
          isVisible={this.state.newGame}
          init={this.init}
          setVisibility={() => this.setState({ newGame: false })}
          navigation={this.props.navigation}
        />
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    alignContent: 'center'
  },
  infoBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#1A237E'
  },
  sudoku: {
    height: 343,
    width: 343,
    marginVertical: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cell: {
    height: 37,
    width: 37,
    padding: 5,
    borderColor: '#90A4AE',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  num: {
    fontFamily: 'Roboto',
    fontSize: 20,
    padding: 5,
    color: 'black'
  },
  unum: {
    fontFamily: 'Roboto',
    fontSize: 20,
    padding: 5,
    color: '#0D47A1'
  },
  err: {
    fontFamily: 'Roboto',
    fontSize: 20,
    padding: 5,
    color: '#d50000'
  }
});