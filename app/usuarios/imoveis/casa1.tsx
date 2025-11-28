import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetalhesImovel() {
  const { titulo, desc, imagem } = useLocalSearchParams();

  const nome = titulo || "Imóvel disponível";
  const descricaoCurta = desc || "Informações do imóvel";
  const img = imagem || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.leroymerlin.com.br%2Finspire-se-fachadas-de-casas%2Ffachada-de-casa-com-portao&psig=AOvVaw0mjjrpKe5U2Q95VZH-h-pq&ust=1764369376000000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOji76myk5EDFQAAAAAdAAAAABAE";

  const telefone = "5511999999999";

  const enviarWhatsApp = () => {
    const msg = `Olá! Tenho interesse no imóvel: ${nome}.`;
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(msg)}`;
    Linking.openURL(url);
  };

  const ligarEmpresa = () => {
    Linking.openURL(`tel:${telefone}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
  source={{ uri: Array.isArray(img) ? img[0] : img ?? '' }}
  style={styles.imagemPrincipal}
/>
      <View style={styles.card}>
        <Text style={styles.titulo}>{nome}</Text>
        <Text style={styles.subtitulo}>{descricaoCurta}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoValor}>3</Text>
            <Text style={styles.infoLabel}>Quartos</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoValor}>2</Text>
            <Text style={styles.infoLabel}>Banheiros</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoValor}>1</Text>
            <Text style={styles.infoLabel}>Vaga</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoValor}>120m²</Text>
            <Text style={styles.infoLabel}>Área</Text>
          </View>
        </View>

        <Text style={styles.sectionTitulo}>Descrição</Text>
        <Text style={styles.descricaoTexto}>
          Este imóvel é ideal para quem busca conforto, segurança e boa localização.
        </Text>

        <Text style={styles.sectionTitulo}>Contato</Text>
        <View style={styles.contatoBox}>
          <Text style={styles.contatoTitulo}>Imobiliária Premium</Text>
          <Text style={styles.contatoInfo}>📞 Telefone: (11) 99999-9999</Text>
          <Text style={styles.contatoInfo}>📍 Rua Central, 123 – Centro</Text>

          <TouchableOpacity style={styles.botaoWhats} onPress={enviarWhatsApp}>
            <Text style={styles.botaoWhatsTexto}>Falar no WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoLigar} onPress={ligarEmpresa}>
            <Text style={styles.botaoLigarTexto}>Ligar agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  imagemPrincipal: { width: "100%", height: 250 },

  card: {
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 8,
  },

  titulo: { fontSize: 28, fontWeight: "bold" },
  subtitulo: { fontSize: 16, color: "#666", marginBottom: 20 },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  infoBox: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "22%",
  },
  infoValor: { fontSize: 18, fontWeight: "bold" },
  infoLabel: { fontSize: 12, color: "#666" },

  sectionTitulo: { fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 18 },
  descricaoTexto: { fontSize: 15, color: "#444", lineHeight: 22, marginBottom: 25 },

  contatoBox: { backgroundColor: "#f7f7f7", padding: 15, borderRadius: 12 },
  contatoTitulo: { fontSize: 18, fontWeight: "bold" },
  contatoInfo: { fontSize: 14, color: "#555", marginBottom: 4 },

  botaoWhats: {
    backgroundColor: "#25D366",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
  },
  botaoWhatsTexto: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  botaoLigar: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  botaoLigarTexto: { color: "#fff", fontSize: 17, fontWeight: "bold" },
});
