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
  // Exemplo de dados fictícios
  const [pedidos, setPedidos] = useState<Pedido[]>([
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
    gap: 15,
    backgroundColor: "#F2F2F2",
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardExclusao: {
    borderColor: "#FF6B6B",
  },
  imovel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  corretor: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  descricao: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  botoes: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },
  botao: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoAceitar: {
    backgroundColor: "#4B7BEC",
  },
  botaoRecusar: {
    backgroundColor: "#FF6B6B",
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
  },
  semPedidos: {
    textAlign: "center",
    color: "#555",
    marginTop: 30,
    fontSize: 16,
  },
});
