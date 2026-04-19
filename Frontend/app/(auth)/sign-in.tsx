import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "@/components/Button";
import CustomText from "@/components/StyledText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../api/auth";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);

      navigation.navigate("Home");
    } catch (error: any) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login failed");

      console.log("LOGIN ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back 👋</Text>
      <CustomText title="Sign in to continue" variant="p" />

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <Button title="Login" variant="primary" onPress={loginUser} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 6,
    borderColor: "#115eac",
    color: "#9CA3AF",
  },

  link: {
    marginTop: 15,
    color: "#115eac",
    textAlign: "center",
  },
});
