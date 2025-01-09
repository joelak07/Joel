import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const [fontsLoaded] = useFonts({
    "PoetsenOne-Regular": require("../assets/fonts/PoetsenOne-Regular.ttf"),
  });

  const scale = useSharedValue(1); 
  const navigation = useNavigation(); 
  React.useEffect(() => {
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
        Joel
      </Animated.Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
  },
  text: {
    fontSize: 80,
    color: "#FFF4B7",
  },
});
