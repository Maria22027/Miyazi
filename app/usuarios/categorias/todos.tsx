import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Imovel } from "../../../types/Imovel";

export default function TodosImoveis() {
  const [lista, setLista] = useState<Imovel[]>([]);
  const router = useRouter();

  const buscarImoveis = async () => {
    try {
      const resposta = await fetch("https://api-imobiliaria-757o.onrender.com");
      const data = await resposta.json();
      setLista(data);
    } catch (error) {
      console.log("Erro ao carregar imóveis:", error);
    }
  };

  useEffect(() => {
    buscarImoveis();
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      {lista.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            router.push({
              pathname: "/usuarios/imoveis/detalhe",
              params: {
                id: item.id,
                titulo: item.titulo,
                desc: item.descricao ?? "",
                imagem: item.imagem,
              },
            })
          }
          style={{
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        >
          <Image
            source={{ uri: item.imagem }}
            style={{ width: "100%", height: 160, borderRadius: 10 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            {item.titulo}
          </Text>
          <Text>{item.cidade}</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
            R$ {item.preco}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
