export interface Endereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  dataCriacao?: string | null;
  endereco: Endereco;
}