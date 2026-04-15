import Button from "@/components/Button";
import React from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function BlueHeaderWithImage({navigation}:any) {
   const handleGuest = () => {
    router.push("/(tabs)/Home");
  };

  const handleLogin = () => {
    router.push("/(auth)/sign-in");
  };

  const handleRegister = () => {
    router.push("/(auth)/sign-up");
  };


  return (
    <View style={styles.container}>
      {/* Blue top rectangle */}
      <View style={styles.blueHeader} />
      <Text style={styles.text}>Welcome to uniLife!</Text>
      <Image
        source={require("../../assets/images/banner-2.jpg")}
        style={styles.image}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Continue as Guest" onPress={handleGuest} variant="primary" />
        <Button title="Create Account" onPress={handleRegister} variant="secondary" />
        <Button title="Login" onPress={handleLogin} variant="tertiary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  buttonsContainer: {
    width: "100%",
    padding: 20,
    marginTop: 50,
  },
  text: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 30,
    position: "absolute",
    top: 60,
    zIndex: 10,
  },
  blueHeader: {
    width: width,
    height: 270,
    backgroundColor: "#115eac", // blue rectangle
  },
  image: {
    width: width * 1, 
    height: 250, 
    marginTop: -90, 
    borderTopLeftRadius: 100, 
    borderTopRightRadius: 100,
  },
});
