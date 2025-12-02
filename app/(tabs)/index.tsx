import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ConstruTech Imobiliária</Text>
      <Text style={styles.subtitle}>O lugar perfeito para achar seu imóvel</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("../usuarios/inicio")}>
        <Text style={styles.buttonText}>Usuários</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("../login")}>
        <Text style={styles.buttonText}>Corretor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("../login")}>
        <Text style={styles.buttonText}>Administrador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "#fff", padding: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 40 },

  button: {
    width: "100%",
    backgroundColor: "#4A47E0",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  buttonText: { color: "#FFF", textAlign: "center", fontSize: 18, fontWeight: "bold" },
});
