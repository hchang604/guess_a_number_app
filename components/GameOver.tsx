import React from "react";
import { TitleText } from "./TitleText";
import Colors from "../constants/colors";
import { MainButton } from "./MainButton";
import { View, StyleSheet, Text, Image } from "react-native";

type GameOverProps = {
  rounds: number;
  userNumber: number;
  onGameRestart: () => void;
};

export const GameOver = (props: GameOverProps) => {
  return (
    <View style={styles.screen}>
      <TitleText text="The Game is Over" />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/success.png")} />
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{props.rounds}</Text>{" "}
          attempts to guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </Text>
      </View>
      <MainButton
        buttonText="New Game"
        onPressHandler={() => props.onGameRestart()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryContainer: {
    marginBottom: 15,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  highlight: {
    color: Colors.primary,
  },
});
