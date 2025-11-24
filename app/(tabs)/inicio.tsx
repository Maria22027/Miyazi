import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Image 
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Quando o usuário clicar em um imóvel
  function handleCardPress(title: string) {
    console.log("Clicou no imóvel:", title);
    // Mais tarde: router.push(`../detalhes/${id}`);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        {/* ---------- TÍTULO ---------- */}
        <Text style={styles.title}>Encontre o imóvel perfeito</Text>
        <Text style={styles.subtitle}>Casas, apartamentos e muito mais ao seu alcance</Text>

        {/* ---------- BARRA DE PESQUISA ---------- */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Pesquisar cidade, bairro ou tipo..."
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- SEÇÃO IMÓVEIS EM DESTAQUE (GRID 2x3) ---------- */}
        <Text style={styles.sectionTitle}>Imóveis em Destaque</Text>

        <View style={styles.gridContainer}>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => handleCardPress("Casa moderna")}
          >
            <Image source={{ uri: "https://i.imgur.com/YpFQv1i.jpg" }} style={styles.gridImage}/>
            <Text style={styles.gridTitle}>Casa moderna</Text>
            <Text style={styles.gridDesc}>3 quartos • Centro</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => handleCardPress("Apto com vista")}
          >
            <Image source={{ uri: "https://i.imgur.com/dxJDz4X.jpg" }} style={styles.gridImage}/>
            <Text style={styles.gridTitle}>Apto com vista</Text>
            <Text style={styles.gridDesc}>2 quartos • Vista livre</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => handleCardPress("Casa gourmet")}
          >
            <Image source={{ uri: "https://i.imgur.com/ZRkR2yJ.jpg" }} style={styles.gridImage}/>
            <Text style={styles.gridTitle}>Casa gourmet</Text>
            <Text style={styles.gridDesc}>Piscina • 240m²</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => handleCardPress("Apartamento novo")}
          >
            <Image source={{ uri: "https://i.imgur.com/2fZxwbM.jpg" }} style={styles.gridImage}/>
            <Text style={styles.gridTitle}>Apartamento novo</Text>
            <Text style={styles.gridDesc}>1 suíte • Garagem</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => handleCardPress("Casa espaçosa")}
          >
            <Image source={{ uri: "https://i.imgur.com/6PjWHYi.jpg" }} style={styles.gridImage}/>
            <Text style={styles.gridTitle}>Casa espaçosa</Text>
            <Text style={styles.gridDesc}>4 quartos • Bairro nobre</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => handleCardPress("Studio compacto")}
          >
            <Image source={{ uri: "https://i.imgur.com/q6QqV7F.jpg" }} style={styles.gridImage}/>
            <Text style={styles.gridTitle}>Studio compacto</Text>
            <Text style={styles.gridDesc}>Próx. faculdade</Text>
          </TouchableOpacity>

        </View>

        {/* ---------- CATEGORIAS EXPANSÍVEIS ---------- */}
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setCategoriesOpen(!categoriesOpen)}
        >
          <Text style={styles.categoryButtonText}>
            Categorias {categoriesOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {categoriesOpen && (
          <View style={styles.categoryDropdown}>
            <TouchableOpacity
              style={styles.categoryOption}
              onPress={() => router.push("../categorias/casas")}
            >
              <Text style={styles.categoryOptionText}>Casas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryOption}
              onPress={() => router.push("../categorias/apartamentos")}
            >
              <Text style={styles.categoryOptionText}>Apartamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryOption}
              onPress={() => router.push("../categorias/aluguel")}
            >
              <Text style={styles.categoryOptionText}>Aluguel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryOption}
              onPress={() => router.push("../categorias/venda")}
            >
              <Text style={styles.categoryOptionText}>Venda</Text>
            </TouchableOpacity>
                <TouchableOpacity
              style={styles.categoryOption}
              onPress={() => router.push("../categorias/todos")}
            >
              <Text style={styles.categoryOptionText}>Todos os imóveis</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ---------- CONTATO ----------- */}
        <Text style={styles.sectionTitle}>Fale Conosco</Text>
        <Text style={styles.contactText}>Telefone: (11) 99999-9999</Text>
        <Text style={styles.contactText}>Email: contato@imobiliaria.com</Text>
        <Text style={styles.contactText}>Endereço: Rua Central, 100 - SP</Text>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ---------- MENU FLUTUANTE ---------- */}
      <View style={styles.floatingMenuContainer}>
        {menuOpen && (
          <View style={styles.menuOptions}>
            <TouchableOpacity style={styles.menuOption} onPress={() => router.push("../empresa")}>
              <Text style={styles.menuOptionText}>Empresa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => router.push("../chat")}>
              <Text style={styles.menuOptionText}>Chatbot</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => router.push("../register")}>
              <Text style={styles.menuOptionText}>Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => router.push("../login")}>
              <Text style={styles.menuOptionText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Text style={styles.floatingButtonText}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    padding: 20,
  },

  /* TÍTULOS */
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },

  /* PESQUISA */
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F0F0F5",
    padding: 12,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: "#4A47E0",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  /* GRID DE IMÓVEIS */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  gridItem: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    overflow: "hidden",
  },

  gridImage: {
    width: "100%",
    height: 130,
  },

  gridTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    paddingHorizontal: 8,
  },

  gridDesc: {
    fontSize: 13,
    color: "#555",
    paddingHorizontal: 8,
    marginBottom: 8,
  },

  /* CATEGORIAS EXPANSÍVEIS */
  categoryButton: {
    backgroundColor: "#4A47E0",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  categoryButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  categoryDropdown: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 4,
    marginBottom: 20,
  },
  categoryOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  categoryOptionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },

  /* CONTATO */
  contactText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
  },

  /* MENU FLUTUANTE */
  floatingMenuContainer: {
    position: "absolute",
    bottom: 30,
    right: 25,
    alignItems: "flex-end",
  },
  floatingButton: {
    backgroundColor: "#4A47E0",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingButtonText: {
    color: "#FFF",
    fontSize: 30,
    marginTop: -2,
  },
  menuOptions: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 8,
    width: 160,
  },
  menuOption: {
    paddingVertical: 10,
  },
  menuOptionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});
