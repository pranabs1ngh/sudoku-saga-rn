import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'

import { Context as TimerContext } from '../context/TimerContext'

const padTime = num => num < 10 ? `0${num}` : num

export default props => {
  const { state, setTimer, updateTimer, pauseTimer } = useContext(TimerContext)

  useEffect(() => {
    if (props.gameFinished) {
      pauseTimer()
      setTimeout(() => {
        props.navigation.navigate('Result', { level: props.level })
      }, 400)
    }
  }, [props.gameFinished])

  useEffect(() => {
    setTimer(0)
    pauseTimer()
  }, [props.isGameOver])

  useEffect(() => {
    setTimer(0)
    updateTimer()
    return pauseTimer
  }, [])

  return (
    <View style={styles.menuBar}>
      <TouchableOpacity style={styles.back} onPress={() => props.navigation.goBack()}>
        <Feather name="arrow-left" size={25} color='#1A237E' />
      </TouchableOpacity>
      <View style={styles.timer}>
        <Ionicons name='ios-timer' size={25} color='#1A237E' />
        <Text style={styles.time}>
          {`${padTime(Math.floor(state / 60))}:${padTime(state % 60)}`}
        </Text>
      </View>
      {props.gameplay ?
        <TouchableOpacity
          onPress={() => { props.changeGameState(); pauseTimer() }}
          style={styles.pause}
        >
          <Ionicons name="ios-pause" size={25} color='#1A237E' />
        </TouchableOpacity> :
        <TouchableOpacity
          onPress={() => { props.changeGameState(); updateTimer() }}
          style={styles.pause}
        >
          <Ionicons name="ios-play" size={25} color='#1A237E' />
        </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  menuBar: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  back: {
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  timer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  time: {
    color: '#1A237E',
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
    paddingHorizontal: 10,
    marginBottom: 5
  },
  pause: {
    alignSelf: 'center',
    paddingHorizontal: 20
  }
})