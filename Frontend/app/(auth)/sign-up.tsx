import API from "@/api/auth";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
      />

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

      <Button title="Register" onPress={registerUser} />

      <Text onPress={() => navigation.navigate("Login")}>
        Already have account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
});
