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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function addOrEditTask() {
    if (!title || !description || !deadline) return;

    const newItem = {
      title,
      description,
      deadline,
      done: false,
    };

    if (editIndex === null) {
      setTasks(prev => [...prev, newItem]);
    } else {
      const updated = [...tasks];
      updated[editIndex] = newItem;
      setTasks(updated);
      setEditIndex(null);
    }

    resetForm();
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setDeadline(new Date());
    setModalVisible(false);
    setEditIndex(null);
  }

  function confirmDelete(index) {
    Alert.alert("Excluir tarefa?", `Remover "${tasks[index].title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setTasks(prev => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  }

  function openEditModal(index) {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    setDeadline(new Date(task.deadline));
    setEditIndex(index);
    setModalVisible(true);
  }

  function toggleTaskDone(index) {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  }

  const pendingTasks = tasks.filter(t => !t.done);
  const completedTasks = tasks.filter(t => t.done);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Nova Tarefa</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Pendentes</Text>
      <FlatList
        data={pendingTasks}
        keyExtractor={(_, i) => "pending" + i}
        renderItem={({ item, index }) => (
          <TaskItem
            task={item}
            onEdit={() => openEditModal(index)}
            onDelete={() => confirmDelete(index)}
            onToggleDone={() => toggleTaskDone(index)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa pendente.</Text>}
      />

      <Text style={styles.sectionTitle}>Concluídas</Text>
      <FlatList
        data={completedTasks}
        keyExtractor={(_, i) => "done" + i}
        renderItem={({ item, index }) => (
          <TaskItem
            task={item}
            done
            onEdit={() => openEditModal(tasks.indexOf(item))}
            onDelete={() => confirmDelete(tasks.indexOf(item))}
            onToggleDone={() => toggleTaskDone(tasks.indexOf(item))}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa concluída.</Text>}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Nome da tarefa:</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Comprar pão"
              style={styles.input}
            />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Detalhes da tarefa"
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <Text style={styles.label}>Prazo:</Text>
            <Pressable onPress={() => setShowPicker(true)} style={styles.dateButton}>
              <Text style={styles.dateText}>
                {deadline.toLocaleDateString()} às {deadline.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={deadline}
                mode="datetime"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDeadline(selectedDate);
                }}
              />
            )}

            <Pressable onPress={addOrEditTask} style={{ marginTop: 12 }}>
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

function TaskItem({ task, onEdit, onDelete, onToggleDone, done }) {
  return (
    <View style={[styles.itemContainer, done && styles.doneItem]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, done && { textDecorationLine: "line-through", color: "#999" }]}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.deadline}>Prazo: {new Date(task.deadline).toLocaleString()}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onToggleDone} style={styles.actionButton}>
          <Text style={styles.icon}>{done ? "↩️" : "✅"}</Text>
        </Pressable>
        <Pressable onPress={onEdit} style={styles.actionButton}>
          <Text style={styles.icon}>✏️</Text>
        </Pressable>
        <Pressable onPress={onDelete} style={styles.actionButton}>
          <Text style={styles.icon}>🗑️</Text>
        </Pressable>
      </View>
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
  doneItem: {
    backgroundColor: "#f1f1f1",
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
  deadline: {
    color: "#888",
    fontSize: 12,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    color: "#333",
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
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
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
