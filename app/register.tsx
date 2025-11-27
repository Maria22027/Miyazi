import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar() {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    Alert.alert("Conta criada!", "Seu cadastro foi realizado.");
    router.replace("/");
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{
          uri: "https://miyazi.com.br/wp-content/uploads/2025/02/logo-novo.png", // Mock do logo Miyazi igual ao layout
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#94a3b8"
        value={nome}
        onChangeText={setNome}
      />

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

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.link}>Já tenho conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    padding: 25,
    paddingTop: 70,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 14,
    alignSelf: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#1e293b",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#E1A34A",
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  link: {
    marginTop: 20,
    color: "#2563eb",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
