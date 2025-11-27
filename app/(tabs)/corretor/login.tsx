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
import { auth } from "../../../src/firebaseConfig";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function login() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

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
      <Text style={styles.titulo}>Bem-vindo</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={login}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F2F4F7",
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 40,
    color: "#1e293b",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  botao: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "500",
  },
});
