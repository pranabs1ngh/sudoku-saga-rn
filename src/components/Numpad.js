import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

export default class Numpad extends Component {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  shouldComponentUpdate = () => false

  renderButton = num => (
    <TouchableHighlight
      style={styles.numBtn}
      onPress={() => this.props.handleTouch(num, true)}
      key={num}
    >
      <Text style={{ color: "white", fontSize: 25, paddingTop: 5 }}>
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
    backgroundColor: "#1A237E",
    alignItems: "center"
  }
})