import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { init, loadSudoku } from '../models/sudoku'

export default ({ isVisible, newGame, setVisibility, navigation }) => {
  const levels = [
    { icon: '◼◻◻', level: 'Easy' },
    { icon: '◼◼◻', level: 'Medium' },
    { icon: '◼◼◼', level: 'Hard' },
  ]

  useEffect(() => {
    init()
  }, [])

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      transparent
    >
      <TouchableOpacity
        style={styles.outerArea}
        onPress={setVisibility}
      />

      <View style={styles.container}>
        <FlatList
          data={levels}
          keyExtractor={item => item.level}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: 'white' }}>
              <TouchableOpacity onPress={() => {
                setVisibility()
                const board = loadSudoku(item.level)
                if (newGame) newGame(item.level, board)
                else navigation.navigate('Game', { level: item.level, board, hint: 0, error: 0 })
              }}>
                <View style={styles.item}>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text style={styles.text}>{item.level}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  outerArea: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    opacity: 0.4
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  icon: {
    fontSize: 15,
    width: 40
  },
  text: {
    fontSize: 17,
    fontFamily: 'Quicksand-Medium'
  }
})