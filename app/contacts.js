import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContactItem from "../components/ContactItem";

const CATEGORIES = ["Trabalho", "Pessoal", "Família"];

export default function HomeScreen() {
    const navigation = useNavigation();
    const [contacts, setContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [category, setCategory] = useState(""); // NOVO
    const [editIndex, setEditIndex] = useState(null);

    function addOrEditContacts() {
        if (!newName || !newNumber || !category) return;

        const updatedContact = { name: newName, number: newNumber, category };

        if (editIndex === null) {
            setContacts(prev => [...prev, updatedContact]);
        } else {
            const updatedContacts = [...contacts];
            updatedContacts[editIndex] = updatedContact;
            setContacts(updatedContacts);
            setEditIndex(null);
        }

        setNewName("");
        setNewNumber("");
        setCategory("");
        setModalVisible(false);
    }

    function confirmDelete(index) {
        Alert.alert("Excluir contato?", `Remover "${contacts[index].name}"?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    const updatedContacts = contacts.filter((_, i) => i !== index);
                    setContacts(updatedContacts);
                },
            },
        ]);
    }

    function openEditModal(index) {
        const contact = contacts[index];
        setNewName(contact.name);
        setNewNumber(contact.number);
        setCategory(contact.category); // NOVO
        setEditIndex(index);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.openDrawer()}
            >
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>

            <Pressable
                onPress={() => {
                    setNewName("");
                    setNewNumber("");
                    setCategory("");
                    setEditIndex(null);
                    setModalVisible(true);
                }}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>＋ Novo Contato</Text>
            </Pressable>

            <FlatList
                data={contacts}
                keyExtractor={(_, i) => String(i)}
                renderItem={({ item, index }) => (
                    <ContactItem
                        name={item.name}
                        number={item.number}
                        category={item.category}
                        onEdit={() => openEditModal(index)}
                        onDelete={() => confirmDelete(index)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum contato adicionado ainda!</Text>
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
                        <Text style={{ marginBottom: 8 }}>
                            {editIndex === null ? "Nome do contato:" : "Edite o nome:"}
                        </Text>
                        <TextInput
                            value={newName}
                            onChangeText={setNewName}
                            placeholder="Ex: Eduardo Correa"
                            style={styles.input}
                        />

                        <Text style={{ marginBottom: 8 }}>
                            {editIndex === null ? "Número do contato:" : "Edite o número:"}
                        </Text>
                        <TextInput
                            value={newNumber}
                            onChangeText={setNewNumber}
                            placeholder="Ex: (11) 91234-5678"
                            keyboardType="phone-pad"
                            style={styles.input}
                        />

                        <Text style={{ marginBottom: 8 }}>Categoria:</Text>
                        <View style={styles.radioGroup}>
                            {CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => setCategory(cat)}
                                    style={[
                                        styles.radioButton,
                                        category === cat && styles.radioButtonSelected,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.radioText,
                                            category === cat && styles.radioTextSelected,
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Pressable onPress={addOrEditContacts} style={{ marginBottom: 8 }}>
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
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: "#fff",
    },
    menuButton: {
        position: "absolute",
        top: 26,
        left: 16,
        zIndex: 1,
        backgroundColor: "#6200ee",
        borderRadius: 24,
        padding: 8,
        elevation: 2,
    },
    addButton: {
        backgroundColor: "#6200ee",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: "50%",
        alignSelf: "center",
        alignItems: "center",
        marginVertical: 16,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    contactItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    contactItem: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
    },
    contactButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    contactButton: {
        marginLeft: 8,
        padding: 8,
        borderRadius: 6,
    },
    editButton: {
        backgroundColor: "#e0e0e0",
    },
    deleteButton: {
        backgroundColor: "#e0e0e0",
    },
    buttonText: {
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
    radioGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    radioButton: {
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
    },
    radioButtonSelected: {
        backgroundColor: "#6200ee",
        borderColor: "#6200ee",
    },
    radioText: {
        color: "#333",
    },
    radioTextSelected: {
        color: "#fff",
        fontWeight: "bold",
    },
});
