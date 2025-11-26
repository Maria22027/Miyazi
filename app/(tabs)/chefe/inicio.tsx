import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function InicioChefe() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, Chefe</Text>
      <Text style={styles.subtitulo}>O que deseja fazer hoje?</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("../imoveis")}
      >
        <Text style={styles.botaoTexto}>Ver lista de imóveis</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("../cadastrar-imovel")}
      >
        <Text style={styles.botaoTexto}>Cadastrar novo imóvel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("../pedidos")}
      >
        <Text style={styles.botaoTexto}>Pedidos dos corretores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("../editar")}
      >
        <Text style={styles.botaoTexto}>Ediatr Imóveis</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: "#d9534f" }]}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.botaoTexto}> Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
    marginTop: 5,
  },
  botao: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
