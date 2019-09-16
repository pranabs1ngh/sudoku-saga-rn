import React, { Component } from "react"
import { StyleSheet, StatusBar, View, Text, TouchableOpacity } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import * as Font from 'expo-font'

import LevelsModal from '../components/LevelsModal'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = { modalVisibility: false, fontLoaded: false }
  }

  componentWillMount = async () => {
    await Font.loadAsync({
      'Cocogoose': require('../../assets/fonts/Cocogoose.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render = () => {
    if (this.state.fontLoaded) {
      return (
        <>
          <StatusBar barStyle='dark-content' />
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity>
                <Ionicons name='md-settings' size={20} color='#3949AB' />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>SUDOKU</Text>
              <Text style={styles.title}>SAGA</Text>
            </View>
            <TouchableOpacity style={styles.play} onPress={() => this.setState({ modalVisibility: true })} >
              <Feather name='play-circle' size={130} color='#1A237E' />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.buttonOutlined}>
            <Text style={styles.buttonText}>CONTINUE GAME</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Ionicons name='ios-timer' size={15} color='#90A4AE' />
              <Text style={styles.subText}> 05:36 - Expert</Text>
            </View>
          </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttonFilled}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Ionicons name='md-calendar' size={30} color='white' />
                <Text style={styles.buttonFilledText}>  Today's Challenge</Text>
              </View>
            </TouchableOpacity>
            <LevelsModal
              isVisible={this.state.modalVisibility}
              setVisibility={() => this.setState({ modalVisibility: false })}
              navigation={this.props.navigation} />
          </View>
        </>
      )
    } else return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignContent: 'center'
  },
  header: {
    padding: 25,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: 'Cocogoose',
    fontSize: 50,
    color: '#1A237E'
  },
  play: {
    margin: '10%',
    alignSelf: 'center'
  },
  buttonOutlined: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#1A237E',
    borderRadius: 10,
    width: 220,
    height: 57,
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: '#1A237E',
    fontFamily: 'Roboto'
  },
  subText: {
    color: '#90A4AE',
    fontFamily: 'Roboto'
  },
  buttonFilled: {
    margin: 15,
    padding: 5,
    width: 220,
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
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  }
});