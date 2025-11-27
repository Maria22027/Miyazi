import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function EditarImovelVisual() {
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Imóvel</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
        placeholderTextColor="#888"
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descrição"
        multiline
        value={descricao}
        onChangeText={setDescricao}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Salvar alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: "#F2F2F2",
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 16,
    color: "#333",
  },
  botao: {
    backgroundColor: "#4B7BEC",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
