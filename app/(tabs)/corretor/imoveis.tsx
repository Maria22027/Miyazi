import { View, Text, Image, ScrollView } from "react-native";
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
    <ScrollView style={{ padding: 20, backgroundColor: "#f5f5f5" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Imóveis Cadastrados
      </Text>

      {imoveis.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            marginBottom: 20,
            overflow: "hidden",
            elevation: 3,
          }}
        >
          <Image
            source={{ uri: item.imagem }}
            style={{ width: "100%", height: 180 }}
          />

          <View style={{ padding: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.titulo}
            </Text>

            <Text style={{ color: "#666", marginTop: 4 }}>{item.desc}</Text>

            <View style={{ marginTop: 12 }}>
              <Link
                href={`../corretor/imoveis/${item.id}`}
                style={{
                  backgroundColor: "#2563eb",
                  padding: 10,
                  borderRadius: 8,
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Detalhes
              </Link>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
