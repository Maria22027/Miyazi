import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function InicioChefe() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Olá, Adiministrador</Text>
        <Text style={styles.subtitle}>O que deseja fazer hoje?</Text>

        <TouchableOpacity style={styles.btn} onPress={() => router.push("../chefe/imoveis")}>
          <Text style={styles.btnText}>Ver lista de imóveis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push("../chefe/cadastroImo")}>
          <Text style={styles.btnText}>Cadastrar novo imóvel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push("../chefe/pedido")}>
          <Text style={styles.btnText}>Pedidos dos corretores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push("../chefe/editar")}>
          <Text style={styles.btnText}>Editar Imóveis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => router.replace("/")}>
          <Text style={styles.btnText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PRIMARY = "#4A47E0";
const DANGER = "#D0473C";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 22,
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 18,
    marginTop: 6,
  },
  btn: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  btnDanger: {
    backgroundColor: DANGER,
  },
});
