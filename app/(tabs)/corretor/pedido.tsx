import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { router } from "expo-router";

export default function FazerPedido() {
  const [tipo, setTipo] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarPedido() {
    if (!tipo) {
      Alert.alert("Atenção", "Selecione o tipo de pedido.");
      return;
    }
    if (!mensagem.trim()) {
      Alert.alert("Atenção", "Descreva o pedido.");
      return;
    }

    Alert.alert("Pedido enviado!", "O chefe irá analisar seu pedido.");
    router.back();
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Fazer Pedido
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 10, color: "#444" }}>
        Selecione o tipo de solicitação:
      </Text>

      {/* Botões de tipo */}
      <View style={{ gap: 10 }}>
        {[
          { label: "Criar um imóvel novo", value: "criar" },
          { label: "Editar imóvel existente", value: "editar" },
          { label: "Apagar imóvel", value: "apagar" },
          { label: "Acrescentar informações", value: "acrescentar" },
        ].map((op) => (
          <TouchableOpacity
            key={op.value}
            onPress={() => setTipo(op.value)}
            style={{
              padding: 12,
              borderRadius: 10,
              backgroundColor: tipo === op.value ? "#2563eb" : "white",
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: tipo === op.value ? "white" : "#2563eb",
              }}
            >
              {op.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Campo de descrição */}
      <Text style={{ marginTop: 25, fontSize: 16, color: "#444" }}>
        Descreva o pedido:
      </Text>

      <TextInput
        multiline
        value={mensagem}
        onChangeText={setMensagem}
        placeholder="Escreva aqui o que deseja solicitar..."
        style={{
          backgroundColor: "white",
          height: 150,
          borderRadius: 10,
          padding: 12,
          marginTop: 10,
          textAlignVertical: "top",
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      />

      {/* Botão enviar */}
      <TouchableOpacity
        onPress={enviarPedido}
        style={{
          backgroundColor: "green",
          padding: 14,
          borderRadius: 10,
          marginTop: 25,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 18, fontWeight: "bold" }}>
          Enviar Pedido
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
