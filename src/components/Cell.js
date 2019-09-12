import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

export default class Cell extends Component {
  constructor(props) {
    super(props)

    this.col = props.data.col
    this.row = props.data.row

    this.bgcolor = '#ECEFF1';
    this.state = {
      num: props.data.num,
      unum: props.data.unum
    }
  }

  renderPencil = () => {
    for (let i = 1; i <= 9; i++)
      return <Text key={`i`} style={styles.pencil} >{`i`}</Text>
  }

  handleSelect = () => {
    this.props.selectCell({
      col: this.col,
      row: this.row,
      id: this.props.boxid,
      num: this.state.num
    })
  }

  componentDidUpdate = () => {
    const selectedCell = this.props.selectedCell;
    let bgcolor = '#ECEFF1';

    if (selectedCell.row === this.row && selectedCell.col === this.col)
      bgcolor = '#C5CAE9'
    else if (selectedCell.row === this.row || selectedCell.col === this.col || selectedCell.id === this.props.boxid)
      bgcolor = '#CFD8DC'

    this.bgcolor = bgcolor;
  }

  render() {
    let style = {};
    if (this.props.id < 3) style.marginBottom = 1;
    if (this.props.id % 3 === 0) style.marginRight = 1;
    if (this.props.id % 3 === 2) style.marginLeft = 1;
    if (this.props.id >= 6) style.marginTop = 1;

    return (
      <TouchableWithoutFeedback onPress={this.handleSelect}>
        <View style={{ ...styles.container, ...style, backgroundColor: this.bgcolor }}>
          <Text style={styles.num}>{this.state.num}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 37,
    width: 37,
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pencils: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  pencil: {
    color: '#B0BEC5',
    padding: 2,
    fontSize: 5
  },
  num: {
    fontSize: 20,
    padding: 5,
    color: 'black'
  }
});