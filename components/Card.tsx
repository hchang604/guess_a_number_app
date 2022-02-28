import React from "react";
import { View, StyleSheet } from "react-native";

type CardProps = {
  style?: Object;
  children: JSX.Element | JSX.Element[];
};

export const Card = (props: CardProps) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
});
