import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function login() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    // Login do chefe
    if (email === "chefe27022@gmail.com" && senha === "fatec2025") {
      Alert.alert("Sucesso!", "Login do chefe realizado!");
      router.replace("../chefe/inicio");
      return;
    }

    // Login normal (Firebase)
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert("Sucesso!", "Login realizado!");
      router.replace("../corretor/inicio");
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Bem-vindo</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.botao} onPress={login}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão de criar conta para usuários normais */}
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 16,
    elevation: 4,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#1F2937",
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  botao: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  link: {
    textAlign: "center",
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "500",
  },
});
