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
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ padding: 20, backgroundColor: "#F2F4F7" }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            marginBottom: 25,
            color: "#1e293b",
          }}
        >
          Painel do Corretor
        </Text>

        {imoveis.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              marginBottom: 24,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Image
              source={{ uri: item.imagem }}
              style={{
                width: "100%",
                height: 190,
              }}
            />

            <View style={{ padding: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1e293b" }}>
                {item.titulo}
              </Text>

              <Text style={{ color: "#6b7280", marginTop: 6, fontSize: 15 }}>
                {item.desc}
              </Text>

              <View style={{ marginTop: 15 }}>
                <Link
                  href={`../imoveis/${item.id}`}
                  style={{
                    backgroundColor: "#2563eb",
                    paddingVertical: 12,
                    borderRadius: 12,
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  Ver Detalhes
                </Link>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 🔵 Botão flutuante + Menu */}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          alignItems: "center",
        }}
      >
        {menuOpen && (
          <View
            style={{
              marginBottom: 15,
              backgroundColor: "white",
              padding: 15,
              borderRadius: 18,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 10,
              elevation: 6,
              gap: 14,
            }}
          >
            <Link href="../corretor/pedido" asChild>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#2563eb" }}
                >
                  Fazer Pedido
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="../corretor/imoveis" asChild>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#2563eb" }}
                >
                  Imóveis
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setMenuOpen(!menuOpen)}
          style={{
            width: 70,
            height: 70,
            backgroundColor: "#2563eb",
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 32 }}>
            {menuOpen ? "✖" : "☰"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
