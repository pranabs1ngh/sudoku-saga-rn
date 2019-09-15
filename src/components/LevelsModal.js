import React, { Component } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity, BackHandler } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default ({ ifVisible, setVisibility, navigation }) => {
  const levels = [
    { icon: '◦◦◦', level: 'Easy' },
    { icon: '●◦◦', level: 'Medium' },
    { icon: '●●◦', level: 'Hard' },
    { icon: '●●●', level: 'Expert' },
  ]

  return (
    <Modal
      animationType="slide"
      visible={ifVisible}
      transparent
    >
      <TouchableOpacity
        style={styles.outerArea}
        onPress={() => { setVisibility(!ifVisible) }}
      />

      <View style={styles.container}>
        <FlatList
          data={levels}
          keyExtractor={item => item.level}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: 'white' }}>
              <TouchableOpacity onPress={() => {
                setVisibility(!ifVisible)
                navigation.navigate('Game', { level: item.level })
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
    fontSize: 17
  }
})