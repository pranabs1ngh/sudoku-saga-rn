import React from "react"
import { Text } from "react-native"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'

import { Provider as FontProvider } from "./src/context/FontContext";

import HomeScreen from "./src/screens/HomeScreen"
import GameScreen from "./src/screens/GameScreen"
import StatisticsScreen from "./src/screens/StatisticsScreen"

const tabConfig = {
  labelStyle: {
    fontSize: 15,
    color: '#1A237E'
  }
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#212121',
    accent: '#283593',
  }
};

const navigator = createStackNavigator(
  {
    mainFlow: createMaterialBottomTabNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: <Text style={tabConfig.labelStyle}>Home</Text>,
          tabBarIcon: <Feather name="home" size={25} color='#1A237E' />
        }
      },
      Statistics: {
        screen: StatisticsScreen,
        navigationOptions: {
          tabBarLabel: <Text style={tabConfig.labelStyle}>Statistics</Text>,
          tabBarIcon: <Feather name="bar-chart-2" size={25} color='#1A237E' />
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
      }),
    Game: GameScreen
  },
  {
    initialRouteName: 'mainFlow',
    headerMode: 'none'
  }
);

const App = createAppContainer(navigator);

export default () => (
  <PaperProvider theme={theme}>
    <FontProvider>
      <App />
    </FontProvider>
  </PaperProvider>
)