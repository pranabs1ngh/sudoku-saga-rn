import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

export default class Cell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      col: props.data.col,
      row: props.data.col,
      num: props.data.num,
      unum: props.data.unum,
    }
  }

  renderPencil = () => {
    for (let i = 1; i <= 9; i++)
      return <Text key={`i`} style={styles.pencil} >{`i`}</Text>
  }

  render() {
    let style = {};
    if (this.props.id < 3) style.marginBottom = 1;
    if (this.props.id % 3 === 0) style.marginRight = 1;
    if (this.props.id % 3 === 2) style.marginLeft = 1;
    if (this.props.id >= 6) style.marginTop = 1;

    return (
      <TouchableWithoutFeedback>
        <View style={{ ...styles.container, ...style }}>
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
    backgroundColor: '#ECEFF1',
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