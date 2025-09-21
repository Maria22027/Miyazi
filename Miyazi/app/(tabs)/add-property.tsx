import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const AddPropertyScreen = () => {
  const navigation = useNavigation();
  const { isCorretor, loading: authLoading, user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    price: '',
    description: '',
    location: '',
    area: '',
    rooms: '',
    bathrooms: '',
    features: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  if (authLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2A4D73" />
      </View>
    );
  }

  if (!isCorretor) {
    return (
      <View style={styles.container}>
        <Text style={styles.accessDeniedText}>Acesso Restrito</Text>
        <Text style={styles.accessDeniedMessage}>
          Somente corretores autorizados podem cadastrar imóveis.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || images.length === 0) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios e adicione pelo menos uma foto');
      return;
    }

    setUploading(true);
    
    try {
      // Em desenvolvimento, mostra dados no console e alerta
      if (__DEV__) {
        const propertyData = {
          ...formData,
          price: Number(formData.price),
          area: Number(formData.area) || 0,
          rooms: Number(formData.rooms) || 0,
          bathrooms: Number(formData.bathrooms) || 0,
          features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
          images: images,
          corretorId: user?.id,
          creci: user?.creci
        };
        
        console.log('Dados do imóvel (modo demonstração):', propertyData);
        Alert.alert(
          'Modo Demonstração', 
          'Dados exibidos no console. Em produção, seriam enviados para o servidor.'
        );
        navigation.goBack();
        return;
      }

      // Em produção, envia para a API
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          area: Number(formData.area) || 0,
          rooms: Number(formData.rooms) || 0,
          bathrooms: Number(formData.bathrooms) || 0,
          features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
          images: images,
          corretorId: user?.id,
          creci: user?.creci
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Falha ao cadastrar imóvel');
      }

      Alert.alert('Sucesso', 'Imóvel cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      let errorMessage = 'Falha ao cadastrar imóvel';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      Alert.alert('Erro', errorMessage);
      console.error('Erro no cadastro:', error);
    } finally {
      setUploading(false);
    }
  };

    
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Imóvel</Text>

      {/* Upload de Fotos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fotos do Imóvel*</Text>
        <Text style={styles.sectionSubtitle}>Adicione pelo menos 3 fotos (máx. 10)</Text>
        
        <ScrollView horizontal style={styles.imagesContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.thumbnail} />
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => removeImage(index)}
              >
                <Ionicons name="close-circle" size={24} color="#ff4444" />
              </TouchableOpacity>
            </View>
          ))}
          
          {images.length < 10 && (
            <TouchableOpacity style={styles.addButton} onPress={pickImage}>
              <Ionicons name="add" size={40} color="#2A4D73" />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Campos do formulário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Básicas</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Título*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Apartamento com vista para o mar"
            value={formData.title}
            onChangeText={(text) => handleChange('title', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Imóvel*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Apartamento, Casa, Terreno"
            value={formData.type}
            onChangeText={(text) => handleChange('type', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Preço (R$)*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 350000"
            keyboardType="numeric"
            value={formData.price}
            onChangeText={(text) => handleChange('price', text)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalhes</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Localização*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Praia Grande - SP"
            value={formData.location}
            onChangeText={(text) => handleChange('location', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Área Construída (m²)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 72"
            keyboardType="numeric"
            value={formData.area}
            onChangeText={(text) => handleChange('area', text)}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.halfInput]}>
            <Text style={styles.label}>Quartos</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              keyboardType="numeric"
              value={formData.rooms}
              onChangeText={(text) => handleChange('rooms', text)}
            />
          </View>

          <View style={[styles.formGroup, styles.halfInput]}>
            <Text style={styles.label}>Banheiros</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              keyboardType="numeric"
              value={formData.bathrooms}
              onChangeText={(text) => handleChange('bathrooms', text)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Comodidades</Text>
          <TextInput
            style={styles.input}
            placeholder="Separe por vírgulas: piscina, garagem, academia..."
            value={formData.features}
            onChangeText={(text) => handleChange('features', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Descreva o imóvel com detalhes..."
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, uploading && styles.disabledButton]} 
        onPress={handleSubmit}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Cadastrar Imóvel</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2A4D73',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  imagesContainer: {
    marginBottom: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 15,
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  addButton: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: '#2A4D73',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addButtonText: {
    marginTop: 5,
    color: '#2A4D73',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#2A4D73',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accessDeniedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4444',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  accessDeniedMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2A4D73',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddPropertyScreen;