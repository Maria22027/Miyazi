import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function InicioCorretor() {
  const [menuOpen, setMenuOpen] = useState(false);

  const imoveis = [
    {
      id: 1,
      titulo: "Casa Moderna",
      desc: "3 quartos • Centro",
      imagem: "https://picsum.photos/seed/im1/800/520",
      url: "../../corretor/detalhe",
    },
    {
      id: 2,
      titulo: "Apartamento Luxo",
      desc: "2 suítes • Vista Mar",
      imagem: "https://picsum.photos/seed/im2/800/520",
      url: "../../corretor/detalhe",
    },
    {
      id: 3,
      titulo: "Terreno Amplo",
      desc: "500m² • Bairro Novo",
      imagem: "https://picsum.photos/seed/im3/800/520",
      url: "../../corretor/detalhe",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20, backgroundColor: "#f5f5f5" }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Painel do Corretor
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
                  href={`../imoveis/${item.id}`}
                  style={{
                    backgroundColor: "#2563eb",
                    padding: 10,
                    borderRadius: 8,
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Ver Detalhes
                </Link>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 🔥 Botão flutuante + Menu */}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          alignItems: "center",
        }}
      >
        {/* MENU EXPANDIDO */}
        {menuOpen && (
          <View
            style={{
              marginBottom: 15,
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 12,
              elevation: 5,
              gap: 12,
            }}
          >

            {/* FAZER PEDIDO */}
            <Link href="../corretor/pedido" asChild>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "green" }}>
                  Fazer Pedido
                </Text>
              </TouchableOpacity>
            </Link>

            {/* LISTA DE IMÓVEIS */}
            <Link href="../corretor/imoveis" asChild>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#8a2be2" }}>
                  Imóveis
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}

        {/* BOTÃO PRINCIPAL */}
        <TouchableOpacity
          onPress={() => setMenuOpen(!menuOpen)}
          style={{
            width: 70,
            height: 70,
            backgroundColor: "#2563eb",
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center",
            elevation: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 28 }}>
            {menuOpen ? "✖" : "☰"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
