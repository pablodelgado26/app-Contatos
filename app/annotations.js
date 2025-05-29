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

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function addOrEditNote() {
    if (!title || !description) return;

    const newNote = { title, description };

    if (editIndex === null) {
      setNotes(prev => [...prev, newNote]);
    } else {
      const updated = [...notes];
      updated[editIndex] = newNote;
      setNotes(updated);
      setEditIndex(null);
    }

    resetForm();
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setModalVisible(false);
    setEditIndex(null);
  }

  function confirmDelete(index) {
    Alert.alert("Excluir anotação?", `Remover "${notes[index].title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setNotes(prev => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  }

  function openEditModal(index) {
    const note = notes[index];
    setTitle(note.title);
    setDescription(note.description);
    setEditIndex(index);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Nova Anotação</Text>
      </Pressable>

      <FlatList
        data={notes}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
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
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma anotação.</Text>}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Título:</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Ideia de projeto"
              style={styles.input}
            />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Escreva sua anotação"
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <Pressable onPress={addOrEditNote} style={{ marginTop: 12 }}>
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
    backgroundColor: "#03a9f4",
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
    alignItems: "flex-start",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  description: {
    color: "#444",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    marginLeft: 10,
  },
  actionButton: {
    marginLeft: 6,
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
    marginTop: 16,
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
    color: "#03a9f4",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#999",
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
  },
});
