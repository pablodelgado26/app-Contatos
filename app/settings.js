import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SettingsScreen() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  function handleDarkModeToggle(value) {
    setDarkModeEnabled(value);
    Alert.alert("Modo Escuro", "Funcionalidade em desenvolvimento.");
  }

  function handleNotificationToggle(value) {
    setNotificationEnabled(value);
    Alert.alert("Notificações", "Funcionalidade em desenvolvimento.");
  }

  function handleChangePassword() {
    Alert.alert("Alterar Senha", "Funcionalidade em desenvolvimento.");
  }

  function handleLogout() {
    Alert.alert('Sair da conta', 'Funcionalidade em desenvolvimento');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>

        <View style={styles.item}>
          <Text style={styles.itemText}>Notificações</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={handleNotificationToggle}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>Modo Escuro</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={handleDarkModeToggle}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>

        <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" />
          <Text style={styles.itemText}> Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#d00" />
          <Text style={[styles.itemText, { color: '#d00' }]}> Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6200ee',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
