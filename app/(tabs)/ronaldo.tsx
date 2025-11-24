import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage, Bubble } from 'react-native-gifted-chat';
import { sendMessageToBot } from '../../src/services/api';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Olá! Eu sou o assistente virtual da imobiliária. Pergunte sobre imóveis, preços ou disponibilidade!',
      createdAt: new Date(),
      user: { _id: 2, name: 'Bot' },
    },
  ]);

  const [loading, setLoading] = useState(false);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages(prev => GiftedChat.append(prev, newMessages));

    const userMessage = newMessages[0].text;
    setLoading(true);

    const botReply = await sendMessageToBot(userMessage);
    setLoading(false);

    setMessages(prev =>
      GiftedChat.append(prev, [
        {
          _id: Math.random(),
          text: botReply,
          createdAt: new Date(),
          user: { _id: 2, name: 'Bot' },
        },
      ])
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
        isTyping={loading}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: styles.userBubble, // bolha do usuário
              left: styles.botBubble,    // bolha do bot
            }}
            textStyle={{
              right: styles.userText,
              left: styles.botText,
            }}
          />
        )}
        textInputProps={{
          placeholder: 'Digite sua mensagem...',
          placeholderTextColor: '#888',
          style: styles.input,
        }}
        renderChatEmpty={() => <View style={styles.emptyChat} />}
      />
    </SafeAreaView>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // fundo claro
  },
  userBubble: {
    backgroundColor: '#0a84ff', // azul suave
  },
  botBubble: {
    backgroundColor: '#e5e5ea', // cinza claro
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginBottom: 5,
    color: '#000',
  },
  emptyChat: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});
