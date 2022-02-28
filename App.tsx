import React, {useState} from 'react'
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Header } from "./components/Header";
import { GameScreen } from "./components/GameScreen";
import { StartGameScreen } from "./screens/StartGameScreen";
import { GameOver } from './components/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState<number | undefined>()
  const [guessRounds, setGuessRounds] = useState(0)

  const configureNewGameHandler = () => {
    setUserNumber(undefined)
    setGuessRounds(0)
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0)
  }

  const gameOverHandler = (roundsPlayed: number) => {
    setGuessRounds(roundsPlayed)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 1 && userNumber) {
    content = <GameOver rounds={guessRounds} userNumber={userNumber} onGameRestart={configureNewGameHandler} />
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
