import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏡 ConstruTech Imobiliária</Text>
      <Text style={styles.subtitle}>O lugar perfeito para achar seu imóvel</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("../inicio")}>
        <Text style={styles.buttonText}>Ver Imóveis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("../chat")}>
        <Text style={styles.buttonText}>Chatbot</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => router.push("../login")}
      >
        <Text style={styles.buttonOutlineText}>Login / Trocar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  button: {
    width: "100%",
    backgroundColor: "#4A47E0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonOutline: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#4A47E0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#4A47E0",
    fontSize: 18,
    fontWeight: "bold",
  },
});

