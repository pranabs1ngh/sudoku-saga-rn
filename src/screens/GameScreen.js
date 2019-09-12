import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View, ActivityIndicator } from 'react-native'

// import sudoku from '../models/sudoku'
import SubGrid from '../components/SubGrid'
import Header from '../components/Header'
import Helpers from '../components/Helpers'
import Numpad from '../components/Numpad'

export default class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameplay: false,
      selectedCell: null
    }
    // const { board, subgrids } = props;
    this.dispBoard = [[0, 0, 3, 4, 0, 9, 8, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 9, 0, 0, 0, 6, 7, 4],
    [0, 0, 0, 9, 0, 0, 2, 8, 3],
    [0, 0, 8, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 0, 0, 0, 7, 0, 0, 0],
    [1, 0, 0, 0, 9, 0, 0, 0, 7]]

    this.subgrids = [[], [], [], [], [], [], [], [], []];
    this.initSubGrid();
  }

  changeGameState = () => {
    this.state.gameplay ?
      this.setState({ gameplay: false }) :
      this.setState({ gameplay: true })
  }

  initSubGrid = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let id;

        if (i < 3 && j < 3) id = 0;
        else if (i < 3 && j < 6) id = 1;
        else if (i < 3 && j > 5) id = 2;
        else if (i < 6 && j < 3) id = 3;
        else if (i < 6 && j < 6) id = 4;
        else if (i < 6 && j > 5) id = 5;
        else if (i > 5 && j < 3) id = 6;
        else if (i > 5 && j < 6) id = 7;
        else id = 8;

        let cell = {
          row: i,
          col: j,
          id,
          num: this.dispBoard[i][j] ? this.dispBoard[i][j] : null
        }

        this.subgrids[id].push(cell);
      }
    }
  }

  renderSubGrid = (data, index) => (
    <SubGrid
      grid={data}
      id={index}
      key={index}
      selectCell={this.selectCell}
      selectedCell={this.state.selectedCell}
    />
  )

  selectCell = async data => {
    await this.setState({ selectedCell: data });
    this.forceUpdate();
  }

  render() {
    return (
      <>
        <StatusBar barStyle='light-content' hidden={false} />
        <View style={styles.container}>
          <Header gameplay={this.state.gameplay} changeGameState={this.changeGameState} />

          <View style={styles.infoBar}>
            <Text style={{ color: 'white', fontSize: 17 }}>Expert</Text>
            <Text style={{ color: 'white', fontSize: 17 }}>Errors: 2/3</Text>
          </View>

          <View style={styles.sudoku}>
            {this.subgrids.map((data, index) => this.renderSubGrid(data, index))}
          </View>

          <Helpers />
          <Numpad />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1
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
    height: 357,
    width: 357,
    marginVertical: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});