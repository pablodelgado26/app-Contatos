import { Drawer } from "expo-router/drawer";
import IonIcons from "react-native-vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "Início",
                    title: "Home",
                    headerShown: false,
                    headerLeft: true,
                    drawerIcon: ({ size, color }) => (
                        <IonIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="contacts"
                options={{
                    drawerLabel: "Contatos",
                    title: "Contatos",
                    drawerIcon: ({ size, color }) => (
                        <AntDesign name="contacts" size={size} color={color} />
                    ),
                }}
            />
                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: "Configurações",
                        title: "Configurações",
                        drawerIcon: ({ size, color }) => (
                            <IonIcons name="settings" size={size} color={color} />
                        ),
                    }}
                />
        </Drawer>
    </GestureHandlerRootView>
);
}