import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

import { db, storage } from "../../../src/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// -------------------------------------------------------
// 🔥 Função correta para enviar imagem no EXPO
// -------------------------------------------------------
async function uploadImagem(uri: string) {
  // Ler como base64
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  // Transformar em dataURL
  const dataUrl = `data:image/jpeg;base64,${base64}`;

  // Transformar dataURL em blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  // Criar referência no Firebase
  const imageRef = ref(storage, `imoveis/${Date.now()}.jpg`);

  // Enviar pro storage
  await uploadBytes(imageRef, blob);

  // Voltar URL pública
  return await getDownloadURL(imageRef);
}

export default function CadastroImovel() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // -------------------------------------------------------
  // 📸 Escolher imagem com expo-image-picker
  // -------------------------------------------------------
  async function escolherImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ["images"], // NOVO FORMATO
});

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  // -------------------------------------------------------
  // 💾 SALVAR IMÓVEL
  // -------------------------------------------------------
  async function salvarImovel() {
    if (!titulo || !descricao || !preco || !tipo || !endereco || !imagem) {
      alert("Preencha todos os campos e selecione uma imagem!");
      return;
    }

    try {
      setLoading(true);

      console.log("Enviando imagem...");
      const imageURL = await uploadImagem(imagem);

      console.log("Salvando no Firestore...");
      await addDoc(collection(db, "imoveis"), {
        titulo,
        descricao,
        preco,
        tipo,
        endereco,
        imagem: imageURL,
        criadoEm: new Date(),
      });

      alert("Imóvel cadastrado com sucesso!");
      router.back();
    } catch (error) {
      console.log(" Erro Firebase:", error);
      alert("Erro ao salvar imóvel.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Imóvel</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Foto do Imóvel</Text>

        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.imagem} />
        ) : (
          <View style={styles.imagemPlaceholder}>
            <Text style={{ color: "#666" }}>Nenhuma imagem selecionada</Text>
          </View>
        )}

        <TouchableOpacity style={styles.botaoImagem} onPress={escolherImagem}>
          <Text style={styles.botaoTexto}>Escolher Imagem</Text>
        </TouchableOpacity>
      </View>

      <Input label="Título" value={titulo} onChangeText={setTitulo} />
      <Input label="Descrição" value={descricao} onChangeText={setDescricao} multiline />
      <Input label="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <Input label="Tipo de imóvel" value={tipo} onChangeText={setTipo} />
      <Input label="Endereço" value={endereco} onChangeText={setEndereco} />

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={salvarImovel}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoSalvarTexto}>Salvar Imóvel</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

// COMPONENTE INPUT
function Input({ label, ...props }: any) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={label} {...props} />
    </View>
  );
}

// -------------------------------------------------------
// ESTILOS
// -------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
    fontWeight: "500",
  },
  box: {
    marginBottom: 20,
  },
  imagem: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  imagemPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#ddd",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoImagem: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 12,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    elevation: 2,
  },
  botaoSalvar: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    elevation: 3,
  },
  botaoSalvarTexto: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
});
