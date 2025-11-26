import { useLocalSearchParams, Link } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

export default function DetalhesImovel() {
  const { id } = useLocalSearchParams();

  // 🔹 Por enquanto, dados mock (depois substituímos pelo Firebase)
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
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Imagem principal */}
      <Image
        source={{ uri: imovel.imagem }}
        style={{ width: "100%", height: 250 }}
      />

      <View style={{ padding: 20 }}>
        {/* Código do imóvel */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 8,
            color: "#555",
          }}
        >
          Código do imóvel: {imovel.codigo}
        </Text>

        {/* Título */}
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>
          {imovel.titulo}
        </Text>

        {/* Descrição simples */}
        <Text style={{ fontSize: 14, color: "#666", marginTop: 10 }}>
          {imovel.descricao}
        </Text>

        {/* Informações técnicas */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Informações
          </Text>

          <Text>Quartos: {imovel.info.quartos}</Text>
          <Text>Suítes: {imovel.info.suites}</Text>
          <Text>Banheiros: {imovel.info.banheiros}</Text>
          <Text>Vagas: {imovel.info.vagas}</Text>
          <Text>Área: {imovel.info.area}</Text>
        </View>

        {/* Botão de Fazer Pedido */}
        <Link href={`../fazer-pedido/${id}`} asChild>
          <TouchableOpacity
            style={{
              marginTop: 25,
              backgroundColor: "#2563eb",
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Fazer Pedido
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}
