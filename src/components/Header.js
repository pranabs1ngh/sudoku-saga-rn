import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper'

import { Context as TimerContext } from '../context/TimerContext'

const padTime = num => num < 10 ? `0${num}` : num;

export default props => {
  const { state, updateTimer, pauseTimer, stopTimer } = useContext(TimerContext);

  useEffect(() => {
    updateTimer();
  }, [])

  return (
    <View style={styles.menuBar}>
      <Button style={styles.back} onPress={() => props.goBack()}>
        <Feather name="arrow-left" size={25} color='#1A237E' />
      </Button>
      <View style={styles.timer}>
        <Ionicons name='ios-timer' size={25} color='#1A237E' />
        <Text style={styles.time}>
          {`${padTime(Math.floor(state / 60))}:${padTime(state % 60)}`}
        </Text>
      </View>
      {props.gameplay ?
        <Button
          onPress={() => { props.changeGameState(); pauseTimer() }}
          style={styles.pause}
        >
          <Ionicons name="ios-pause" size={25} color='#1A237E' />
        </Button> :
        <Button
          onPress={() => { props.changeGameState(); updateTimer() }}
          style={styles.pause}
        >
          <Ionicons name="ios-play" size={25} color='#1A237E' />
        </Button>}
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
    borderRadius: 50
  },
  timer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  time: {
    color: '#1A237E',
    fontSize: 20,
    fontFamily: 'Roboto',
    paddingHorizontal: 10,
    marginBottom: 5
  },
  pause: {
    alignSelf: 'center',
    borderRadius: 50
  }
});