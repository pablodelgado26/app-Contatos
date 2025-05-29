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
  TouchableOpacity,
  Keyboard,
} from "react-native";

const SPECIALTIES = [
  "Alergista", "Anestesiologista", "Angiologista", "Cardiologista",
  "Cirurgião Geral", "Cirurgião Plástico", "Clínico Geral",
  "Dermatologista", "Endocrinologista", "Gastroenterologista",
  "Geriatra", "Ginecologista", "Hematologista", "Hepatologista",
  "Infectologista", "Mastologista", "Médico da Família",
  "Médico do Trabalho", "Nefrologista", "Neurologista",
  "Nutrólogo", "Obstetra", "Oftalmologista", "Oncologista",
  "Ortopedista", "Otorrinolaringologista", "Pediatra",
  "Pneumologista", "Psiquiatra", "Reumatologista", "Urologista"
];

export default function ConsultasScreen() {
  const [consultas, setConsultas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeMedico, setNomeMedico] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function addOrEditConsulta() {
    if (!nomeMedico || !endereco || !numero || !especialidade) return;

    const novaConsulta = {
      nomeMedico,
      endereco,
      numero,
      especialidade,
    };

    if (editIndex === null) {
      setConsultas((prev) => [...prev, novaConsulta]);
    } else {
      const atualizadas = [...consultas];
      atualizadas[editIndex] = novaConsulta;
      setConsultas(atualizadas);
      setEditIndex(null);
    }

    setNomeMedico("");
    setEndereco("");
    setNumero("");
    setEspecialidade("");
    setFilteredSpecialties([]);
    setModalVisible(false);
  }

  function confirmDelete(index) {
    Alert.alert("Excluir consulta?", `Remover "${consultas[index].nomeMedico}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const atualizadas = consultas.filter((_, i) => i !== index);
          setConsultas(atualizadas);
        },
      },
    ]);
  }

  function openEditModal(index) {
    const c = consultas[index];
    setNomeMedico(c.nomeMedico);
    setEndereco(c.endereco);
    setNumero(c.numero);
    setEspecialidade(c.especialidade);
    setEditIndex(index);
    setFilteredSpecialties([]);
    setModalVisible(true);
  }

  function handleEspecialidadeChange(text) {
    setEspecialidade(text);
    const filtered = SPECIALTIES.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSpecialties(filtered.slice(0, 5)); // limita 5 sugestões
  }

  function handleSelectSuggestion(item) {
    setEspecialidade(item);
    setFilteredSpecialties([]);
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setNomeMedico("");
          setEndereco("");
          setNumero("");
          setEspecialidade("");
          setEditIndex(null);
          setFilteredSpecialties([]);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Nova Consulta</Text>
      </Pressable>

      <FlatList
        data={consultas}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nomeMedico}</Text>
              <Text style={styles.info}>{item.numero} - {item.endereco}</Text>
              <Text style={styles.especialidade}>{item.especialidade}</Text>
            </View>
            <View style={styles.botoes}>
              <Pressable onPress={() => openEditModal(index)} style={styles.botao}>
                <Text style={styles.icon}>✏️</Text>
              </Pressable>
              <Pressable onPress={() => confirmDelete(index)} style={styles.botao}>
                <Text style={styles.icon}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma consulta adicionada ainda!</Text>
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
            <Text>Nome do Médico:</Text>
            <TextInput
              value={nomeMedico}
              onChangeText={setNomeMedico}
              placeholder="Ex: Dr. João Silva"
              style={styles.input}
            />
            <Text>Endereço:</Text>
            <TextInput
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Ex: Rua das Flores, 123"
              style={styles.input}
            />
            <Text>Número de Contato:</Text>
            <TextInput
              value={numero}
              onChangeText={setNumero}
              placeholder="Ex: (11) 91234-5678"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <Text>Especialidade:</Text>
            <TextInput
              value={especialidade}
              onChangeText={handleEspecialidadeChange}
              placeholder="Digite para buscar..."
              style={styles.input}
            />
            {filteredSpecialties.length > 0 && (
              <View style={styles.suggestionBox}>
                {filteredSpecialties.map((item) => (
                  <TouchableOpacity key={item} onPress={() => handleSelectSuggestion(item)}>
                    <Text style={styles.suggestionItem}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Pressable onPress={addOrEditConsulta} style={{ marginBottom: 8 }}>
              <Text style={{ color: "#6200ee", textAlign: "center" }}>
                {editIndex === null ? "Adicionar" : "Salvar alterações"}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#999", textAlign: "center" }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: "#fff" },
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
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  nome: { fontSize: 16, fontWeight: "bold", color: "#222" },
  info: { color: "#666" },
  especialidade: { fontStyle: "italic", color: "#444" },
  botoes: { flexDirection: "row" },
  botao: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },
  icon: { fontSize: 18 },
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
  suggestionBox: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 16,
  },
});
