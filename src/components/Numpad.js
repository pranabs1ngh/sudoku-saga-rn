import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

export default class Numpad extends Component {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  shouldComponentUpdate = () => false

  renderButton = num => (
    <TouchableHighlight
      style={styles.numBtn}
      onPress={() => this.props.handleTouch(num)}
      key={num}
    >
      <Text style={styles.num}>{num}</Text>
    </TouchableHighlight>
  )

  render = () => (
    <View style={styles.numpad}>
      {this.numbers.map(num => this.renderButton(num))}
    </View>
  )
}

const styles = StyleSheet.create({
  numpad: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  numBtn: {
    width: '10%',
    height: 65,
    marginHorizontal: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#1A237E',
    alignItems: 'center'
  },
  num: {
    paddingTop: 5,
    color: "white",
    fontSize: 25,
    fontFamily: 'Quicksand-Medium'
  }
})