import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Property } from '@/types';
import { fetchProperties } from '@/api/properties/imoveis';
import { useAuth } from '@/context/AuthContext';

type Address = {
  city: string;
  state: string;
  neighborhood: string;
};

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tudo');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isCorretor } = useAuth(); // Adicionado user

  // Buscar imóveis da API
  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await fetchProperties();
      setProperties(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os imóveis');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleSearchCEP = async () => {
    if (!cep || cep.length !== 8) {
      Alert.alert('CEP inválido', 'Digite 8 números');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
        return;
      }

      setAddress({
        city: data.localidade,
        state: data.uf,
        neighborhood: data.bairro,
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProperties();
  };

  const PropertyCard = ({ property }: { property: Property }) => {
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('PropertyDetails', { 
          id: property.id,
          title: property.title,
          type: property.type,
          price: property.price,
          description: property.description,
          image: property.image,
          location: property.location,
          area: property.area,
          rooms: property.rooms,
          bathrooms: property.bathrooms,
          features: JSON.stringify(property.features || [])
        })}
      >
        <Image
          source={{ uri: property.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>{property.type}</Text>
        </View>
        <Text style={styles.cardTitle}>{property.title}</Text>
        <Text style={styles.cardSub}>{property.location}</Text>
        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="bed-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{property.rooms} quartos</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="resize-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{property.area}m²</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.detailText}>R$ {property.price.toLocaleString('pt-BR')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Filtrar propriedades baseado na seleção
  const filteredProperties = properties.filter(property => {
    if (activeFilter === 'Tudo') return true;
    return property.type.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <ScrollView style={styles.container}>
      {/* Campo de CEP */}
      <View style={styles.cepContainer}>
        <TextInput
          style={styles.cepInput}
          placeholder="Digite seu CEP"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cep}
          onChangeText={setCep}
          maxLength={8}
        />
        <TouchableOpacity
          style={styles.cepButton}
          onPress={handleSearchCEP}
          disabled={cep.length !== 8}
        >
          <Text style={styles.cepButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Exibição do endereço */}
      {address && (
        <View style={styles.addressContainer}>
          <Ionicons name="location" size={16} color="#004d40" />
          <Text style={styles.addressText}>
            {address.neighborhood}, {address.city} - {address.state}
          </Text>
        </View>
      )}

      {/* Botão de perfil */}
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('register')}>
        <Ionicons name="person-circle-outline" size={30} color="#004d40" />
      </TouchableOpacity>

      {/* Conteúdo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.location}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <Text style={styles.locationText}>Praia Grande - SP</Text>
        </TouchableOpacity>
        <Image source={{ uri: 'https://i.imgur.com/Zx8zeJw.png' }} style={styles.logo} />
      </View>

      {/* Saudação personalizada com base no tipo de usuário */}
      <Text style={styles.title}>
        Olá, <Text style={styles.bold}>
          {user?.tipo === 'corretor' ? 'Corretor' : 'Cliente'}
        </Text>
      </Text>
      <Text style={styles.subtitle}>Vamos explorar?</Text>

      {/* Pesquisar */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#ccc" />
        <TextInput
          placeholder="Pesquisa..."
          style={styles.searchInput}
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Feather name="mic" size={20} color="#ccc" />
      </View>

      <View style={styles.filters}>
        {['Tudo', 'Casa', 'Apartamento', 'Lançamento'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.filterButton, activeFilter === item && styles.selectedFilter]}
            onPress={() => setActiveFilter(item)}
          >
            <Text style={[styles.filterText, activeFilter === item && styles.selectedFilterText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#004d40" />
          <Text style={styles.loadingText}>Carregando imóveis...</Text>
        </View>
      ) : (
        <>
          {/* Destaques */}
          <Text style={styles.sectionTitle}>Destaques</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
            {filteredProperties
              .filter(prop => prop.type === 'Apartamento')
              .slice(0, 3)
              .map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </ScrollView>

          {/* Casas */}
          <Text style={styles.sectionTitle}>Casas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
            {filteredProperties
              .filter(prop => prop.type === 'Casa')
              .slice(0, 3)
              .map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </ScrollView>
        </>
      )}

      {/* Botão flutuante do chatbot */}
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('chatbot')}>
        <MaterialIcons name="chat" size={24} color="white" />
      </TouchableOpacity>

      {/* Botão flutuante para adicionar imóvel (apenas corretores) */}
      {isCorretor && (
        <TouchableOpacity 
          style={[styles.chatButton, { bottom: 100 }]} 
          onPress={() => navigation.navigate('add-property')}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 13,
    marginTop: 16,
  },
  cepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    color: '#000',
  },
  cepButton: {
    backgroundColor: '#004d40',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cepButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressText: {
    marginLeft: 8,
    color: '#004d40',
    fontWeight: 'bold',
  },
  profileButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    color: '#000',
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  selectedFilter: {
    backgroundColor: '#004d40',
  },
  filterText: {
    color: '#333',
  },
  selectedFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContainer: {
    marginBottom: 24,
  },
  card: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  cardSub: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  cardButton: {
    color: '#004d40',
    fontWeight: 'bold',
    margin: 8,
  },
  chatButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#004d40',
    borderRadius: 50,
    padding: 16,
    elevation: 4,
  },
  cardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#004d40',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  cardBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
});