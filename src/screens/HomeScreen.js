import React from 'react'
import { StyleSheet, StatusBar, View, Text } from 'react-native'
import * as Font from 'expo-font'

export default class HomeScreen extends React.Component {
  state = { fontLoaded: false }

  componentWillMount = async () => {
    await Font.loadAsync({ 'Comfortaa-bold': '../../assets/fonts/Comfortaa-Bold.ttf' });
    this.setState({ fontLoaded: true });
  }

  render = () => (
    <>
      <StatusBar />
      {this.state.fontLoaded ? (<View style={styles.container}>
        <Text>Home Screen</Text>
      </View>) : null}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#27baf7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Comfortaa-bold'
  }
})