import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons"; // Import from expo/vector-icons

interface TransactionDotProps {
  record: number;
  transactionType: string;
  paymentMode: string;
  category: string;
  note: string;
  time: string;
  date: string;
}

export default function TransactionDot({
  record,
  transactionType,
  paymentMode,
  category,
  note,
  time,
  date,
}: TransactionDotProps) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Retrieve all records from AsyncStorage
              const records = await AsyncStorage.getItem("records");
              const parsedRecords = records ? JSON.parse(records) : [];
  
              // Filter out the record matching the current date and time
              const updatedRecords = parsedRecords.filter(
                (record) => !(record.date === date && record.time === time)
              );
  
              // Save the updated records back to AsyncStorage
              await AsyncStorage.setItem("records", JSON.stringify(updatedRecords));
  
              console.log("Transaction deleted successfully");
            } catch (error) {
              console.error("Error deleting transaction:", error);
            }
          },
        },
      ]
    );
  };

  const backgroundColor =
    transactionType === "Credit" ? "lightgreen" : "tomato"; // Green for credit, Red for debit

  return (
    <TouchableOpacity
      onPress={toggleDetails}
      style={[styles.container, { backgroundColor }]}
    >
      <View>
        <Text style={styles.amount}>₹{record}</Text>
        {showDetails && (
          <View style={styles.onpress}>
            <View style={styles.format}>
              <View style={styles.content}>
                <Text style={styles.detailText}>{paymentMode}</Text>
                <Text style={styles.detailText}>{category}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.detailText}>Time: {time}</Text>
                <Text style={styles.detailText}>Date: {date}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.detailText}>Note: {note}</Text>
              <TouchableOpacity onPress={handleDelete}>
                <MaterialIcons name="delete" size={24} color="gray"/>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    marginVertical: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  amount: {
    fontSize: 18,
    color: "#333",
    textAlign: "left",
    marginVertical: 5,
  },
  onpress: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 2,
  },
  format: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    width: "50%",
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginRight: 1,
  },
});
