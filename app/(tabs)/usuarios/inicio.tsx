import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, 
  ScrollView, Image 
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  function handleCardPress(title: string) {
    console.log("Clicou no imóvel:", title);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        <Text style={styles.title}>Encontre o imóvel perfeito</Text>
        <Text style={styles.subtitle}>Casas, apartamentos e muito mais ao seu alcance</Text>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Pesquisar cidade, bairro ou tipo..." style={styles.searchInput} />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* DESTAQUES */}
        <Text style={styles.sectionTitle}>Imóveis em Destaque</Text>

        <View style={styles.gridContainer}>
          {[
            { title: "Casa moderna", img: "https://i.imgur.com/YpFQv1i.jpg", desc: "3 quartos • Centro" },
            { title: "Apto com vista", img: "https://i.imgur.com/dxJDz4X.jpg", desc: "2 quartos • Vista livre" },
            { title: "Casa gourmet", img: "https://i.imgur.com/ZRkR2yJ.jpg", desc: "Piscina • 240m²" },
            { title: "Apartamento novo", img: "https://i.imgur.com/2fZxwbM.jpg", desc: "1 suíte • Garagem" },
            { title: "Casa espaçosa", img: "https://i.imgur.com/6PjWHYi.jpg", desc: "4 quartos • Bairro nobre" },
            { title: "Studio compacto", img: "https://i.imgur.com/q6QqV7F.jpg", desc: "Próx. faculdade" },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.gridItem}
              onPress={() => handleCardPress(item.title)}
            >
              <Image source={{ uri: item.img }} style={styles.gridImage}/>
              <Text style={styles.gridTitle}>{item.title}</Text>
              <Text style={styles.gridDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CATEGORIAS */}
        <TouchableOpacity style={styles.categoryButton} onPress={() => setCategoriesOpen(!categoriesOpen)}>
          <Text style={styles.categoryButtonText}>Categorias {categoriesOpen ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        {categoriesOpen && (
          <View style={styles.categoryDropdown}>
            <TouchableOpacity style={styles.categoryOption} onPress={() => router.push("../usuarios/categorias/casas")}>
              <Text style={styles.categoryOptionText}>Casas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryOption} onPress={() => router.push("../usuarios/categorias/apartamentos")}>
              <Text style={styles.categoryOptionText}>Apartamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryOption} onPress={() => router.push("../usuarios/categorias/todos")}>
              <Text style={styles.categoryOptionText}>Todos os imóveis</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* CONTATO */}
        <Text style={styles.sectionTitle}>Fale Conosco</Text>
        <Text style={styles.contactText}>Telefone: (11) 99999-9999</Text>
        <Text style={styles.contactText}>Email: contato@imobiliaria.com</Text>
        <Text style={styles.contactText}>Endereço: Rua Central, 100 - SP</Text>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MENU FLUTUANTE */}
      <View style={styles.floatingMenuContainer}>
        {menuOpen && (
          <View style={styles.menuOptions}>
            <TouchableOpacity style={styles.menuOption} onPress={() => router.push("../usuarios/empresa")}>
              <Text style={styles.menuOptionText}>Empresa</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.floatingButton} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.floatingButtonText}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 20 },

  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#666", marginBottom: 25 },

  /* PESQUISA */
  searchContainer: { flexDirection: "row", gap: 10, marginBottom: 30 },
  searchInput: { flex: 1, backgroundColor: "#F0F0F5", padding: 12, borderRadius: 10 },
  searchButton: { backgroundColor: "#4A47E0", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  searchButtonText: { color: "#FFF", fontWeight: "bold" },

  /* DESTAQUE GRID */
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 10, marginBottom: 15 },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "48%", backgroundColor: "#FFF", borderRadius: 12, marginBottom: 20, elevation: 4, overflow: "hidden" },
  gridImage: { width: "100%", height: 130 },
  gridTitle: { fontSize: 16, fontWeight: "bold", paddingHorizontal: 8, marginTop: 8 },
  gridDesc: { fontSize: 13, color: "#555", paddingHorizontal: 8, marginBottom: 8 },

  /* DROPDOWN */
  categoryButton: { backgroundColor: "#4A47E0", padding: 15, borderRadius: 12, marginTop: 10 },
  categoryButtonText: { color: "#FFF", fontSize: 18, textAlign: "center", fontWeight: "bold" },

  categoryDropdown: { backgroundColor: "#FFF", borderRadius: 12, elevation: 4, marginBottom: 20 },
  categoryOption: { padding: 14, paddingHorizontal: 18 },
  categoryOptionText: { fontSize: 16, fontWeight: "600", color: "#333" },

  /* CONTATO */
  contactText: { fontSize: 15, marginBottom: 6 },

  /* MENU FLUTUANTE */
  floatingMenuContainer: { position: "absolute", bottom: 30, right: 25, alignItems: "flex-end" },
  floatingButton: { backgroundColor: "#4A47E0", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" },
  floatingButtonText: { color: "#FFF", fontSize: 28 },
  menuOptions: { backgroundColor: "#FFF", padding: 12, borderRadius: 12, elevation: 8, width: 160, marginBottom: 10 },
  menuOption: { paddingVertical: 10 },
  menuOptionText: { fontSize: 16, fontWeight: "600" },
});
