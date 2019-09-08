import React from 'react'
import { StyleSheet, StatusBar, View, Text } from 'react-native'

const HomeScreen = () => {
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#34515e' />
      <View style={{ padding: 20 }}>
        <Text>Home Screen</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({

})

export default HomeScreen
