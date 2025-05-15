import { Drawer } from "expo-router/drawer";
import IonIcons from "react-native-vector-icons/Ionicons";
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
                name="settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                    drawerIcon: ({ size, color }) => (
                        <IonIcons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    </GestureHandlerRootView>
);
}