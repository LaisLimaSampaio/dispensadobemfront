export type Estabelecimento = {
  nomeFantasia: string;
  cnpj: string;
  email: string;
  senha: string;
  horarioFuncionamento: string;
  ofereceEntrega: boolean;
  taxaEntrega: number;
  entregaGratisAcima: number;
  distanciaMaxEntregaKm: number;
  telefone: string;
  categoria: {
    id: number;
  };
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
};