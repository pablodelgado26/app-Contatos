import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
    const navigation = useNavigation();

    const features = [
        { label: "Contatos", icon: "people", screen: "contacts" },
        { label: "Consultas", icon: "medkit", screen: "consultation" },
        { label: "Endereços", icon: "location", screen: "Enderecos" },
        { label: "Tarefas", icon: "checkmark-done", screen: "Tarefas" },
        { label: "Anotações", icon: "document-text", screen: "Anotacoes" },
    ];

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.openDrawer()}
            >
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.title}>Bem-vindo ao FamilyOrganizer</Text>
            <Text style={styles.subtitle}>Tudo o que sua família precisa, em um só lugar.</Text>

            <View style={styles.featureGrid}>
                {features.map((item) => (
                    <TouchableOpacity
                        key={item.label}
                        style={styles.featureCard}
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <Ionicons name={item.icon} size={32} color="#6200ee" />
                        <Text style={styles.featureText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 24,
    },
    menuButton: {
        position: "absolute",
        top: 10,
        left: 4,
        zIndex: 1,
        backgroundColor: "#6200ee",
        borderRadius: 24,
        padding: 8,
        elevation: 2,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 24,
        textAlign: "center",
    },
    featureGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 16,
    },
    featureCard: {
        width: "47%",
        backgroundColor: "#eee",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        marginBottom: 16,
        elevation: 2,
    },
    featureText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
});
