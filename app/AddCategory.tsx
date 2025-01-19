import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo vector icons

interface AddCategoryProps {
  onClose: () => void;
  refetchCategories: () => void;
}

export default function AddCategory({ onClose, refetchCategories }: AddCategoryProps) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

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

  const handleSubmit = async () => {
    if (!name || !emoji) {
      alert("Please enter a category name and select an emoji.");
      return;
    }

    try {
      const categoriesJSON = await AsyncStorage.getItem("categories");
      const categories = categoriesJSON ? JSON.parse(categoriesJSON) : [];
      const newCategory = { name, emoji, value: 0 };
      categories.push(newCategory);
      await AsyncStorage.setItem("categories", JSON.stringify(categories));
      setName("");
      setEmoji("");
      alert("Category added successfully!");
      refetchCategories();
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <View
      style={[styles.container, { height: keyboardVisible ? "90%" : "90%" }]}
    >
      {/* Back Arrow */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,}}
      >
        <TouchableOpacity onPress={onClose}>
          <Text>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.mainText}>Add New Category</Text>
      </View>

      {/* Input for Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter Category Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      {/* Input for Emoji */}
      <TextInput
        style={styles.input}
        placeholder="Select an Emoji"
        placeholderTextColor="#999"
        value={emoji}
        onChangeText={setEmoji}
        maxLength={2} // Max length for emojis (can handle some multi-character emojis)
        keyboardType="default" // Default keyboard for emoji selection
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
  mainText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
    width: "90%",
  },
  input: {
    backgroundColor: "#444",
    color: "#fff",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
