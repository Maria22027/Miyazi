// Cole a URL que o Render gerou
const API_URL = "https://api-imobiliaria-757o.onrender.com";

// Criar imóvel
export const criarImovelAPI = async (dados) => {
  const response = await fetch(`${API_URL}/imoveis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return await response.json();
};

// Listar todos os imóveis
export const listarImoveisAPI = async () => {
  const response = await fetch(`${API_URL}/imoveis`);
  return await response.json();
};

// Buscar imóvel por ID
export const buscarImovelAPI = async (id) => {
  const response = await fetch(`${API_URL}/imoveis/${id}`);
  return await response.json();
};

// Atualizar imóvel
export const atualizarImovelAPI = async (id, dados) => {
  const response = await fetch(`${API_URL}/imoveis/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return await response.json();
};

// Deletar imóvel
export const deletarImovelAPI = async (id) => {
  const response = await fetch(`${API_URL}/imoveis/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

// Filtrar imóveis por tipo
export const filtrarImoveisPorTipo = async (tipo) => {
  const response = await fetch(`${API_URL}/imoveis?tipo=${tipo}`);
  return await response.json();
};