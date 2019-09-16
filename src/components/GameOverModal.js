import React from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native'

export default ({ isVisible, startNewGame, setVisibility, goBack }) => {
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent
    >
      <View style={styles.outerArea}></View>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>GAME OVER</Text>
          <Text style={{ fontFamily: 'Roboto', fontSize: 20 }}>
            You have commited 3 errors and lost this game.
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={startNewGame}>
              <Text style={styles.button}>NEW GAME</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={setVisibility, goBack}>
              <Text style={styles.button}>HOME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  outerArea: {
    backgroundColor: '#212121',
    opacity: 0.4,
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    width: 300,
    height: 160,
    borderRadius: 15,
    padding: 20
  },
  heading: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  button: {
    paddingTop: 15,
    color: '#1A237E',
    fontSize: 17,
  }
})