import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Card } from "./Card";
import { BodyText } from "./BodyText";
import Colors from "../constants/colors";

type NumberContainerProps = {
  number: number;
  containerTitle?: string;
  buttonElement?: JSX.Element;
};

export const NumberContainer = (props: NumberContainerProps) => {
  let containerTitle = <></>
  let containerButton = <></>

  if(props.containerTitle) {
    containerTitle = <BodyText text={props.containerTitle} />
  }

  if(props.buttonElement) {
    containerButton = props.buttonElement;
  }

  return (
    <Card style={styles.cardContainer}>
      {containerTitle}
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{props.number}</Text>
      </View>
      {containerButton}
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
