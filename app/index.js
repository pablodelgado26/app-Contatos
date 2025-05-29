import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Ionicons name="people-circle-outline" size={96} color="#6200ee" style={{ marginBottom: 24 }} />

            <Text style={styles.title}>Bem-vindo ao FamilyOrganizer</Text>

            <Text style={styles.description}>
                Um app feito para você e sua família se organizarem juntos. Salve contatos, tarefas,
                consultas, endereços e anotações. Tudo em um só lugar. E o melhor: todos da família podem
                ver e colaborar!
            </Text>

            <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate("register")}
            >
                <Text style={styles.startButtonText}>Começar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 32,
    },
    startButton: {
        backgroundColor: "#6200ee",
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        elevation: 2,
    },
    startButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
