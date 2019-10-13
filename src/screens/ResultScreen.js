import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View, Image, Animated, TouchableOpacity, BackHandler, AsyncStorage } from 'react-native'

import LevelsModal from '../components/LevelsModal'
import { Context as TimerContext } from '../context/TimerContext'

export default class ResultScreen extends Component {
  constructor(props) {
    super(props)

    this.bgScale = new Animated.Value(0.5)
    this.state = {
      level: props.navigation.state.params.level,
      newGame: false
    }
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress',
      () => this.props.navigation.navigate('Home'))

    Animated.spring(this.bgScale, {
      toValue: 1,
      friction: 1
    }).start()
  }

  componentWillUnmount = () => this.backHandler.remove()

  padTime = num => num < 10 ? `0${num}` : num

  render = () => (
    <>
      <StatusBar barStyle='dark-content' />
      <Image source={require('../../assets/result-bg-2.png')} style={styles.bg} resizeMode='cover' />
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Hurray!!</Text>
          <Text style={styles.message2}>YOU WIN</Text>
        </View>
        <Animated.Image
          source={require('../../assets/trophy.png')}
          style={{ ...styles.trophy, transform: [{ scale: this.bgScale }] }}
          resizeMode='contain'
        />
        <View style={styles.footer}>
          <Text style={styles.message}>{this.state.level}</Text>
          <TimerContext.Consumer>
            {({ state }) => <>
              <Text style={styles.message2}>
                {`${this.padTime(Math.floor(state / 60))}:${this.padTime(state % 60)}`}
              </Text>
              <TouchableOpacity style={styles.buttonFilled} onPress={() => this.setState({ newGame: true })}>
                <Text style={styles.buttonFilledText}>New Game</Text>
              </TouchableOpacity>
            </>}
          </TimerContext.Consumer>
        </View>

        <LevelsModal
          isVisible={this.state.newGame}
          setVisibility={() => this.setState({ newGame: false })}
          navigation={this.props.navigation}
        />
      </View>
    </>
  )
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