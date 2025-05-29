import { Drawer } from "expo-router/drawer";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="home"
                    options={{
                        drawerLabel: "Inicio",
                        title: "Home",
                        headerShown: false,
                        headerLeft: true,
                        drawerIcon: ({ size, color }) => (
                            <IonIcons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="annotations"
                    options={{
                        drawerLabel: "Anotações",
                        title: "Anotações",
                        drawerIcon: ({ size, color }) => (
                            <MaterialIcons name="notes" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="consultation"
                    options={{
                        drawerLabel: "Consultas",
                        title: "Consultas",
                        drawerIcon: ({ size, color }) => (
                            <IonIcons name="medkit" size={size} color={color} />
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
                    name="addresses"
                    options={{
                        drawerLabel: "Endereços",
                        title: "Endereços",
                        drawerIcon: ({ size, color }) => (
                            <Entypo name="address" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="tasks"
                    options={{
                        drawerLabel: "Tarefas",
                        title: "Tarefas",
                        drawerIcon: ({ size, color }) => (
                            <FontAwesome5 name="tasks" size={size} color={color} />
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
                <Drawer.Screen
                    name="user"
                    options={{
                        drawerLabel: "Perfil",
                        title: "Perfil",
                        drawerIcon: ({ size, color }) => (
                            <AntDesign name="user" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="register"
                    options={{
                        drawerLabel: "register",
                        title: "register",
                        drawerItemStyle: { display: 'none' },
                        headerShown: false,
                    }}

                />
                <Drawer.Screen
                    name="login"
                    options={{
                        drawerLabel: "login",
                        title: "login",
                        drawerItemStyle: { display: 'none' },
                        headerShown: false,
                    }}
                />
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "index",
                        title: "index",
                        drawerItemStyle: { display: 'none' },
                        headerShown: false,
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}