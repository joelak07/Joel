import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TransactionDot from "./TransactionDot";

export default function Transactions() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordsJSON = await AsyncStorage.getItem("records");
        if (recordsJSON) {
          setRecords(JSON.parse(recordsJSON)); // Parse the JSON string
        } else {
          setRecords([]); // No records found
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Transactions</Text>
      </View>
      <ScrollView>
        {records.map((record, index) => (
          <TransactionDot key={index} {...record} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Dark gray
    textAlign: "left",
    marginVertical: 20,
  },
});
