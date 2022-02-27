import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Card } from "../components/Card";
import Colors from "../constants/colors";
import { Input } from "../components/Input";
import { NumberContainer } from "../components/NumberContainer";

// type ConfirmedInputViewProps = {
//   confirmedInput: number;
// };

// const ConfirmedInputView = (props: ConfirmedInputViewProps) => {
//   return (
//     <Card style={styles.confirmedInputContainer}>
//       <Text>You Selected</Text>

//     </Card>
//   );
// };

type StartGameScreenProps = {
  onStartGame: (value: number) => void
};

export const StartGameScreen = (props: StartGameScreenProps) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmedInput, setConfirmedInput] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); // replace any character that is not 0 - 9 with empy string
  };

  const resetInputHandler = () => {
    setConfirmedInput(false);
    setEnteredValue("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue, 10);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Input",
        "Input has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    setConfirmedInput(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {/* {confirmedInput && <NumberContainer onStartGame={props.onStartGame} number={selectedNumber!} />} */}
        {(confirmedInput && selectedNumber) && (
          <Card style={styles.cardContainer}>
          <Text>You Selected</Text>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{selectedNumber}</Text>
          </View>
          <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
        </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 80,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  cardContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  numberContainer: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.secondary,
    fontSize: 22,
  },
});
