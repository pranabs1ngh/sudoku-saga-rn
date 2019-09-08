import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'

export default class GameScreen extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' backgroundColor='#34515e' />
        <View style={{ padding: 20 }}>
          <Text>Game Screen</Text>
        </View>
      </>
    )
  }
}
