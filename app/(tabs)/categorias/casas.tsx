import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

type Casa = {
  id: string;
  title: string;
  price: string;
  image: string;
  type: 'comprar' | 'alugar' | 'temporada';
  description: string;
};

const casas: Casa[] = [
  {
    id: '1',
    title: 'Casa moderna no centro',
    price: 'R$ 550.000',
    image: 'https://i.imgur.com/Z8Kf3O9.jpg',
    type: 'comprar',
    description: 'Casa moderna com 3 quartos, 2 banheiros e área gourmet.',
  },
  {
    id: '2',
    title: 'Apartamento de temporada',
    price: 'R$ 250/dia',
    image: 'https://i.imgur.com/0Q1pI3y.jpg',
    type: 'temporada',
    description: 'Apartamento próximo à praia, perfeito para família.',
  },
  {
    id: '3',
    title: 'Casa para alugar',
    price: 'R$ 1.800/mês',
    image: 'https://i.imgur.com/wT4cMZC.jpg',
    type: 'alugar',
    description: 'Casa ampla, recém reformada, ideal para morar.',
  },
  {
    id: '4',
    title: 'Cobertura à venda',
    price: 'R$ 850.000',
    image: 'https://i.imgur.com/7W2D1zL.jpg',
    type: 'comprar',
    description: 'Cobertura com vista para o mar e piscina privativa.',
  },
];

export default function Casas() {
  const [selectedType, setSelectedType] = useState<'comprar' | 'alugar' | 'temporada'>('comprar');

  const filteredCasas = casas.filter(casa => casa.type === selectedType);

  return (
    <View style={styles.container}>
      
      {/* MENU */}
      <View style={styles.menu}>
        {['comprar', 'alugar', 'temporada'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.menuButton, selectedType === type && styles.menuButtonActive]}
            onPress={() => setSelectedType(type as any)}
          >
            <Text style={[styles.menuText, selectedType === type && styles.menuTextActive]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredCasas}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "../detalhesCasa",
              params: { 
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                description: item.description
              }
            }}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#4B7BEC',
  },

  menuButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#5A8DFD88',
  },

  menuButtonActive: {
    backgroundColor: '#fff',
  },

  menuText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  menuTextActive: {
    color: '#4B7BEC',
  },

  list: { padding: 15 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },

  image: { width: '100%', height: 180 },

  cardContent: { padding: 10 },

  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },

  price: { fontSize: 16, color: '#4B7BEC', marginTop: 5 },
});
