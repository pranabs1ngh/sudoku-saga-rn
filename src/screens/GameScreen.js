import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableWithoutFeedback, Dimensions, BackHandler } from 'react-native'

import { loadSudoku } from '../models/sudoku'
import Header from '../components/Header'
import Helpers from '../components/Helpers'
import Numpad from '../components/Numpad'
import GameOverModal from '../components/GameOverModal'
import LevelsModal from '../components/LevelsModal'

export default class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameplay: true,
      gameFinished: false,
      isGameOver: false,
      newGame: false,
    }
  }

  componentWillMount = () => {
    this.init(this.props.navigation.state.params.level)
  }

  init = level => {
    this.selectedCell = null
    this.hidden = null
    this.level = level
    this.btn = null
    this.ifPencil = false
    this.setState({
      board: loadSudoku(level),
      srow: null,
      scol: null,
      snum: null,
      hint: 0,
      error: 0,
      taskStack: []
    })
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress',
      () => this.props.navigation.navigate('MainFlow'))
  }

  componentWillUnmount = () => this.backHandler.remove()

  changeGameState = () => {
    this.state.gameplay ?
      this.setState({ gameplay: false }) :
      this.setState({ gameplay: true })
  }

  handleEntry = btn => {
    let { board, error, taskStack, srow, scol, } = this.state
    if (srow !== null && !this.ifPencil) {
      el = board[srow][scol]
      unum = el.unum

      if (!el.visible) {
        num = btn === unum[unum.length - 1] ? 0 : btn
        unum.push(num)

        if (el && num && num != el.num) error++
        else if (num && this.hidden === 40) this.setState({ gameFinished: true })
        taskStack.push({ row: srow, col: scol })
        this.setState({ board, snum: num, error, taskStack })

        if (error === 3)
          setTimeout(() => { this.setState({ isGameOver: true }) }, 300)
      }
    } else if (srow != null && this.ifPencil) {
      el = board[srow][scol]
      unum = el.unum[el.unum.length - 1]
      if (!unum) {
        const len = el.pencil.length

        if (!el.visible) {
          el.pencil = el.pencil.filter(num => num !== btn)
          if (len === el.pencil.length) el.pencil.push(btn)

          taskStack.push({ row: srow, col: scol, pencil: true })
          this.setState({ board, taskStack })
        }
      }
    }
  }

  undo = () => {
    let { taskStack, board, srow, scol, snum } = this.state
    let task = taskStack[taskStack.length - 1]

    if (task) {
      srow = task.row
      scol = task.col
      unum = board[srow][scol].unum
      pencil = board[srow][scol].pencil

      if (task.pencil) pencil.pop()
      else {
        unum.pop()
        snum = unum[unum.length - 1]
      }

      taskStack.pop()
      this.setState({ taskStack, board, srow, scol, snum })
    }
  }

  eraseEntry = () => {
    let { board, taskStack, srow, scol } = this.state
    if (srow + 1) {
      el = board[srow][scol]
      if (!el.visible) {
        taskStack.push({ row: srow, col: scol })

        if (el.unum.length === 0) el.pencil = []
        else el.unum.push(0)
        this.setState({ board, snum: 0, taskStack })
      }
    }
  }

  hint = () => {
    let { board, hint, srow, scol } = this.state

    if (srow + 1 && hint < 3) {
      el = board[srow][scol]
      if (!el.visible) {
        el.pencil = []
        el.visible = !el.visible
        hint++
        if (this.hidden === 1) this.setState({ gameFinished: true })
        this.setState({ board, snum: el.num, hint })
      }
    }
  }

  selectCell = (srow, scol, el) => {
    let snum
    if (el.visible) snum = el.num
    else if (el.unum[el.unum.length - 1]) snum = el.unum[el.unum.length - 1]
    else snum = 0
    this.setState({ srow, scol, snum })
  }

  renderCell = (el, row, col) => {
    let style = {}
    const { srow, scol, snum } = this.state
    const unum = el.unum[el.unum.length - 1]
    const pencil = el.pencil

    if (!el.visible && !unum) this.hidden++

    if (col > 0) style.borderLeftWidth = 1
    if (row > 0) style.borderTopWidth = 1
    if (col % 3 === 0 && col !== 0) {
      style.marginLeft = 5
      style.borderLeftWidth = 0
    }
    if (row % 3 === 0 && row !== 0) {
      style.marginTop = 5
      style.borderTopWidth = 0
    }

    if (row % 3 === 0 && col % 3 === 0) style.borderTopLeftRadius = 10
    if (row % 3 === 0 && col % 3 === 2) style.borderTopRightRadius = 10
    if (row % 3 === 2 && col % 3 === 0) style.borderBottomLeftRadius = 10
    if (row % 3 === 2 && col % 3 === 2) style.borderBottomRightRadius = 10

    style.backgroundColor = '#ECEFF1'
    if (row === srow || col === scol) style.backgroundColor = '#CFD8DC'
    if (srow && row - row % 3 === srow - srow % 3 && col - col % 3 === scol - scol % 3) style.backgroundColor = '#CFD8DC'
    if (el.visible && el.num === snum) style.backgroundColor = '#B0BEC5'
    if (unum && unum === snum) style.backgroundColor = '#B0BEC5'
    if (row === srow && col === scol)
      style.backgroundColor = '#BBDEFB'

    return (
      <TouchableWithoutFeedback onPress={() => this.selectCell(row, col, el)} key={`${row}${col}`}>
        <View style={{ ...styles.cell, ...style }}>
          {el.visible ? <Text style={styles.num}>{el.num}</Text> : null}
          {unum ? (unum === el.num ?
            <Text style={styles.unum}>{unum}</Text> :
            <Text style={styles.err}>{unum}</Text>) : null}
          {!unum && pencil.length >= 1 ?
            pencil.map(el => <Text style={styles.pencil} key={el}>{el}</Text>) : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderSudoku = () => {
    let elements = []
    this.hidden = 0

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        elements.push(this.renderCell(this.state.board[i][j], i, j))

    return elements
  }

  render = () => (
    <>
      <StatusBar barStyle='dark-content' hidden={false} />
      <View style={styles.container}>
        <Header
          init={this.init}
          level={this.level}
          isGameOver={this.state.isGameOver}
          gameplay={this.state.gameplay}
          navigation={this.props.navigation}
          gameFinished={this.state.gameFinished}
          changeGameState={this.changeGameState}
        />

        <View style={styles.infoBar}>
          <Text style={styles.infoBarText}>Hints: {this.state.hint}/3</Text>
          <Text style={styles.infoBarText}>{this.level}</Text>
          <Text style={styles.infoBarText}>Errors: {this.state.error}/3</Text>
        </View>

        <View style={styles.sudoku}>
          {this.renderSudoku()}
        </View>
        <Text style={{ alignSelf: 'center' }}>{this.hidden}</Text>
        <View style={styles.helpers}>
          <Helpers
            undo={this.undo}
            erase={() => this.eraseEntry()}
            pencil={() => { this.ifPencil = !this.ifPencil }}
            hint={this.hint} />
        </View>
        <Numpad handleTouch={this.handleEntry} />

        <GameOverModal
          isVisible={this.state.isGameOver}
          startNewGame={() => this.setState({ newGame: true })}
          setVisibility={() => this.setState({ isGameOver: false })}
          goBack={() => this.props.navigation.goBack()}
        />
        <LevelsModal
          isVisible={this.state.newGame}
          initGame={this.init}
          setVisibility={() => this.setState({ newGame: false, isGameOver: false })}
          navigation={this.props.navigation}
        />
      </View >
    </>
  )
}

const { width } = Dimensions.get('window')

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
  infoBarText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Quicksand-Medium'
  },
  sudoku: {
    height: width,
    width: width,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cell: {
    height: '10.7%',
    width: '10.7%',
    borderColor: '#90A4AE',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  num: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    padding: 10,
    color: 'black'
  },
  unum: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    padding: 10,
    color: '#0D47A1'
  },
  err: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    padding: 10,
    color: '#d50000'
  },
  pencil: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 10,
    paddingHorizontal: 3,
    paddingTop: 0.5,
    color: '#546E7A'
  },
  helpers: {
    flexGrow: 1,
    marginBottom: 65,
    justifyContent: 'center'
  }
})