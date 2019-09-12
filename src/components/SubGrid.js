import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Cell from './Cell'

export default class SubGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      grid: this.props.grid
    }
  }

  renderCells = (data, index) => <Cell data={data} key={index} id={index} />

  render() {
    return (
      <View style={styles.container}>
        {this.state.grid.map((data, index) => this.renderCells(data, index))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 3,
    borderRadius: 10,
    height: 113,
    width: 113,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#607D8B'
  }
})