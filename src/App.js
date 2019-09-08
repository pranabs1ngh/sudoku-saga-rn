import React from "react"
import { Text } from "react-native"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import { Feather } from "@expo/vector-icons"

import HomeScreen from "./screens/HomeScreen"
import GameScreen from "./screens/GameScreen"
import StatisticsScreen from "./screens/StatisticsScreen"

const tabConfig = {
  iconStyle: {
    fontSize: 25
  },
  labelStyle: {
    fontSize: 15
  }
};

const navigator = createSwitchNavigator({
  mainFlow: createMaterialBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: <Text style={tabConfig.labelStyle}>Home</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Feather name="home" style={tabConfig.iconStyle} color={tintColor} />
        )
      }
    },
    Statistics: {
      screen: StatisticsScreen,
      navigationOptions: {
        tabBarLabel: <Text style={tabConfig.labelStyle}>Statistics</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Feather
            name="bar-chart"
            style={tabConfig.iconStyle}
            color={tintColor}
          />
        )
      }
    }
  },
    {
      initialRouteName: "Home",
      order: ["Home", "Statistics"],
      barStyle: {
        backgroundColor: "red",
        height: 70,
        justifyContent: "center"
      },
      shifting: true
    }),
  Game: GameScreen
});

export default createAppContainer(navigator);