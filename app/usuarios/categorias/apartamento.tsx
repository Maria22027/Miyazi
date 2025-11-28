import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Casas() {
  const imoveis = [
    {
      titulo: "Casa moderna",
      desc: "3 quartos • Centro",
      imagem: "https://placehold.co/500x350",
      url: "../usuarios/imoveis/casa1",
    },
    {
      titulo: "Apto com vista",
      desc: "2 quartos • Vista livre",
      imagem: "https://placehold.co/500x350",
      url: "../usuarios/imoveis/casa1",
    },
    {
      titulo: "Casa gourmet",
      desc: "Piscina • 240m²",
      imagem: "https://placehold.co/500x350",
      url: "../usuarios/imoveis/casa1",
    },
  ];

  const normalizeRoute = (u?: string) => {
    if (!u || typeof u !== "string") return "/";
    const cleaned = u.replace(/^(\.\/|\.\.\/)+/, "");
    return cleaned.startsWith("/") ? cleaned : "/" + cleaned;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F2F4F7", padding: 20 }}
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
        Casas
      </Text>

      <View style={{ gap: 22 }}>
        {imoveis.map((item, index) => {
          const route = normalizeRoute(item.url);

          return (
            <Link key={index} href={route as any} asChild>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <Image
                  source={{ uri: item.imagem }}
                  style={{
                    width: "100%",
                    height: 180,
                  }}
                />

                <View style={{ padding: 15 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {item.titulo}
                  </Text>

                  <Text
                    style={{
                      color: "#6b7280",
                      marginTop: 6,
                      fontSize: 15,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
}
