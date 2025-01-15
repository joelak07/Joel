import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function TransactionDot({
  record,
  transactionType,
  paymentMode,
  category,
  note,
  time,
  date,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Determine the background color based on transactionType
  const backgroundColor = transactionType === "Credit" ? "lightgreen" : "tomato"; // Green for credit, Red for debit

  return (
    <TouchableOpacity onPress={toggleDetails} style={[styles.container, { backgroundColor }]}>
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
            <Text style={styles.detailText}>Note: {note}</Text>
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
});
