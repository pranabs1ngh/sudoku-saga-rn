import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native'

export default class Numpad extends Component {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  handleTouch = () => {

  }

  renderButton = num => (
    <TouchableHighlight
      style={styles.numBtn}
      onPressIn={this.handleTouch}
      onPressOut={this.handleTouch}
      key={num}
    >
      <Text style={{ color: "white", fontSize: 25 }}>
        {num}
      </Text>
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
    width: 350,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  numBtn: {
    width: 35,
    height: 60,
    marginHorizontal: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#283593",
    alignItems: "center"
  }
})