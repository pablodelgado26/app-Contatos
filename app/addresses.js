import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function addOrEditAddress() {
    if (!title || !address) return;

    const newItem = { title, address };

    if (editIndex === null) {
      setAddresses(prev => [...prev, newItem]);
    } else {
      const updated = [...addresses];
      updated[editIndex] = newItem;
      setAddresses(updated);
      setEditIndex(null);
    }

    setTitle("");
    setAddress("");
    setModalVisible(false);
  }

  function confirmDelete(index) {
    Alert.alert("Excluir endereço?", `Remover "${addresses[index].title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setAddresses(prev => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  }

  function openEditModal(index) {
    const item = addresses[index];
    setTitle(item.title);
    setAddress(item.address);
    setEditIndex(index);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setTitle("");
          setAddress("");
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Novo Endereço</Text>
      </Pressable>

      <FlatList
        data={addresses}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
            <View style={styles.actions}>
              <Pressable onPress={() => openEditModal(index)} style={styles.actionButton}>
                <Text style={styles.icon}>✏️</Text>
              </Pressable>
              <Pressable onPress={() => confirmDelete(index)} style={styles.actionButton}>
                <Text style={styles.icon}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum endereço adicionado ainda!</Text>
        }
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Título (ex: Casa da Tia Rosana):</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Casa do Vovô"
              style={styles.input}
            />

            <Text style={styles.label}>Endereço completo:</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Ex: Rua das Flores, 123 - Bairro"
              style={styles.input}
              multiline
            />

            <Pressable onPress={addOrEditAddress} style={{ marginBottom: 8 }}>
              <Text style={styles.saveButtonText}>
                {editIndex === null ? "Adicionar" : "Salvar alterações"}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#6200ee",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "60%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  address: {
    color: "#555",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  icon: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 32,
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "85%",
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: "bold",
    color: "#444",
  },
  saveButtonText: {
    color: "#6200ee",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#999",
    textAlign: "center",
    fontSize: 14,
  },
});
