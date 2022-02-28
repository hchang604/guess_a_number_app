import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

type GameOverProps = {
    rounds: number,
    userNumber: number
    onGameRestart: () => void;
};

export const GameOver = (props: GameOverProps) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over</Text>
      <Text>Number of rounds: {props.rounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
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
});
