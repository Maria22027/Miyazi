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

import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  
  const [nascimento, setNascimento] = useState("");
  
  const [creci, setCreci] = useState("");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // 🔵 MASCARA CPF
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

  // 🔵 MASCARA DATA
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
   
    if (
      !nome ||
      !email ||
      !cpf ||
      !nascimento ||
      !creci ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }


    if (cpf.replace(/\D/g, "").length !== 11) {
      Alert.alert("Erro", "O CPF deve conter 11 números.");
      return;
    }


    if (!email.includes("@")) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    if (!/^\d{6}$/.test(creci)) {
      Alert.alert("Erro", "O CRECI deve conter exatamente 6 números.");
      return;
    }

    if (!validarSenha(senha)) {
      Alert.alert("Erro", "A senha deve conter letras e números.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }


    if (!validarIdade(nascimento)) {
      Alert.alert("Erro", "Você deve ter 18 anos ou mais.");
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
        creci,
        tipo: "corretor", // 🔵 agora sempre corretor
      });

      Alert.alert("Sucesso!", "Conta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.push("../corretor/login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Corretor</Text>
      
      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#666"
      />


      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#666"
      />


      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={(t) => setCpf(formatarCPF(t))}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />


      <TextInput
        placeholder="Data de nascimento (DD/MM/AAAA)"
        value={nascimento}
        onChangeText={(t) => setNascimento(formatarData(t))}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="CRECI (6 números)"
        value={creci}
        onChangeText={setCreci}
        keyboardType="numeric"
        maxLength={6}
        style={styles.input}
        placeholderTextColor="#666"
      />
      
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText=
        {setSenha}
        secureTextEntry
        style=
        {styles.input}
        placeholderTextColor="#666"
      />

   
      <TextInput
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText=
        {setConfirmarSenha}
        secureTextEntry
        style =
        {styles.input}
        placeholderTextColor="#666"
      />

      <TouchableOpacity
       onPress={handleRegister} style={styles.buttonSubmit}>
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

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#000",
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
