import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'

import { Context as TimerContext } from '../context/TimerContext'

const padTime = num => num < 10 ? `0${num}` : num

export default ({ time, goBack, saveGame, gameplay, changeGameState, isGameOver, gameFinished, renderResult }) => {
  const { state, setTimer, updateTimer, pauseTimer, stopTimer } = useContext(TimerContext)

  useEffect(() => {
    if (gameFinished) {
      pauseTimer()
      setTimeout(() => {
        renderResult(state)
        stopTimer()
      }, 400)
    }
  }, [gameFinished])

  useEffect(() => {
    if (isGameOver) pauseTimer()
  }, [isGameOver])

  useEffect(() => {
    saveGame(state)
  }, [state])

  useEffect(() => {
    if (time) setTimer(time)
    updateTimer()
    return () => pauseTimer()
  }, [])

  return (
    <View style={styles.menuBar}>
      <TouchableOpacity style={styles.back} onPress={() => goBack()}>
        <Feather name="arrow-left" size={25} color='#1A237E' />
      </TouchableOpacity>
      <View style={styles.timer}>
        <Ionicons name='ios-timer' size={25} color='#1A237E' style={{ textAlignVertical: 'center' }} />
        <Text style={styles.time}>
          {`${padTime(Math.floor(state / 60))}:${padTime(state % 60)}`}
        </Text>
      </View>
      {gameplay ?
        <TouchableOpacity
          onPress={() => { changeGameState(); pauseTimer() }}
          style={styles.pause}
        >
          <Ionicons name="ios-pause" size={25} color='#1A237E' />
        </TouchableOpacity> :
        <TouchableOpacity
          onPress={() => { changeGameState(); updateTimer() }}
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
    width: 80,
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