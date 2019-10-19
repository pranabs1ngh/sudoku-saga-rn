import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View } from 'react-native'

export default class StatisticsScreen extends Component {
  render = () => <>
    <StatusBar barStyle='dark-content' backgroundColor='#34515e' />
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontFamily: 'Quicksand-Medium' }}>
        Statistics Screen
      </Text>
      <Text style={{ fontFamily: 'Quicksand-Medium' }}>Still in development</Text>
    </View>
  </>
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
