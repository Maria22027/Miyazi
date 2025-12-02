 // imoveis.tsx
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
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Lista de Imóveis</Text>

      {imoveis.map((imovel) => (
        <View key={imovel.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.meta}>
              <Text style={styles.code}>Código</Text>
              <Text style={styles.codeValue}>{imovel.codigo}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.imovelTitle}>{imovel.titulo}</Text>
              <Text style={styles.preco}>R$ {imovel.preco.toLocaleString()}</Text>
              <Text style={styles.endereco}>{imovel.endereco}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.btnEdit]}>
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnDelete]}>
              <Text style={styles.btnText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {imoveis.length === 0 && <Text style={styles.empty}>Nenhum imóvel cadastrado.</Text>}
    </ScrollView>
  );
}

const PRIMARY = "#4A47E0";
const DANGER = "#EF4444";

const styles = StyleSheet.create({
  screen: {
    padding: 18,
    paddingBottom: 40,
    backgroundColor: "#F6F7FB",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF2FF",
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  meta: {
    width: 86,
    alignItems: "flex-start",
  },
  code: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  codeValue: {
    fontSize: 12,
    color: "#374151",
    marginTop: 4,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  imovelTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  preco: {
    fontSize: 14,
    color: PRIMARY,
    fontWeight: "700",
  },
  endereco: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
  },
  actions: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 92,
    alignItems: "center",
  },
  btnEdit: {
    backgroundColor: PRIMARY,
  },
  btnDelete: {
    backgroundColor: DANGER,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  empty: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 30,
    fontSize: 16,
  },
});
