import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PieChart from "react-native-pie-chart";

export default function Home() {
  const widthAndHeight = 250;
  const data = [
    { value: 430, color: "#fbd203", label: { text: "A", fontWeight: "bold" } },
    { value: 50, color: "#ffb300", label: { text: "A", fontWeight: "bold" } },
    { value: 185, color: "#ff9100", label: { text: "A", fontWeight: "bold" } },
    { value: 123, color: "#ff6c00", label: { text: "A", fontWeight: "bold" } },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.expen}>Expenses</Text>
        <View style={styles.total}>
          <Text
            style={styles.totalText}
            onPress={() => console.log("Text Pressed")}
          >
            Rs 53183
          </Text>
        </View>
      </View>
      <Text style={styles.baltext}>Balance</Text>
      <View style={styles.balance}>
        <Text style={styles.upi}>Rs 53183</Text>
        <Text style={styles.cash}>Rs 53183</Text>
      </View>
      <View style={styles.piechart}>
        <PieChart widthAndHeight={widthAndHeight} series={data} />
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>console.log("Button Pressed")}>
        <Text style={styles.buttonText}>Add New Record</Text>
      </TouchableOpacity>
      <Text style={styles.transactions}>Transactions</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e2e", 
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
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  totalText: {
    fontSize: 20,
    color: "#000B58",
    fontWeight: "bold",
    textAlign: "center",
  },
  expen: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFF4B7",
    width: 150,
  },
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  upi: {
    backgroundColor: "#FFF4B7",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  cash: {
    backgroundColor: "#FFF4B7",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    textAlign: "center",
  },
  baltext: {
    fontSize: 15,
    marginTop: 20,
    color: "white",
  },
  piechart: {
    backgroundColor: "rgb(53, 51, 51)",
    padding: 15,
    paddingTop: 25,
    borderRadius: 10,
    width: "100%",
    height: 300,
    marginTop: 20,
    alignItems: "center",
  },
  button:{
    backgroundColor: "#FFF4B7",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  buttonText:{
    fontSize: 20,
  },
  transactions:{
    color: "white",
    fontSize: 15,
    marginTop: 15,
  },
});
