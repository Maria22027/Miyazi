import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

interface Imovel {
  id: string;
  codigo: string;
  titulo: string;
  preco: number;
  endereco: string;
}

export default function ListaImoveisChefe() {
  // Dados fictícios
  const [imoveis, setImoveis] = useState<Imovel[]>([
    { id: "1", codigo: "IMV001", titulo: "Apartamento Centro", preco: 450000, endereco: "Rua A, 123" },
    { id: "2", codigo: "IMV002", titulo: "Casa Jardim", preco: 650000, endereco: "Av. B, 456" },
    { id: "3", codigo: "IMV003", titulo: "Cobertura Vista Mar", preco: 1200000, endereco: "Rua C, 789" },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Lista de Imóveis</Text>

      {imoveis.map((imovel) => (
        <View key={imovel.id} style={styles.card}>
          <Text style={styles.codigo}>Código: {imovel.codigo}</Text>
          <Text style={styles.imovel}>{imovel.titulo}</Text>
          <Text style={styles.preco}>Preço: R$ {imovel.preco.toLocaleString()}</Text>
          <Text style={styles.endereco}>Endereço: {imovel.endereco}</Text>

          <View style={styles.botoes}>
            <TouchableOpacity style={[styles.botao, styles.botaoEditar]}>
              <Text style={styles.botaoTexto}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.botaoExcluir]}>
              <Text style={styles.botaoTexto}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {imoveis.length === 0 && <Text style={styles.semImoveis}>Nenhum imóvel cadastrado.</Text>}
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
    gap: 5,
  },
  codigo: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#888",
  },
  imovel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  preco: {
    fontSize: 14,
    color: "#555",
  },
  endereco: {
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
  botaoEditar: {
    backgroundColor: "#4B7BEC",
  },
  botaoExcluir: {
    backgroundColor: "#FF6B6B",
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
  },
  semImoveis: {
    textAlign: "center",
    color: "#555",
    marginTop: 30,
    fontSize: 16,
  },
});
