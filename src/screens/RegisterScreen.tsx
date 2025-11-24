import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<"pessoa" | "corretor">("pessoa");
  const [creci, setCreci] = useState("");

  // Validar idade
  const calcularIdade = (data: string) => {
    const hoje = new Date();
    const [ano, mes, dia] = data.split("-").map(Number);
    const nascimento = new Date(ano, mes - 1, dia);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth() - nascimento.getMonth();

    if (mesAtual < 0 || (mesAtual === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  async function cadastrar() {
    if (!nome || !email || !cpf || !dataNascimento) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const idade = calcularIdade(dataNascimento);

    if (idade < 18) {
      Alert.alert("Erro", "Você precisa ter 18 anos ou mais.");
      return;
    }

    if (tipoUsuario === "corretor" && !creci) {
      Alert.alert("Erro", "Digite seu CRECI.");
      return;
    }

    try {
      // Criar usuário no Firebase Auth
      const resposta = await createUserWithEmailAndPassword(auth, email, cpf);

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, "usuarios", resposta.user.uid), {
        nome,
        email,
        cpf,
        dataNascimento,
        tipoUsuario,
        creci: tipoUsuario === "corretor" ? creci : null,
      });

      Alert.alert("Sucesso!", "Cadastro realizado.");
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <Text style={styles.label}>Tipo de Usuário:</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => setTipoUsuario("pessoa")}>
          <Text style={tipoUsuario === "pessoa" ? styles.selected : styles.option}>
            Pessoa comum
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTipoUsuario("corretor")}>
          <Text style={tipoUsuario === "corretor" ? styles.selected : styles.option}>
            Corretor
          </Text>
        </TouchableOpacity>
      </View>

      {tipoUsuario === "corretor" && (
        <TextInput
          style={styles.input}
          placeholder="Seu CRECI"
          value={creci}
          onChangeText={setCreci}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  option: {
    fontSize: 18,
    color: "#666",
  },
  selected: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  botao: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  botaoTexto: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
