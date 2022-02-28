import React from "react";
import Colors from "../constants/colors";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type MainButtonProps = {
  buttonContent: string | JSX.Element;
  onPressHandler: (parameter?: any) => void;
};

export const MainButton = (props: MainButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPressHandler}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.buttonContent}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: 'center'
  },
});
