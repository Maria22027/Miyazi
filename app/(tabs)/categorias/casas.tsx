import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Inicio() {
  const imoveis = [
    {
      titulo: "Casa moderna",
      desc: "3 quartos • Centro",
      imagem: "https://placehold.co/300x200",
    },
    {
      titulo: "Apto com vista",
      desc: "2 quartos • Vista livre",
      imagem: "https://placehold.co/300x200",
    },
    {
      titulo: "Casa gourmet",
      desc: "Piscina • 240m²",
      imagem: "https://placehold.co/300x200",
    },
    {
      titulo: "Apartamento novo",
      desc: "1 suíte • Garagem",
      imagem: "https://placehold.co/300x200",
    },
    {
      titulo: "Casa espaçosa",
      desc: "4 quartos • Bairro nobre",
      imagem: "https://placehold.co/300x200",
    },
    {
      titulo: "Studio compacto",
      desc: "Próx. faculdade",
      imagem: "https://placehold.co/300x200",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <Text style={styles.titulo}></Text>
      <Text style={styles.titulo}>Casas</Text>

      <View style={styles.grid}>
        {imoveis.map((item, index) => (
          <Link
            href={{
              pathname: "../detalhesCasa",
              params: {
                titulo: item.titulo,
                desc: item.desc,
                imagem: item.imagem,
              },
            }}
            asChild
            key={index}
          >
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // <- FUNDO BRANCO GARANTIDO
    paddingHorizontal: 15,
  },

  containerContent: {
    backgroundColor: "#fff", // <- FAZ O ScrollView FICAR TOTALMENTE BRANCO
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  imagem: {
    width: "100%",
    height: 110,
  },

  info: {
    padding: 10,
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 13,
    color: "#555",
  },
});

