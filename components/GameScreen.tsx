import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card } from "./Card";
import Colors from "../constants/colors";
import { NumberContainer } from "./NumberContainer";

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return randomNumber;
};

type GameScreenProps = {
  userNumber: number;
  onGameOver: (rounds: number) => void;
};

export const GameScreen = (props: GameScreenProps) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userNumber)
  );
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {userNumber, onGameOver} = props

  useEffect(() => {
    if (currentGuess === props.userNumber) {
      props.onGameOver(rounds);
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction: "LOWER" | "GREATER") => {
    if (
      (direction === "LOWER" && currentGuess < props.userNumber) ||
      (direction === "GREATER" && currentGuess > props.userNumber)
    ) {
      Alert.alert("Don't Lie!", "You know that this is the wrong hint...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "LOWER") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(rounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer number={currentGuess} />
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("LOWER")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("GREATER")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
