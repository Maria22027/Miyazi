import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

type Property = {
  id: string;
  title: string;
  type: string;
  price: number;
  description: string;
  image: string;
  location: string;
  area: number;
  rooms: number;
  bathrooms: number;
  features?: string[];
};

const PropertyDetails = () => {
  const params = useLocalSearchParams();
  
  // Se não houver parâmetros, mostrar loading
  if (!params || Object.keys(params).length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#004d40" />
      </View>
    );
  }

  // Converter os parâmetros para o objeto Property
  const property: Property = {
    id: params.id as string,
    title: params.title as string,
    type: params.type as string,
    price: Number(params.price),
    description: params.description as string,
    image: params.image as string,
    location: params.location as string,
    area: Number(params.area),
    rooms: Number(params.rooms),
    bathrooms: Number(params.bathrooms),
    features: params.features ? JSON.parse(params.features as string) : []
  };

  const handleContact = () => {
    Linking.openURL('tel:+5511999999999');
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: property.image }} style={styles.propertyImage} />
      
      <View style={styles.header}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={16} /> {property.location}
        </Text>
        <Text style={styles.price}>R$ {property.price.toLocaleString('pt-BR')}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="bed-outline" size={24} color="#004d40" />
            <Text style={styles.detailText}>{property.rooms} Quartos</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="resize-outline" size={24} color="#004d40" />
            <Text style={styles.detailText}>{property.area}m²</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="car-outline" size={24} color="#004d40" />
            <Text style={styles.detailText}>2 Vagas</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={24} color="#004d40" />
            <Text style={styles.detailText}>{property.bathrooms} Banheiros</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{property.description}</Text>
      </View>
      
      {property.features && property.features.length > 0 && (
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Características</Text>
          <View style={styles.features}>
            {property.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#004d40" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      
      <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
        <Ionicons name="call-outline" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>Entrar em contato</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  propertyImage: {
    width: '100%',
    height: 300,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d40',
  },
  detailsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  descriptionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  featuresContainer: {
    padding: 20,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  contactButton: {
    margin: 20,
    backgroundColor: '#004d40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default PropertyDetails; 