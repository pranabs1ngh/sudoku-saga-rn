import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableWithoutFeedback } from 'react-native'

import sudoku from '../models/sudoku'
import Header from '../components/Header'
import Helpers from '../components/Helpers'
import Numpad from '../components/Numpad'

export default class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.selectedCell = null
    this.btn = null

    level = 'medium'
    this.state = { gameplay: false, board: sudoku(level) }
  }

  changeGameState = () => {
    this.state.gameplay ?
      this.setState({ gameplay: false }) :
      this.setState({ gameplay: true })
  }

  handleTouch = btn => {
    this.setState({ btn })
  }

  selectCell = (srow, scol, snum) => { this.setState({ srow, scol, snum }) }

  renderCell = (el, row, col) => {
    let style = {};

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

    style.backgroundColor = '#ECEFF1'; const { srow, scol, snum } = this.state;
    if (row === srow || col === scol) style.backgroundColor = '#CFD8DC';
    if (row - row % 3 === srow - srow % 3 && col - col % 3 === scol - scol % 3) style.backgroundColor = '#CFD8DC';
    if (el.num && el.num === snum) style.backgroundColor = '#B0BEC5';
    if (row === srow && col === scol) style.backgroundColor = '#BBDEFB';


    return (
      <TouchableWithoutFeedback onPress={() => this.selectCell(row, col, el.num)} key={`${row}${col}`}>
        <View style={{ ...styles.cell, ...style }}>
          {el.visible ? <Text style={styles.num}>{el.num}</Text> : null}
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

  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' hidden={false} />
        <View style={styles.container}>
          <Header gameplay={this.state.gameplay} changeGameState={this.changeGameState} />

          <View style={styles.infoBar}>
            <Text style={{ color: 'white', fontSize: 17 }}>Expert</Text>
            <Text style={{ color: 'white', fontSize: 17 }}>Errors: 2/3</Text>
          </View>

          <View style={styles.sudoku}>
            {this.renderSudoku()}
          </View>

          <Helpers />
          <Numpad handleTouch={this.handleTouch} />
        </View >
      </>
    )
  }
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
    backgroundColor: '#283593'
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
    fontSize: 20,
    padding: 5,
    color: 'black'
  }
});