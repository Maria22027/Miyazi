import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';

export default function Empresa() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://miyazi.com.br/wp-content/uploads/2025/02/logo-novo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Nossa Empresa</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa História</Text>
        <Text style={styles.sectionText}>
          Fundada em 2010, a Imobiliária XYZ tem como objetivo transformar sonhos em realidade.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Missão</Text>
        <Text style={styles.sectionText}>
          Proporcionar a melhor experiência na compra, venda e locação de imóveis.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visão</Text>
        <Text style={styles.sectionText}>
          Ser referência no mercado imobiliário com inovação e qualidade.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Valores</Text>
        <Text style={styles.sectionText}>
          Transparência, Ética, Comprometimento e Respeito.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },

  banner: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#4B7BEC',
  },
  logo: { width: 120, height: 120, marginBottom: 15 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold' },

  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  sectionText: { fontSize: 16, color: '#555', lineHeight: 22 },
});
