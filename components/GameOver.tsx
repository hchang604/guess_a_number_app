import React from "react";
import { View, Text, StyleSheet } from "react-native";

type GameOverProps = {};

export const GameOver = (props: GameOverProps) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over</Text>
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
