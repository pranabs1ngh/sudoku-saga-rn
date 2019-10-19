import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View, Animated, TouchableOpacity, BackHandler, AsyncStorage } from 'react-native'

import LevelsModal from '../components/LevelsModal'

export default class ResultScreen extends Component {
  constructor(props) {
    super(props)

    AsyncStorage.removeItem('GAME')

    this.opacity = new Animated.Value(0)
    this.trophyScale = new Animated.Value(0.5)

    this.level = props.navigation.state.params.level
    this.time = props.navigation.state.params.time
    this.state = { newGame: false }
  }

  componentDidMount = () => {
    Animated.spring(this.trophyScale, {
      toValue: 1,
      friction: 1
    }).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 1000
        })
      ])
    ).start()

    this.backHandler = BackHandler.addEventListener('hardwareBackPress',
      () => this.props.navigation.navigate('Home'))
  }

  componentWillUnmount = () => this.backHandler.remove()

  padTime = num => num < 10 ? `0${num}` : num

  render = () => <>
    <StatusBar barStyle='dark-content' />
    <Animated.Image
      source={require('../../assets/result-bg.png')}
      style={{ ...styles.bg, opacity: this.opacity }}
      resizeMode='cover'
    />
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Hurray!!</Text>
        <Text style={styles.message2}>GAME FINISHED</Text>
      </View>
      <Animated.Image
        source={require('../../assets/trophy.png')}
        style={{ ...styles.trophy, transform: [{ scale: this.trophyScale }] }}
        resizeMode='contain'
      />
      <View style={styles.footer}>
        <Text style={styles.message}>{this.level}</Text>
        <Text style={styles.message2}>
          {`${this.padTime(Math.floor(this.time / 60))}:${this.padTime(this.time % 60)}`}
        </Text>
        <TouchableOpacity style={styles.buttonFilled} onPress={() => this.setState({ newGame: true })}>
          <Text style={styles.buttonFilledText}>New Game</Text>
        </TouchableOpacity>
      </View>

      <LevelsModal
        isVisible={this.state.newGame}
        setVisibility={() => this.setState({ newGame: false })}
        navigation={this.props.navigation}
      />
    </View>
  </>
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 30
  },
  messageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%'
  },
  message: {
    fontSize: 30,
    fontFamily: 'Quicksand',
  },
  message2: {
    marginVertical: 10,
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
  },
  trophy: {
    height: '50%',
    width: '100%'
  },
  footer: {
    flexGrow: 1,
    alignItems: 'center'
  },
  buttonFilled: {
    margin: 15,
    padding: 5,
    width: 200,
    height: 57,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1A237E',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonFilledText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  }
})