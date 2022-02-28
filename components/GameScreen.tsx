import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import Colors from "../constants/colors";
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
  onGameOver: (pastGuesses: number[]) => void;
};

export const GameScreen = (props: GameScreenProps) => {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, updatePastGuesses] = useState<number[]>([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userNumber, onGameOver } = props;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (currentGuess === props.userNumber) {
      props.onGameOver(pastGuesses);
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
    updatePastGuesses([...pastGuesses, nextNumber]);
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
      <ScrollView
        style={styles.list}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current &&
            scrollViewRef.current.scrollToEnd({ animated: true });
        }}
      >
        {pastGuesses.map((guess, index) => {
          return (
            <View style={styles.listItem} key={index}>
              <BodyText text={`Round ${index + 1} `} styles={styles.listText} />
              <BodyText text={`${guess}`} styles={styles.listText} />
            </View>
          );
        })}
      </ScrollView>
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
    marginVertical: 10,
    height: 150,
    maxHeight: "80%",
  },
  list: {
    width: "80%",
    height: "100%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: Colors.secondary,
    borderWidth: 1,
    padding: 15,
    marginVertical: 5,
  },
  listText: {
    textAlign: "center",
  },
});
