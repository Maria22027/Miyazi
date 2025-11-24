import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Casas() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* ---- BARRA AZUL ---- */}
      <View
        style={{
          width: "100%",
          height: 120,
          backgroundColor: "#1E88E5",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 26, fontWeight: "bold" }}>
          Imóveis
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
          Casas Disponíveis
        </Text>

        {/* ---- CASA 1 ---- */}
        <Link
          href={{
            pathname: "../detalhesCasa",
            params: { id: 1, tipo: "alugar" },
          }}
          asChild
        >
          <TouchableOpacity style={{ marginBottom: 25 }}>
            <Image
              source={{ uri: "https://picsum.photos/400/250" }}
              style={{ width: "100%", height: 200, borderRadius: 12 }}
            />
            <Text
              style={{
                marginTop: 8,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Casa 1 – R$ 1.500 / mês
            </Text>
          </TouchableOpacity>
        </Link>

        {/* ---- CASA 2 ---- */}
        <Link
          href={{
            pathname: "../detalhesCasa",
            params: { id: 2, tipo: "temporada" },
          }}
          asChild
        >
          <TouchableOpacity style={{ marginBottom: 25 }}>
            <Image
              source={{ uri: "https://picsum.photos/400/260" }}
              style={{ width: "100%", height: 200, borderRadius: 12 }}
            />
            <Text
              style={{
                marginTop: 8,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Casa 2 – R$ 300 / dia
            </Text>
          </TouchableOpacity>
        </Link>

        {/* ---- CASA 3 ---- */}
        <Link
          href={{
            pathname: "../detalhesCasa",
            params: { id: 3, tipo: "comprar" },
          }}
          asChild
        >
          <TouchableOpacity style={{ marginBottom: 25 }}>
            <Image
              source={{ uri: "https://picsum.photos/400/270" }}
              style={{ width: "100%", height: 200, borderRadius: 12 }}
            />
            <Text
              style={{
                marginTop: 8,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Casa 3 – R$ 450.000
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}
