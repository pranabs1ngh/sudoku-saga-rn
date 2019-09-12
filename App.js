import React from "react"
import { Text } from "react-native"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'

import { Provider as StoreProvider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './src/reducers'

import HomeScreen from "./src/screens/HomeScreen"
import GameScreen from "./src/screens/GameScreen"
import StatisticsScreen from "./src/screens/StatisticsScreen"

const tabConfig = {
  labelStyle: {
    fontSize: 15,
    color: 'white'
  }
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#283593',
    accent: '#283593',
  }
};

const store = createStore(reducers);

const navigator = createSwitchNavigator({
  // mainFlow: createMaterialBottomTabNavigator({
  //   Home: {
  //     screen: HomeScreen,
  //     navigationOptions: {
  //       tabBarLabel: <Text style={tabConfig.labelStyle}>Home</Text>,
  //       tabBarIcon: <Feather name="home" size={25} color='white' />
  //     }
  //   },
  //   Statistics: {
  //     screen: StatisticsScreen,
  //     navigationOptions: {
  //       tabBarLabel: <Text style={tabConfig.labelStyle}>Statistics</Text>,
  //       tabBarIcon: <Feather name="bar-chart-2" size={25} color='white' />
  //     }
  //   }
  // },
  //   {
  //     initialRouteName: "Home",
  //     order: ["Home", "Statistics"],
  //     barStyle: {
  //       backgroundColor: "#0b3a4c",
  //       height: 70,
  //       justifyContent: "center"
  //     },
  //     shifting: true
  //   }),
  Game: GameScreen
});

const App = createAppContainer(navigator);

export default () => (
  <PaperProvider theme={theme}>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </PaperProvider>
)