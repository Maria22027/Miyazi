import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

interface Pedido {
  id: string;
  tipo: "edição" | "exclusão";
  tituloImovel: string;
  corretor: string;
  descricao: string;
}

export default function PedidosChefe() {
  const [pedidos] = useState<Pedido[]>([
    { id: "1", tipo: "edição", tituloImovel: "Apartamento Centro", corretor: "Carlos", descricao: "Alterar preço para 450.000" },
    { id: "2", tipo: "exclusão", tituloImovel: "Casa Jardim", corretor: "Ana", descricao: "Solicitação de exclusão do imóvel" },
    { id: "3", tipo: "edição", tituloImovel: "Cobertura Vista Mar", corretor: "Paulo", descricao: "Atualizar fotos do imóvel" },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pedidos dos Corretores</Text>

      {pedidos.map((pedido) => (
        <View key={pedido.id} style={[styles.card, pedido.tipo === "exclusão" && styles.cardExclusao]}>
          <Text style={styles.imovel}>{pedido.tituloImovel}</Text>
          <Text style={styles.corretor}>Corretor: {pedido.corretor}</Text>
          <Text style={styles.descricao}>{pedido.descricao}</Text>

          <View style={styles.botoes}>
            <TouchableOpacity style={[styles.botao, styles.botaoAceitar]}>
              <Text style={styles.botaoTexto}>Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.botaoRecusar]}>
              <Text style={styles.botaoTexto}>Recusar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {pedidos.length === 0 && (
        <Text style={styles.semPedidos}>Nenhum pedido no momento.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3F4F6",
    gap: 15,
  },
  titulo: {
    textAlign: "center",
    fontSize: 26,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#1F2937",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardExclusao: {
    borderColor: "#EF4444",
  },
  imovel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  corretor: {
    color: "#4B5563",
    marginTop: 4,
  },
  descricao: {
    color: "#6B7280",
    marginVertical: 8,
  },
  botoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  botao: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  botaoAceitar: {
    backgroundColor: "#2563EB",
  },
  botaoRecusar: {
    backgroundColor: "#EF4444",
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
  },
  semPedidos: {
    marginTop: 30,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
  },
});
