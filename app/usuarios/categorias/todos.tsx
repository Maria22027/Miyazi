import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

export default function Inicio() {
  const imoveis = [
    {
      titulo: "Casa moderna",
      desc: "3 quartos • Centro",
      imagem: "https://placehold.co/300x200",
      tipo: "casa",
      negocio: "venda",
    },
    {
      titulo: "Terreno amplo",
      desc: "400m² • Bairro tranquilo",
      imagem: "https://placehold.co/300x200",
      tipo: "terreno",
      negocio: "venda",
    },
    {
      titulo: "Apto com vista",
      desc: "2 quartos • Vista livre",
      imagem: "https://placehold.co/300x200",
      tipo: "apartamento",
      negocio: "aluguel",
    },
    {
      titulo: "Apartamento novo",
      desc: "1 suíte • Garagem",
      imagem: "https://placehold.co/300x200",
      tipo: "apartamento",
      negocio: "venda",
    },
    {
      titulo: "Casa espaçosa",
      desc: "4 quartos • Bairro nobre",
      imagem: "https://placehold.co/300x200",
      tipo: "casa",
      negocio: "aluguel",
    },
  ];

  const [menuAberto, setMenuAberto] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: "todos",
    negocio: "todos",
  });

  const filtrarImoveis = () => {
    return imoveis.filter((item) => {
      const tipoOK =
        filtros.tipo === "todos" || item.tipo === filtros.tipo;
      const negocioOK =
        filtros.negocio === "todos" || item.negocio === filtros.negocio;
      return tipoOK && negocioOK;
    });
  };

  const filtrados = filtrarImoveis();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.botaoFiltro}
        onPress={() => setMenuAberto(!menuAberto)}
      >
        <Text style={styles.textoBotaoFiltro}>Filtrar imóveis ▾</Text>
      </TouchableOpacity>

      {menuAberto && (
        <View style={styles.menu}>
          <Text style={styles.menuTitulo}>Tipo de imóvel</Text>

          {["todos", "casa", "apartamento", "terreno"].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                styles.opcao,
                filtros.tipo === tipo && styles.opcaoAtiva,
              ]}
              onPress={() => setFiltros({ ...filtros, tipo })}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  filtros.tipo === tipo && styles.textoOpcaoAtiva,
                ]}
              >
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.menuTitulo}>Negócio</Text>

          {["todos", "venda", "aluguel"].map((negocio) => (
            <TouchableOpacity
              key={negocio}
              style={[
                styles.opcao,
                filtros.negocio === negocio && styles.opcaoAtiva,
              ]}
              onPress={() => setFiltros({ ...filtros, negocio })}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  filtros.negocio === negocio && styles.textoOpcaoAtiva,
                ]}
              >
                {negocio.charAt(0).toUpperCase() + negocio.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.titulo}>Imóveis</Text>

      <View style={styles.grid}>
        {filtrados.map((item, index) => (
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
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 10 },

  botaoFiltro: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoBotaoFiltro: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  menu: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  menuTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },
  opcao: {
    padding: 10,
    backgroundColor: "#ececec",
    marginBottom: 6,
    borderRadius: 8,
  },
  opcaoAtiva: {
    backgroundColor: "#1e90ff",
  },
  textoOpcao: { fontSize: 15 },
  textoOpcaoAtiva: { color: "#fff", fontWeight: "bold" },

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
  },
  imagem: { width: "100%", height: 110 },
  info: { padding: 10 },
  cardTitulo: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  cardDesc: { fontSize: 13, color: "#555" },
});
