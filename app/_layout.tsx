import { Stack, useRouter, useSegments } from "expo-router";
import { View, StyleSheet } from "react-native";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const routesWithSidebar = ["products", "details"];
  const isRouteWithSidebar = segments.some((segment) =>
    routesWithSidebar.includes(segment)
  );
  return (
    <View style={styles.container}>
      {/* {isRouteWithSidebar && <Sidebar />} */}
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#d3d3d3",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Login" }} />
          <Stack.Screen name="details" options={{ headerShown: true }} />
          <Stack.Screen name="products/index" options={{ title: "ZOLO" }} />
          <Stack.Screen name="users" options={{ headerShown: false }} />
          <Stack.Screen
            name="users/[userId]"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  content: {
    flex: 3,
    backgroundColor: "#fff",
  },
});