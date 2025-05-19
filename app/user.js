import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UserScreen() {
  const user = {
    name: "Pablo Delgado",
    age: 24,
    email: "pablo@example.com",
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={100} color="#6200ee" />
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.info}>Idade: {user.age}</Text>
      <Text style={styles.info}>E-mail: {user.email}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Ionicons name="log-out-outline" size={20} color="#6200ee" />
          <Text style={[styles.buttonText, { color: "#6200ee" }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  actions: {
    marginTop: 32,
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  logoutButton: {
    backgroundColor: "#eee",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
