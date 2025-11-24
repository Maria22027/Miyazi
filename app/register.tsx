import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../src/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [tipo, setTipo] = useState<"corretor" | "comum">("comum");
  const [creci, setCreci] = useState("");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // 🔵 MÁSCARA DE CPF
  const formatarCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    let cpfFormatado = digits;

    if (digits.length > 3 && digits.length <= 6) {
      cpfFormatado = digits.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    } else if (digits.length > 6 && digits.length <= 9) {
      cpfFormatado = digits.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (digits.length > 9) {
      cpfFormatado = digits.replace(
        /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
        "$1.$2.$3-$4"
      );
    }

    return cpfFormatado;
  };

  // 🔵 MÁSCARA DATA DE NASCIMENTO
  const formatarData = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return digits.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    return digits.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  };

  const validarIdade = (data: string) => {
    const partes = data.split("/");
    if (partes.length !== 3) return false;

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);

    const nascimentoDate = new Date(ano, mes, dia);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimentoDate.getFullYear();
    const m = hoje.getMonth() - nascimentoDate.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimentoDate.getDate())) {
      idade--;
    }

    return idade >= 18;
  };

  const validarSenha = (senha: string) => {
    return /[a-zA-Z]/.test(senha) && /\d/.test(senha);
  };

  const handleRegister = async () => {
    // CAMPOS VAZIOS
    if (
      !nome ||
      !email ||
      !cpf ||
      !nascimento ||
      !senha ||
      !confirmarSenha ||
      (tipo === "corretor" && !creci)
    ) {
      Alert.alert("Erro", "Insira todas as suas informações.");
      return;
    }

    // CPF INVÁLIDO
    if (cpf.replace(/\D/g, "").length !== 11) {
      Alert.alert("Erro", "O CPF deve conter 11 números.");
      return;
    }

    // EMAIL INVÁLIDO
    if (!email.includes("@")) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    // CRECI
    if (tipo === "corretor" && !/^\d{6}$/.test(creci)) {
      Alert.alert("Erro", "O CRECI está incorreto.");
      return;
    }

    // SENHAS
    if (!senha) {
      Alert.alert("Erro", "Digite a senha.");
      return;
    }

    if (!validarSenha(senha)) {
      Alert.alert("Erro", "A senha deve conter letras e números.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não são iguais.");
      return;
    }

    // IDADE
    if (!validarIdade(nascimento)) {
      Alert.alert("Erro", "Você precisa ter 18 anos ou mais.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nome,
        email,
        cpf,
        nascimento,
        tipo,
        creci: tipo === "corretor" ? creci : null,
      });

      Alert.alert("Sucesso!", "Conta criada com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {/* NOME */}
      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* CPF COM MÁSCARA */}
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(formatarCPF(text))}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />

      {/* DATA DE NASCIMENTO COM MÁSCARA */}
      <TextInput
        placeholder="Data de nascimento (DD/MM/AAAA)"
        value={nascimento}
        onChangeText={(text) => setNascimento(formatarData(text))}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Você é:</Text>

      {/* SELEÇÃO DO TIPO */}
      <View style={styles.selectRow}>
        <TouchableOpacity
          onPress={() => setTipo("comum")}
          style={[
            styles.buttonSelect,
            tipo === "comum" && styles.buttonActive,
          ]}
        >
          <Text style={styles.buttonText}>Pessoa comum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTipo("corretor")}
          style={[
            styles.buttonSelect,
            tipo === "corretor" && styles.buttonActive,
          ]}
        >
          <Text style={styles.buttonText}>Corretor</Text>
        </TouchableOpacity>
      </View>

      {tipo === "corretor" && (
        <TextInput
          placeholder="Digite seu CRECI"
          keyboardType="numeric"
          maxLength={6}
          value={creci}
          onChangeText={setCreci}
          style={styles.input}
          placeholderTextColor="#666"
        />
      )}

      {/* SENHA */}
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#666"
      />

      {/* CONFIRMAR SENHA */}
      <TextInput
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#666"
      />

      {/* BOTÃO */}
      <TouchableOpacity onPress={handleRegister} style={styles.buttonSubmit}>
        <Text style={styles.submitText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#000",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  selectRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  buttonSelect: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#0066cc",
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#4da3ff",
  },
  buttonActive: {
    backgroundColor: "#0066cc",
    borderColor: "#004c99",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonSubmit: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
