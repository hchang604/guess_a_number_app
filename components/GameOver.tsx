import React from "react";
import { BodyText } from "./BodyText";
import { TitleText } from "./TitleText";
import { View, StyleSheet, Button, Image } from "react-native";

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
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
        />
      </View>
      <BodyText text={`Number of rounds: ${props.rounds}`} />
      <BodyText text={`Number was: ${props.userNumber}`} />
      <Button title="New Game" onPress={props.onGameRestart} />
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
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  },
});
