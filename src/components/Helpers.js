import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

export default class Helpers extends Component {
  state = { pencil: false }

  togglePencil = () => {
    this.state.pencil ?
      this.setState({ pencil: false }) :
      this.setState({ pencil: true })
    this.props.pencil()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state === nextState)
      return false
    else
      return true
  }

  render = () => (
    <View style={styles.container}>
      <TouchableOpacity onPress={this.props.undo}>
        <Ionicons name='ios-undo' size={30} />
        <Text style={styles.text}>Undo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.props.erase}>
        <MaterialCommunityIcons name='eraser' size={30} />
        <Text style={styles.text}>Erase</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.togglePencil}>
        {this.state.pencil ?
          <MaterialCommunityIcons name='pencil' size={30} /> :
          <MaterialCommunityIcons name='pencil-off' size={30} />
        }
        <Text style={styles.text}>Pencil</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.props.hint}>
        <MaterialCommunityIcons name='lightbulb-on-outline' size={30} />
        <Text style={styles.text}>Hint</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Quicksand-Medium'
  }
})