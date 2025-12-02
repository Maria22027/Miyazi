import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações</Text>
      <Text style={styles.text}>Aqui ficam detalhes adicionais ou avisos importantes.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#fff",
    padding: 20, justifyContent: "center", alignItems: "center"
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 30 },

  button: {
    backgroundColor: "#4A47E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
