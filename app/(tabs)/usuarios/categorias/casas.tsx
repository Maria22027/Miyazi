import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { styles } from "react-native-gifted-chat/src/Constant";

export default function Casas() {
  const imoveis = [
    {
      titulo: "Casa moderna",
      desc: "3 quartos • Centro",
      imagem: "https://placehold.co/300x200",
      url: "../categorias/imoveis/casa1",
    },
    {
      titulo: "Apto com vista",
      desc: "2 quartos • Vista livre",
      imagem: "https://placehold.co/300x200",
      url: "../categorias/imoveis/apto1",
    },
    {
      titulo: "Casa gourmet",
      desc: "Piscina • 240m²",
      imagem: "https://placehold.co/300x200",
      url: "/categorias/imoveis/casa2", // já absoluta - ok
    },
  ];

  // Função que normaliza a rota para começar com "/"
  const normalizeRoute = (u?: string) => {
    if (!u || typeof u !== "string") return "/"; // rota fallback
    // Remove repetições de "./" ou "../" do começo e garante a barra inicial
    const cleaned = u.replace(/^(\.\/|\.\.\/)+/, "");
    return cleaned.startsWith("/") ? cleaned : "/" + cleaned;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
      <Text style={styles.titulo}>Casas</Text>

      <View style={styles.grid}>
        {imoveis.map((item, index) => {
          const route = normalizeRoute(item.url);

          return (
            <Link key={index} href={route as any} asChild>
              <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <Image source={{ uri: item.imagem }} style={styles.imagem} />

                <View style={styles.info}>
                  <Text style={styles.cardTitulo}>{item.titulo}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
}



