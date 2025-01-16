import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";
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
        const defaultCategories = ["Food", "Utilities", "Grocery", "Recharge", "Fees"];
        await AsyncStorage.setItem("categories", JSON.stringify(defaultCategories));
        console.log("Default categories set");
      } else {
        console.log("Categories already exist:", JSON.parse(categories));
      }
    } catch (error) {
      console.error("Error initializing categories:", error);
    }
  };

  React.useEffect(() => {
    initializeCategories(); // Check and initialize categories
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
      <Animated.Text style={[styles.text, { fontFamily: "PoetsenOne-Regular" }, style]}>
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
