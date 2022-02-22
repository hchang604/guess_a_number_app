import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from '../constants/colors'

type HeaderProps = {
  title: string;
};

export const Header = (props: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 90,
    paddingTop: 35,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
      color: 'black',
      fontSize: 18,
  },
});
