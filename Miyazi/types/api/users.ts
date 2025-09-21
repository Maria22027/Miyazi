import { User } from '@/types';

// Simulação de banco de dados em memória (substituir por chamadas AWS na implementação real)
let users: User[] = [];

export const registerUser = async (userData: User): Promise<User> => {
  // Simular atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Verificar se email já existe
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email já cadastrado');
  }
  
  const newUser = { ...userData, id: Date.now().toString() };
  users.push(newUser);
  return newUser;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  // Simular atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Credenciais inválidas');
  }
  
  return user;
};