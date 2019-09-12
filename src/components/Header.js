import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper'

export default class Header extends Component {
  constructor(props) { super(props) }

  render = () => (
    <View style={styles.menuBar}>
      <Button style={styles.back}>
        <Feather name="arrow-left" size={25} color='white' />
      </Button>
      <View style={styles.time}>
        <Ionicons name='ios-timer' size={25} color='white' />
        <Text style={{ color: 'white', fontSize: 20, paddingHorizontal: 10 }}>
          {`5:53`}
        </Text>
      </View>
      <Button onPress={this.props.changeGameState} style={styles.pause}>
        {this.props.gameplay ? <Ionicons name="ios-play" size={25} color='white' /> :
          <Ionicons name="ios-pause" size={25} color='white' />}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  menuBar: {
    height: 60,
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  back: {
    alignSelf: 'center',
    borderRadius: 50
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  pause: {
    alignSelf: 'center',
    borderRadius: 50
  }
});