import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.expen}>Expenses</Text>
        <View style={styles.total}>
          <Text style={styles.totalText} onPress={() => console.log("Text Pressed")}>
            Rs 53183
          </Text>
        </View>
      </View>
      <View style={styles.balance}>
          <Text style={styles.baltext}>Balance</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // Set background color
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 42.5,
  },
  total: {
    backgroundColor: "#FFF4B7",
    padding:10,
    borderRadius: 10,
    width: 150,
  },
  totalText: {
    fontSize: 20,
    color: "#000B58",
    fontWeight: "bold",
    textAlign:"center",
  },
  expen: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFF4B7",
    width: 150,
  },
  balance:{
    
  },
  baltext:{
    fontSize:20,
    marginTop:15,
    color: "white",
  },
});
