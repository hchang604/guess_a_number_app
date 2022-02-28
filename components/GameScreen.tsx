import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Card } from "./Card";
import { BodyText } from "./BodyText";
import { MainButton } from "./MainButton";
import { Ionicons } from "@expo/vector-icons";
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
  const { userNumber, onGameOver } = props;

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
      <BodyText text="Opponent's Guess" />
      <NumberContainer number={currentGuess} />
      <Card style={styles.buttonContainer}>
        <MainButton
          buttonContent={<Ionicons name="md-add" size={24} color="white" />}
          onPressHandler={() => nextGuessHandler("GREATER")}
        />
        <MainButton
          buttonContent={<Ionicons name="md-remove" size={24} color="white" />}
          onPressHandler={() => nextGuessHandler("LOWER")}
        />
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
    justifyContent: "space-around",
    marginTop: 20,
    height: 150,
    maxHeight: "80%",
  },
});
