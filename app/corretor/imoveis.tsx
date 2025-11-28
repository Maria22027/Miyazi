import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ListaImoveisCorretor() {
  const imoveis = [
    {
      id: 1,
      titulo: "Casa Moderna",
      desc: "3 quartos • Centro",
      imagem: "https://picsum.photos/seed/im1/800/520",
    },
    {
      id: 2,
      titulo: "Apartamento Luxo",
      desc: "2 suítes • Vista Mar",
      imagem: "https://picsum.photos/seed/im2/800/520",
    },
    {
      id: 3,
      titulo: "Terreno Amplo",
      desc: "500m² • Bairro Novo",
      imagem: "https://picsum.photos/seed/im3/800/520",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Imóveis Cadastrados</Text>

      {imoveis.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.imagem }} style={styles.imagem} />

          <View style={styles.info}>
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text style={styles.desc}>{item.desc}</Text>

            <Link
              href={`../corretor/imoveis/${item.id}`}
              style={styles.botao}
            >
              Detalhes
            </Link>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F3F4F6" },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginBottom: 20,
    elevation: 3,
    overflow: "hidden",
  },
  imagem: { width: "100%", height: 180 },
  info: { padding: 15 },
  nome: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  desc: { marginTop: 4, color: "#6B7280" },

  botao: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
