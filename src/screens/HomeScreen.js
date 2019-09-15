import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Text, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import { Context as FontContext } from "../context/FontContext";

const HomeScreen = ({ navigation }) => {
  const { state, loadFont } = useContext(FontContext);

  useEffect(() => {
    loadFont();
  })

  if (state.fontLoaded) {
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
          <TouchableOpacity style={styles.play}>
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
        </View>
      </>
    )
  } else return null;
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
    color: '#212121',
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

export default HomeScreen;