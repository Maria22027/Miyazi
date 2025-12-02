import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { criarImovelAPI } from "../.../../../src/services/apiService";

export default function CadastroImovel() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [imagem, setImagem] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");

  const router = useRouter();

  async function salvar() {
    if (!titulo || !preco || !tipo || !imagem) {
      Alert.alert("Erro", "Preencha os campos obrigatórios!");
      return;
    }

    try {
      const novoImovel = {
        titulo,
        descricao,
        preco,
        tipo,
        localizacao,
        endereco,
        imagem,
        quartos: Number(quartos),
        banheiros: Number(banheiros),
        criadoEm: new Date().toISOString(),
      };

      await criarImovelAPI(novoImovel);

      Alert.alert("Sucesso", "Imóvel cadastrado!");
      router.back();
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível cadastrar o imóvel.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Imóvel</Text>

      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />

      <TextInput style={styles.input} placeholder="Tipo (Casa/Apartamento)" value={tipo} onChangeText={setTipo} />

      <TextInput style={styles.input} placeholder="Localização" value={localizacao} onChangeText={setLocalizacao} />

      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />

      <TextInput style={styles.input} placeholder="URL da imagem" value={imagem} onChangeText={setImagem} />

      <TextInput style={styles.input} placeholder="Quartos" value={quartos} onChangeText={setQuartos} keyboardType="numeric" />

      <TextInput
        style={styles.input}
        placeholder="Banheiros"
        value={banheiros}
        onChangeText={setBanheiros}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  textArea: { height: 120, textAlignVertical: "top" },
  botao: {
    backgroundColor: "#0a8791",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
