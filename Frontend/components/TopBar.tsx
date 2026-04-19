import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface TopBarProps {
  text: string;
}

export default function TopBar({ text }: TopBarProps) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    backgroundColor: "#115eac",
    padding: 30,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
});
