import { Property } from '@/types';

// Dados de exemplo (substituir por chamadas AWS na implementação real)
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Apartamento 303 Guilhermina',
    type: 'Apartamento',
    price: 350000,
    description: 'Apartamento com 2 quartos, 72m², vista para o mar',
    image: 'https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg',
    location: 'Praia Grande - SP',
    area: 72,
    rooms: 2,
    bathrooms: 1,
    features: ['Varanda', 'Piscina', 'Academia']
  },
  {
    id: '2',
    title: 'Prime Tower',
    type: 'Apartamento',
    price: 550000,
    description: 'Edifício premium com piscina e academia, 110m²',
    image: 'https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg',
    location: 'Praia Grande - SP',
    area: 110,
    rooms: 3,
    bathrooms: 2,
    features: ['Varanda gourmet', 'Sauna', 'Salão de festas']
  },
  {
    id: '3',
    title: 'Melvi',
    type: 'Casa',
    price: 480000,
    description: 'Casa térrea com jardim, 3 dormitórios, 150m²',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    location: 'Praia Grande - SP',
    area: 150,
    rooms: 3,
    bathrooms: 2,
    features: ['Jardim', 'Churrasqueira', 'Quintal']
  },
  {
    id: '4',
    title: 'Ocian',
    type: 'Casa',
    price: 1200000,
    description: 'Casa de praia com piscina, 4 suítes, 200m²',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    location: 'Praia Grande - SP',
    area: 200,
    rooms: 4,
    bathrooms: 4,
    features: ['Piscina', 'Varanda', 'Vista para o mar']
  }
];

export const fetchProperties = async (): Promise<Property[]> => {
  // Simular atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockProperties;
};