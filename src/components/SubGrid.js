import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Cell from './Cell'

export default class SubGrid extends Component {
  constructor(props) {
    super(props)

    this.grid = this.props.grid
  }

  renderCell = (data, index) => (
    <Cell
      data={data}
      id={index}
      boxid={this.props.id}
      selectCell={this.props.selectCell}
      selectedCell={this.props.selectedCell}
      key={index}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        {this.grid.map((data, index) => this.renderCell(data, index))}
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