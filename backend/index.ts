import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Configuração da OpenAI
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Erro: OPENAI_API_KEY não encontrada no .env');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rota principal do chat
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    console.warn('⚠️ Mensagem vazia recebida');
    return res.status(400).json({ reply: 'Mensagem não enviada.' });
  }

  console.log('📩 Mensagem recebida do frontend:', message);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente de imobiliária. Responda perguntas sobre imóveis, preços, localização e agendamento de visitas.',
        },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message?.content || '';
    console.log('🤖 Resposta do GPT:', reply);

    res.json({ reply });
  } catch (error: any) {
    console.error('❌ Erro ao processar a mensagem no backend:', error?.message || error);

    // Retornar a mensagem de erro para o frontend
    res.status(500).json({
      reply: 'Erro ao processar a mensagem. Verifique os logs do backend.',
      error: error?.message || error,
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Backend rodando na porta ${PORT}`);
});
