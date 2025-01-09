import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} /> 
      <Text style={styles.text}>Joel</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
    backgroundColor: "#000B58",
    marginTop: 0, 
    paddingTop: 0, 
    paddingBottom: 0, 
    paddingLeft: 0,
    paddingRight: 0,
  },
  text: {
    fontSize: 40,
    color: "#FFF4B7", 
  },
});
