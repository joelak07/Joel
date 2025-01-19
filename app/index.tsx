import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const [fontsLoaded] = useFonts({
    "PoetsenOne-Regular": require("../assets/fonts/PoetsenOne-Regular.ttf"),
  });

  const scale = useSharedValue(1);
  const navigation = useNavigation();

  // Function to check and set default categories
  const initializeCategories = async () => {
    try {
      const categories = await AsyncStorage.getItem("categories");
      if (!categories) {
        const defaultCategories = [
          { emoji: "🍔", name: "Food", value: 0 },
          { emoji: "💡", name: "Utilities", value: 0 },
          { emoji: "🛒", name: "Grocery", value: 0 },
          { emoji: "📱", name: "Recharge", value: 0 },
          { emoji: "🎓", name: "Fees", value: 0 },
          { emoji: "🏠", name: "Rent", value: 0 },
          { emoji: "🚕", name: "Transportation", value: 0 },
          { emoji: "🎉", name: "Entertainment", value: 0 },
          { emoji: "💊", name: "Health", value: 0 },
          { emoji: "🎁", name: "Gifts", value: 0 },
          { emoji: "🛠️", name: "Repairs", value: 0 },
          { emoji: "👕", name: "Clothing", value: 0 },
          { emoji: "✈️", name: "Travel", value: 0 },
          { emoji: "🐾", name: "Pets", value: 0 },
          { emoji: "📚", name: "Books", value: 0 },
          { emoji: "☕", name: "Café", value: 0 },
          { emoji: "💼", name: "Work", value: 0 },
          { emoji: "💰", name: "Savings", value: 0 },
          { emoji: "🎮", name: "Games", value: 0 },
          { emoji: "🔔", name: "Subscriptions", value: 0 },
        ];

        await AsyncStorage.setItem(
          "categories",
          JSON.stringify(defaultCategories)
        );
        console.log("Default categories set");
      } else {
        console.log("Categories already exist:", JSON.parse(categories));
      }
    } catch (error) {
      console.error("Error initializing categories:", error);
    }
  };

  const initializeExpense = async () => {
    try {
      const expense = await AsyncStorage.getItem("expense");
      if (!expense) {
        const defaultexp = 0;
        await AsyncStorage.setItem("expense", JSON.stringify(defaultexp));
        console.log("Default Expense set");
      } else {
        console.log("Expense already exist:", JSON.parse(expense));
      }
    } catch (error) {
      console.error("Error initializing Expense:", error);
    }
  };

  React.useEffect(() => {
    initializeCategories();
    initializeExpense(); // Check and initialize categories
    scale.value = withTiming(1.2, { duration: 500, easing: Easing.ease });
    setTimeout(() => {
      navigation.navigate("home");
    }, 1000);
  }, [scale, navigation]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />
      <Animated.Text
        style={[styles.text, { fontFamily: "PoetsenOne-Regular" }, style]}
      >
        PennyWise
      </Animated.Text>
      <Text style={styles.small}>"Penny wise, wisdom bound"</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e2e2e",
  },
  text: {
    fontSize: 30,
    color: "#FFF4B7",
  },
  small: {
    fontSize: 15,
    color: "#FFF",
    position: "absolute",
    bottom: 90,
  },
});
