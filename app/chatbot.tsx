import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator // Adicionei a importação aqui
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type Preference = {
  propertyType?: string;
  budget?: string;
  location?: string;
  bedrooms?: number;
  amenities?: string[];
};

// Configurações do Dialogflow
const DIALOGFLOW_PROJECT_ID = 'seu-project-id';
const DIALOGFLOW_SESSION_ID = 'unique-session-id';
const DIALOGFLOW_LANGUAGE_CODE = 'pt-BR';

const Chatbot = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Olá! Sou o assistente virtual da Miyazi. Vou te ajudar a encontrar o imóvel perfeito!",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      text: "Primeiro, me diga que tipo de imóvel você está procurando? (casa, apartamento ou terreno)",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [preferences, setPreferences] = useState<Preference>({});
  const [step, setStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const steps = [
    {
      question: "Qual sua faixa de orçamento?",
      key: 'budget'
    },
    {
      question: "Em qual região você deseja o imóvel?",
      key: 'location'
    },
    {
      question: "Quantos quartos você precisa?",
      key: 'bedrooms'
    },
    {
      question: "Quais comodidades são essenciais? (piscina, garagem, área gourmet, etc.)",
      key: 'amenities'
    }
  ];

  const validatePropertyType = (input: string): boolean => {
    const normalizedInput = input.toLowerCase();
    return (
      normalizedInput.includes('casa') || 
      normalizedInput.includes('apartamento') || 
      normalizedInput.includes('terreno')
    );
  };

  // Obter token de acesso para Dialogflow
  const getAccessToken = async (): Promise<string> => {
    // Em produção, você deve obter este token do seu backend
    return 'seu-access-token';
  };

  const detectIntent = async (text: string): Promise<string> => {
    try {
      const accessToken = await getAccessToken();
      
      const response = await fetch(
        `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_PROJECT_ID}/agent/sessions/${DIALOGFLOW_SESSION_ID}:detectIntent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            queryInput: {
              text: {
                text,
                languageCode: DIALOGFLOW_LANGUAGE_CODE,
              },
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Falha na comunicação com o Dialogflow');
      }

      const data = await response.json();
      return data.queryResult.fulfillmentText;
    } catch (error) {
      console.error('Erro no Dialogflow:', error);
      return 'Desculpe, estou tendo problemas para responder agora. Por favor, tente novamente mais tarde.';
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    if (step === 0 && !validatePropertyType(inputText)) {
      const errorMessage: Message = {
        text: "Desculpe, não entendi. Por favor, escolha entre casa, apartamento ou terreno.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    if (step === 0) {
      setPreferences(prev => ({ ...prev, propertyType: inputText }));
      setStep(1);
      const nextMessage: Message = {
        text: steps[0].question,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, nextMessage]);
      return;
    }

    if (step <= steps.length) {
      setPreferences(prev => ({ ...prev, [steps[step-1].key]: inputText }));
      
      if (step < steps.length) {
        setStep(prev => prev + 1);
        const nextMessage: Message = {
          text: steps[step].question,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, nextMessage]);
      } else {
        setShowSummary(true);
        const summaryMessage: Message = {
          text: "Aqui está o resumo das suas preferências. Deseja confirmar e enviar para um corretor?",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, summaryMessage]);
      }
      return;
    }

    try {
      setIsLoadingResponse(true);
      const botResponse = await detectIntent(inputText);
      
      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        text: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsSending(true);
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences,
          timestamp: new Date().toISOString(),
          status: 'new'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados');
      }

      const confirmMessage: Message = {
        text: "Ótimo! Estou enviando suas preferências para um de nossos corretores especializados. Ele entrará em contato em breve!",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, confirmMessage]);
      setShowSummary(false);
      
      setTimeout(() => {
        setIsSending(false);
        const contactMessage: Message = {
          text: "✅ Seu contato foi enviado! Um corretor entrará em contato em até 15 minutos.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, contactMessage]);
      }, 2000);
    } catch (error) {
      setIsSending(false);
      const errorMessage: Message = {
        text: "❌ Ocorreu um erro ao enviar suas preferências. Por favor, tente novamente mais tarde.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleAdjust = () => {
    setShowSummary(false);
    setStep(0);
    setPreferences({});
    
    const adjustMessage: Message = {
      text: "Vamos recomeçar. Primeiro, me diga que tipo de imóvel você está procurando? (casa, apartamento ou terreno)",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, adjustMessage]);
  };

  const handleReset = () => {
    setMessages([
      {
        text: "Olá! Sou o assistente virtual da Miyazi. Vou te ajudar a encontrar o imóvel perfeito!",
        sender: 'bot',
        timestamp: new Date()
      },
      {
        text: "Primeiro, me diga que tipo de imóvel você está procurando? (casa, apartamento ou terreno)",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setPreferences({});
    setStep(0);
    setShowSummary(false);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.agentInfo}>
          <Image 
            source={{ uri: 'https://i.imgur.com/3J1WC2f.png' }} 
            style={styles.agentAvatar} 
          />
          <View>
            <Text style={styles.agentName}>Assistente Miyazi</Text>
            <Text style={styles.agentStatus}>Online</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleReset}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.messagesContainer}
      >
        {messages.map((msg, index) => (
          <View 
            key={index} 
            style={[
              styles.messageBubble, 
              msg.sender === 'user' ? styles.userMessage : styles.botMessage
            ]}
          >
            <Text style={msg.sender === 'user' ? styles.userMessageText : styles.botMessageText}>
              {msg.text}
            </Text>
            <Text style={styles.timestamp}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}

        {isLoadingResponse && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <ActivityIndicator size="small" color="#666" />
            <Text style={[styles.botMessageText, { marginLeft: 10 }]}>Pensando...</Text>
          </View>
        )}

        {isSending && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <Text style={styles.botMessageText}>Enviando para um corretor...</Text>
          </View>
        )}

        {showSummary && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <Text style={styles.summaryTitle}>Resumo das Preferências</Text>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Tipo de Imóvel:</Text>
              <Text style={styles.preferenceValue}>{preferences.propertyType || 'Não informado'}</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Orçamento:</Text>
              <Text style={styles.preferenceValue}>{preferences.budget || 'Não informado'}</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Localização:</Text>
              <Text style={styles.preferenceValue}>{preferences.location || 'Não informado'}</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Quartos:</Text>
              <Text style={styles.preferenceValue}>{preferences.bedrooms || 'Não informado'}</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Comodidades:</Text>
              <Text style={styles.preferenceValue}>{preferences.amenities || 'Não informado'}</Text>
            </View>
            
            <View style={styles.confirmationButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar e Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adjustButton} onPress={handleAdjust}>
                <Text style={styles.adjustButtonText}>Ajustar Preferências</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {step <= steps.length && !showSummary && (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Digite sua resposta..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            editable={!isLoadingResponse}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={isLoadingResponse}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}

      {!showSummary && step > steps.length && (
        <View style={styles.summaryContainer}>
          <TouchableOpacity 
            style={styles.contactButton} 
            onPress={() => router.push('/')}
          >
            <Text style={styles.contactButtonText}>Voltar para a página inicial</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2A4D73',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  agentName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  agentStatus: {
    color: '#a0e0a0',
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    marginBottom: Platform.OS === 'ios' ? 90 : 70,
  },
  messagesContainer: {
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3e8ee',
    borderBottomLeftRadius: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2A4D73',
    borderBottomRightRadius: 2,
  },
  botMessageText: {
    color: '#333',
    fontSize: 16,
    flex: 1,
  },
  userMessageText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'right',
    opacity: 0.7,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: Platform.OS === 'ios' ? 20 : 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#2A4D73',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2A4D73',
    textAlign: 'center',
  },
  preferenceItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  preferenceLabel: {
    fontWeight: 'bold',
    width: 120,
    color: '#555',
  },
  preferenceValue: {
    flex: 1,
    color: '#333',
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: '#2A4D73',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  confirmButton: {
    backgroundColor: '#2A4D73',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  adjustButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  adjustButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Chatbot;