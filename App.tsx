import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Alert } from "react-native";
import { Header } from "./components/Header";
import { GameScreen } from "./components/GameScreen";
import { StartGameScreen } from "./screens/StartGameScreen";
import { GameOver } from "./components/GameOver";

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState<number | undefined>();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => Alert.alert("Error", "Unable to fetch assets, please relaunch app.", [{ text: "Okay", style: "cancel" }])}
      />
    );
  }

  const configureNewGameHandler = () => {
    setUserNumber(undefined);
    setGuessRounds(0);
  };

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (roundsPlayed: number) => {
    setGuessRounds(roundsPlayed);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 1 && userNumber) {
    content = (
      <GameOver
        rounds={guessRounds}
        userNumber={userNumber}
        onGameRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
