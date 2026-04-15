import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface TextProps {
  title: string;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

export default function CustomText({ title, variant }: TextProps) {
  // Map variant to style
  const textStyle: TextStyle = styles[variant] || styles.p;

  // Fixed: Text component cannot have 'title' prop
  return <Text style={textStyle}>{title}</Text>;
}

const styles = StyleSheet.create({
  h1: {
    fontWeight: "800",
    fontSize: 20,
    color: "#ffffff",
   
  },
  h2: {
    fontWeight: "500",
    fontSize: 18,
    color: "#4DA6FF",
  },
  h3: {
    fontWeight: "500",
    fontSize: 16,
    color: "#333333",
  },
  h4: {
    fontWeight: "500",
    fontSize: 14,
    color: "#333333",
  },
  h5: {
    fontWeight: "500",
    fontSize: 12,
    color: "#333333",
  },
  h6: {
    fontWeight: "500",
    fontSize: 10,
    color: "#333333",
  },
  p: {
    fontWeight: "200",
    fontSize: 18,
    color: "#9CA3AF",
  },
});