import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";

type HeaderProps = {
  title: string;
};

export const Header = (props: HeaderProps) => {
  return (
    <View
      style={[
        styles.headerContainerBase,
        Platform.select({
          ios: styles.headerContainerIOS,
          android: styles.headerContainerAndroid
        })
      ]}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerBase: {
    width: "100%",
    height: 90,
    paddingTop: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerContainerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent",
  },
  headerTitle: {
    color: Platform.OS === "ios" ? Colors.primary : "white",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});
