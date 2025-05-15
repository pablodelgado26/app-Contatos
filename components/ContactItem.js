import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ContactItem({ name, number, category, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {name} <Text style={styles.category}>({category})</Text>
        </Text>
        <Text style={styles.number}>{number}</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={onEdit} style={[styles.button, styles.edit]}>
          <Text style={styles.icon}>✏️</Text>
        </Pressable>
        <Pressable onPress={onDelete} style={[styles.button, styles.delete]}>
          <Text style={styles.icon}>🗑️</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  number: {
    color: "#666",
  },
  category: {
    color: "#666",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },
  icon: {
    fontSize: 18,
  },
});
