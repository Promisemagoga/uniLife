import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";


interface ButtonProps {
  title: string;
  onPress: () => void;
  variant: "primary" | "secondary" | "tertiary"| "danger";
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  variant,
  loading,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },

  primary: {
    backgroundColor: "#115eac",
  },

  secondary: {
    backgroundColor: "#10B981",
  },

  danger: {
    backgroundColor: "#DC2626",
  },

  tertiary: {
    backgroundColor: "#F59E0B",
    
  },

  disabled: {
    backgroundColor: "#9CA3AF",
  },

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
