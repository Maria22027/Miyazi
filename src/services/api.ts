import axios from 'axios';

export const sendMessageToBot = async (message: string): Promise<string> => {
  try {
    const response = await axios.post('http://192.168.56.1:3000/chat', { message });
    return response.data.reply;
  } catch (error) {
    console.error('Erro ao enviar mensagem para o bot:', error);
    return 'Desculpe, não consegui processar sua mensagem.';
  }
};

