import React from "react"
import { Text } from "react-native"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import { Feather } from "@expo/vector-icons"

import HomeScreen from "./screens/HomeScreen"
import GameScreen from "./screens/GameScreen"
import StatisticsScreen from "./screens/StatisticsScreen"

const tabConfig = {
  labelStyle: {
    fontSize: 15,
    color: 'white'
  }
};

const navigator = createSwitchNavigator({
  mainFlow: createMaterialBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: <Text style={tabConfig.labelStyle}>Home</Text>,
        tabBarIcon: ({ tintColor }) => {
          <Feather
            name="home"
            size={25}
            color={tintColor}
          />
        }
      }
    },
    Statistics: {
      screen: StatisticsScreen,
      navigationOptions: {
        tabBarLabel: <Text style={tabConfig.labelStyle}>Statistics</Text>,
        tabBarIcon: ({ tintColor }) => {
          <Feather
            name="bar-chart-2"
            size={25}
            color={tintColor}
          />
        }
      }
    }
  },
    {
      initialRouteName: "Home",
      order: ["Home", "Statistics"],
      barStyle: {
        backgroundColor: "#29b6f6",
        height: 70,
        justifyContent: "center"
      },
      shifting: true
    }),
  Game: GameScreen
});

export default createAppContainer(navigator);