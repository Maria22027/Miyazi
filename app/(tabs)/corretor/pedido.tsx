import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";

export default function FazerPedido() {
  const [tipo, setTipo] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarPedido() {
    if (!tipo) return Alert.alert("Atenção", "Selecione o tipo de pedido.");
    if (!mensagem.trim())
      return Alert.alert("Atenção", "Descreva o pedido.");

    Alert.alert("Pedido enviado!", "O chefe irá analisar seu pedido.");
    router.back();
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F2F4F7", padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 25,
          color: "#1e293b",
        }}
      >
        Fazer Pedido
      </Text>

      <Text style={{ fontSize: 16, color: "#475569", marginBottom: 10 }}>
        Selecione o tipo:
      </Text>

      <View style={{ gap: 12 }}>
        {[
          { label: "Criar imóvel", value: "criar" },
          { label: "Editar imóvel", value: "editar" },
          { label: "Apagar imóvel", value: "apagar" },
          { label: "Acrescentar informações", value: "acrescentar" },
        ].map((op) => (
          <TouchableOpacity
            key={op.value}
            onPress={() => setTipo(op.value)}
            style={{
              paddingVertical: 14,
              borderRadius: 14,
              backgroundColor: tipo === op.value ? "#2563eb" : "white",
              borderWidth: 1,
              borderColor: "#CBD5E1",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: tipo === op.value ? "white" : "#2563eb",
              }}
            >
              {op.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ marginTop: 25, fontSize: 16, color: "#475569" }}>
        Descreva o pedido:
      </Text>

      <TextInput
        multiline
        value={mensagem}
        onChangeText={setMensagem}
        placeholder="Escreva aqui..."
        style={{
          backgroundColor: "white",
          height: 160,
          borderRadius: 14,
          padding: 14,
          marginTop: 10,
          borderWidth: 1,
          borderColor: "#CBD5E1",
          textAlignVertical: "top",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 4,
        }}
      />

      <TouchableOpacity
        onPress={enviarPedido}
        style={{
          backgroundColor: "green",
          paddingVertical: 15,
          borderRadius: 14,
          marginTop: 30,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Enviar Pedido
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
