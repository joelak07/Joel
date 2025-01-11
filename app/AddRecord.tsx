import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    useWindowDimensions,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Picker } from "@react-native-picker/picker";
  
  export default function AddRecord() {
    const [record, setRecord] = useState("");
    const [selectedTrans, setSelectedTrans] = useState(null);
    const [selectedMode, setSelectedMode] = useState(null);
    const [category, setCategory] = useState("Food");
  
    const [keyboardVisible, setKeyboardVisible] = useState(false);
  
    // Detect keyboard visibility
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
  
    const handleTransButtonClick = (type) => {
      setSelectedTrans(type);
    };
  
    const handleModeButtonClick = (mode) => {
      setSelectedMode(mode);
    };
  
    return (
      <View
        style={[
          styles.container,
          { height: keyboardVisible ? "85%" : "50%" },
        ]}
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
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Grocery" value="grocery" />
              <Picker.Item label="Utilities" value="utilities" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.newCategoryButton}>
            <Text style={styles.buttonText}>New</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.SubmitButton}>
          <Text style={styles.subbuttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#2e2e2e",
      alignItems: "center",
      margin: 20,
      width: "90%",
      borderRadius: 20,
      padding: 20,
    },
    addrectext: {
      color: "#fff",
      fontSize: 20,
    },
    input: {
      backgroundColor: "#fff",
      width: "100%",
      padding: 15,
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
      marginTop: 20,
    },
    category: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 20,
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
      padding: 10,
      borderRadius: 5,
      width: "40%",
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
      marginTop: 20,
    },
    subbuttonText: {
      color: "#fff",
      fontSize: 16,
    },
  });
  