import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Card } from "./Card";
import Colors from "../constants/colors";

type NumberContainerProps = {
  number: number;
};

export const NumberContainer = (props: NumberContainerProps) => {
  return (
    <Card style={styles.cardContainer}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{props.number}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
