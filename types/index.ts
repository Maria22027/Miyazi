export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  tipo: 'cliente' | 'corretor';
  creci?: string;
};

export type Property = {
  id: string;
  title: string;
  type: string;
  price: number;
  description: string;
  image: string;
  location: string;
  area: number;
  rooms: number;
  bathrooms: number;
  features?: string[];
};