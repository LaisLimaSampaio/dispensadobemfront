import axios from "axios";
import type { Cliente } from '../types/Cliente';



const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cadastrarCliente = (dadosCliente: any) => {
  return api.post('/clientes', dadosCliente);
};


export const listarClientes = () => {
  return api.get<Cliente[]>('/clientes');
};