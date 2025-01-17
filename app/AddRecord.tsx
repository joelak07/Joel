import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function AddRecord() {
  const [record, setRecord] = useState("");
  const [selectedTrans, setSelectedTrans] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("categories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        const defaultCategories = [
          "Food",
          "Utilities",
          "Grocery",
          "Recharge",
          "Fees",
        ];
        await AsyncStorage.setItem(
          "categories",
          JSON.stringify(defaultCategories)
        );
        setCategories(defaultCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleChange = (text) => {
    setRecord(text);
  };

  const handleNoteChange = (text) => {
    setNote(text);
  };

  const handleTransButtonClick = (type) => {
    setSelectedTrans(type);
  };

  const handleModeButtonClick = (mode) => {
    setSelectedMode(mode);
  };

  const getFirstRecord = async () => {
    try {
      const recordsJSON = await AsyncStorage.getItem("records"); // Retrieve stored data
      if (recordsJSON) {
        const records = JSON.parse(recordsJSON); // Parse the JSON string into an array
        if (records.length > 0) {
          console.log(records[0]); // Log the first record
        } else {
          console.log("No records available.");
        }
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error retrieving records from AsyncStorage:", error);
    }
  };

  const handleSubmit = async () => {
    if (!record || !selectedTrans || !selectedMode) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const data = {
      record,
      transactionType: selectedTrans,
      paymentMode: selectedMode,
      category,
      note,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      }),
    };

    try {
      const existingRecords = await AsyncStorage.getItem("records");
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      records.push(data);

      await AsyncStorage.setItem("records", JSON.stringify(records));
      Alert.alert("Success", "Record saved successfully!");

      const expense = await AsyncStorage.getItem("expense");
      const totalExpense = expense ? JSON.parse(expense) : 0;
      const newExpense = selectedTrans === "Debit" ? totalExpense + parseInt(record) : totalExpense;
      await AsyncStorage.setItem("expense", JSON.stringify(newExpense));

      setRecord("");
      setSelectedTrans(null);
      setSelectedMode(null);
      setCategory("Food");
      setNote("");
      console.log(records);
    } catch (error) {
      Alert.alert("Error", "Failed to save the record.");
      console.error(error);
    }
  };

  return (
    <View
      style={[styles.container, { height: keyboardVisible ? "90%" : "90%" }]}
    >
      <Text style={styles.addrectext}>Add Record</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter record details"
        placeholderTextColor="#aaa"
        value={record}
        onChangeText={handleChange}
        keyboardType="numeric"
      />

      <View style={styles.trans}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTrans === "Credit" && styles.selectedButton,
          ]}
          onPress={() => handleTransButtonClick("Credit")}
        >
          <Text style={styles.buttonText}>Credit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTrans === "Debit" && styles.selectedButton,
          ]}
          onPress={() => handleTransButtonClick("Debit")}
        >
          <Text style={styles.buttonText}>Debit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mode}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedMode === "Cash" && styles.selectedButton,
          ]}
          onPress={() => handleModeButtonClick("Cash")}
        >
          <Text style={styles.buttonText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedMode === "Online" && styles.selectedButton,
          ]}
          onPress={() => handleModeButtonClick("Online")}
        >
          <Text style={styles.buttonText}>Online</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.category}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map((item, index) => (
              <Picker.Item
                key={index}
                label={item}
                value={item}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.newCategoryButton}>
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.inputNote}
        placeholder="Add Note"
        placeholderTextColor="#aaa"
        value={note}
        onChangeText={handleNoteChange}
      />
      <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
        <Text style={styles.subbuttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2e2e2e",
    alignItems: "center",
    margin: 0,
    width: "100%",
    padding: 20,
  },
  addrectext: {
    color: "#fff",
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    color: "#000",
    fontSize: 16,
  },
  trans: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  mode: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    alignItems: "center",
  },
  pickerContainer: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  newCategoryButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    paddingHorizontal: 22,
    borderRadius: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#FFD700", // Highlight color for selected button
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  SubmitButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  subbuttonText: {
    color: "#fff",
    fontSize: 16,
  },
  inputNote: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    marginTop: 12,
    borderRadius: 5,
    color: "#000",
    fontSize: 13,
  },
});
