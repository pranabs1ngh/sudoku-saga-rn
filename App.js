import React from "react";
import { Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import ResultScreen from "./src/screens/ResultScreen";
import StatisticsScreen from "./src/screens/StatisticsScreen";

import { Provider as TimerProvider } from "./src/context/TimerContext";

const styles = {
  labelStyle: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#1A237E"
  }
};

const navigator = createSwitchNavigator({
  GameFlow: createStackNavigator(
    {
      MainFlow: createMaterialBottomTabNavigator(
        {
          Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarLabel: <Text style={styles.labelStyle}>Home</Text>,
              tabBarIcon: <Feather name="home" size={25} color="#1A237E" />
            }
          },
          Statistics: {
            screen: StatisticsScreen,
            navigationOptions: {
              tabBarLabel: <Text style={styles.labelStyle}>Statistics</Text>,
              tabBarIcon: (
                <Feather name="bar-chart-2" size={25} color="#1A237E" />
              )
            }
          }
        },
        {
          initialRouteName: "Home",
          order: ["Home", "Statistics"],
          barStyle: {
            backgroundColor: "white",
            height: 70,
            justifyContent: "center"
          },
          shifting: true
        }
      ),
      Game: GameScreen
    },
    {
      initialRouteName: "MainFlow",
      headerMode: "none"
    }
  ),
  Result: ResultScreen
});

const App = createAppContainer(navigator);

export default () => (
  <TimerProvider>
    <App />
  </TimerProvider>
);
