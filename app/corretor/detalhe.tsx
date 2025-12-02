import { useLocalSearchParams, Link } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function DetalhesImovel() {
  const { id } = useLocalSearchParams();

  const imovel = {
    id,
    codigo: `IMV-${id}-2025`,
    titulo: "Casa Moderna",
    descricao: "Casa espaçosa com 3 quartos localizada no centro da cidade.",
    imagem: "https://picsum.photos/seed/detalhe/900/600",
    info: {
      quartos: 3,
      suites: 1,
      banheiros: 2,
      vagas: 2,
      area: "150m²",
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imovel.imagem }} style={styles.imagem} />

      <View style={styles.conteudo}>
        <Text style={styles.codigo}>Código do imóvel: {imovel.codigo}</Text>
        <Text style={styles.titulo}>{imovel.titulo}</Text>
        <Text style={styles.descricao}>{imovel.descricao}</Text>

        <View style={styles.cardInfo}>
          <Text style={styles.infoTitulo}>Informações</Text>
          <Text>Quartos: {imovel.info.quartos}</Text>
          <Text>Suítes: {imovel.info.suites}</Text>
          <Text>Banheiros: {imovel.info.banheiros}</Text>
          <Text>Vagas: {imovel.info.vagas}</Text>
          <Text>Área: {imovel.info.area}</Text>
        </View>

        <Link href={`../fazer-pedido/${id}`} asChild>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>Fazer Pedido</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F3F4F6" },
  imagem: { width: "100%", height: 260 },
  conteudo: { padding: 20 },
  codigo: { color: "#6B7280", marginBottom: 6, fontSize: 14 },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#111827" },
  descricao: { color: "#6B7280", marginTop: 10 },

  cardInfo: {
    backgroundColor: "#FFF",
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
    elevation: 3,
  },
  infoTitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  botao: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
  },
  botaoTexto: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
