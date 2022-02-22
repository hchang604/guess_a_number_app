import React from "react";
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";

type InputProps = {
  style?: Object;
  blurOnSubmit?: boolean | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  onChangeText: (input: string) => void;
  value: string
};

export const Input = (props: InputProps) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
