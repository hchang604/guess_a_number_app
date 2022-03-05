import React from "react";
import { TitleText } from "../components/TitleText";
import Colors from "../constants/colors";
import { MainButton } from "../components/MainButton";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

type GameOverProps = {
  rounds: number;
  userNumber: number;
  onGameRestart: () => void;
};

export const GameOver = (props: GameOverProps) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText text="The Game is Over" />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/success.png")}
          />
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.rounds}</Text> attempts to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </Text>
        </View>
        <MainButton
          buttonContent="New Game"
          onPressHandler={() => props.onGameRestart()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: Dimensions.get("window").height / 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 35,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryContainer: {
    marginBottom: 15,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
    textAlign: "center",
  },
  highlight: {
    color: Colors.primary,
  },
});
