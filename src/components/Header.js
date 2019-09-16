import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper'

export default class Header extends Component {
  render = () => (
    <View style={styles.menuBar}>
      <Button style={styles.back} onPress={() => this.props.goBack()}>
        <Feather name="arrow-left" size={25} color='#1A237E' />
      </Button>
      <View style={styles.time}>
        <Ionicons name='ios-timer' size={25} color='#1A237E' />
        <Text style={{ color: '#1A237E', fontSize: 20, paddingHorizontal: 10 }}>
          {`5:53`}
        </Text>
      </View>
      <Button onPress={this.props.changeGameState} style={styles.pause}>
        {this.props.gameplay ? <Ionicons name="ios-play" size={25} color='#1A237E' /> :
          <Ionicons name="ios-pause" size={25} color='#1A237E' />}
      </Button>
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