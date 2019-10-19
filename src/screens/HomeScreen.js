import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

import LevelsModal from "../components/LevelsModal";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      modalVisibility: false,
      game: null
    };
  }

  loadGame = async () => {
    const game = await AsyncStorage.getItem("GAME");
    this.setState({ game: JSON.parse(game) });
  };

  componentWillMount = async () => {
    await Font.loadAsync({
      Cocogoose: require("../../assets/fonts/Cocogoose.ttf"),
      Quicksand: require("../../assets/fonts/Quicksand.ttf"),
      "Quicksand-Medium": require("../../assets/fonts/Quicksand-Medium.ttf"),
      "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
    this.loadGame();
    this.focusListener = this.props.navigation.addListener("didFocus", () =>
      this.loadGame()
    );
  };

  componentWillUnmount = () => this.focusListener.remove();

  render = () => {
    if (this.state.fontLoaded) {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="md-settings" size={25} color="#3949AB" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>SUDOKU</Text>
              <Text style={styles.title}>SAGA</Text>
            </View>
            <TouchableOpacity
              style={styles.play}
              onPress={() => this.setState({ modalVisibility: true })}
            >
              <Feather name="play-circle" size={130} color="#1A237E" />
            </TouchableOpacity>
            {this.state.game && (
              <TouchableOpacity
                style={styles.buttonOutlined}
                onPress={() =>
                  this.props.navigation.navigate("Game", {
                    level: this.state.game.level,
                    board: this.state.game.board,
                    time: this.state.game.time
                  })
                }
              >
                <Ionicons
                  name="ios-timer"
                  size={30}
                  color="#1A237E"
                  style={{ textAlignVertical: "center" }}
                />
                <Text style={styles.buttonText}> CONTINUE GAME</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.buttonFilled}>
              <Ionicons name="md-calendar" size={30} color="white" />
              <Text style={styles.buttonFilledText}> Today's Challenge</Text>
            </TouchableOpacity>
            <LevelsModal
              isVisible={this.state.modalVisibility}
              setVisibility={() => this.setState({ modalVisibility: false })}
              navigation={this.props.navigation}
            />
          </View>
        </>
      );
    } else return null;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  header: {
    marginTop: 25,
    padding: 25,
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: "Cocogoose",
    fontSize: 55,
    color: "#1A237E"
  },
  play: {
    margin: "10%",
    alignSelf: "center"
  },
  buttonOutlined: {
    width: 240,
    height: 57,
    borderWidth: 2,
    borderColor: "#1A237E",
    borderRadius: 10,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
    color: "#1A237E",
    paddingBottom: 5
  },
  subText: {
    color: "#90A4AE",
    fontFamily: "Roboto"
  },
  buttonFilled: {
    width: 240,
    height: 57,
    margin: 15,
    borderRadius: 10,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#1A237E",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonFilledText: {
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
    color: "white",
    paddingBottom: 5
  }
});
