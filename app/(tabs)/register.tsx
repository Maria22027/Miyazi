import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/types';
import { registerUser, loginUser } from '@/api/users';
import { router } from 'expo-router';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  index: undefined; // Adicione esta linha
  Register: undefined;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  creci: string;
};

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isRealtor, setIsRealtor] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    creci: '',
  });

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return false;
    }

    if (!isLogin && !formData.name) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (isRealtor && !formData.creci) {
      Alert.alert('Erro', 'CRECI é obrigatório para corretores');
      return false;
    }

    return true;
  };

   const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
  const user = await loginUser(formData.email, formData.password);
  Alert.alert('Login realizado', `Bem-vindo de volta, ${user.name}!`);
  router.push('/'); // Navega para a raiz (index)
} else {
        const newUser: User = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          tipo: isRealtor ? 'corretor' : 'cliente',
          creci: formData.creci,
        };
        await registerUser(newUser);
        const accountType = isRealtor ? 'Corretor' : 'Cliente';
        Alert.alert('Sucesso', `Conta de ${accountType} criada com sucesso!`);
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Ionicons name="business" size={60} color="#2A4D73" />
          <Text style={styles.title}>
            {isLogin ? 'Acessar Conta' : 'Criar Conta'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? 'Faça login para continuar'
              : 'Preencha os campos para se cadastrar'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#6B9EBF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#6B9EBF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6B9EBF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
            />
          </View>

          {!isLogin && (
            <>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#6B9EBF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar Senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                />
              </View>

              {isRealtor && (
                <View style={styles.inputContainer}>
                  <Ionicons name="id-card-outline" size={20} color="#6B9EBF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="CRECI"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={formData.creci}
                    onChangeText={(text) => handleChange('creci', text)}
                  />
                </View>
              )}
            </>
          )}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.footerLink}>
              {isLogin ? 'Criar conta' : 'Faça login'}
            </Text>
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <TouchableOpacity
            style={styles.realtorButton}
            onPress={() => {
              setIsRealtor(!isRealtor);
              if (isRealtor) {
                handleChange('creci', '');
              }
            }}
          >
            <Text style={styles.realtorButtonText}>
              {isRealtor
                ? 'Voltar para cadastro de cliente'
                : 'Registrar como Corretor? Clique aqui'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4FD',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2A4D73',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B9EBF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    marginBottom: 30,
  },
  input: {
  flex: 1,
  paddingVertical: 15,
  paddingHorizontal: 15, // Adicione isso se precisar de padding horizontal
  fontSize: 16,
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: '#D9E6F2',
},
  button: {
    backgroundColor: '#2A4D73',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#6B9EBF',
    fontSize: 16,
  },
  footerLink: {
    color: '#2A4D73',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  realtorButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  realtorButtonText: {
    color: '#6B9EBF',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D9E6F2',
  },
  inputIcon: {
    marginRight: 10,
  },
 
});

export default RegisterScreen;
