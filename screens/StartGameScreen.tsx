import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions
} from "react-native";
import { MainButton } from "../components/MainButton";
import { Card } from "../components/Card";
import Colors from "../constants/colors";
import { Input } from "../components/Input";
import { TitleText } from "../components/TitleText";
import { BodyText } from "../components/BodyText";
import { NumberContainer } from "../components/NumberContainer";

type StartGameScreenProps = {
  onStartGame: (value: number) => void;
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
        <TitleText text="Start a New Game" styles={styles.title} />
        <Card style={styles.inputContainer}>
          <BodyText text="Select a Number" />
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
        {confirmedInput && selectedNumber && (
          <NumberContainer
            number={selectedNumber}
            containerTitle="You Selected:"
            buttonElement={
              <MainButton
                buttonContent="START GAME"
                onPressHandler={() => props.onStartGame(selectedNumber)}
              />
            }
          />
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
    width: Dimensions.get('window').width / 4
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
});
