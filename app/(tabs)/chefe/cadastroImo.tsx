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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
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
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cadastrar Imóvel</Text>
        <Text style={styles.headerSubtitle}>Preencha os dados do imóvel</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Foto do Imóvel</Text>

        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.imagem} />
        ) : (
          <View style={styles.imagemPlaceholder}>
            <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
          </View>
        )}

        <TouchableOpacity style={styles.botaoImagem} onPress={escolherImagem}>
          <Text style={styles.botaoTexto}>Escolher imagem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Input label="Título" value={titulo} onChangeText={setTitulo} />
        <Input label="Descrição" value={descricao} onChangeText={setDescricao} multiline />
        <Input label="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
        <Input label="Tipo de imóvel" value={tipo} onChangeText={setTipo} />
        <Input label="Endereço" value={endereco} onChangeText={setEndereco} />
      </View>

      <TouchableOpacity
        style={[styles.botaoSalvar, loading && styles.botaoDisabled]}
        onPress={salvarImovel}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoSalvarTexto}>Salvar imóvel</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

// COMPONENTE INPUT (mantive simples)
function Input({ label, ...props }: any) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={typeof label === "string" ? label : ""}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
}

// -------------------------------------------------------
// ESTILOS (aplicando visual do protótipo)
// -------------------------------------------------------
const PRIMARY = "#4A47E0";
const ACCENT = "#FFC107";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  header: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    // elevation (Android)
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "600",
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
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  placeholderText: {
    color: "#6B7280",
  },
  botaoImagem: {
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E6E9F2",
  },
  botaoSalvar: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  botaoDisabled: {
    opacity: 0.7,
  },
  botaoSalvarTexto: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
