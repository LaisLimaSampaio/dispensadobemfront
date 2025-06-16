import api from './axios'
import type { Estabelecimento } from '../types/Estabelecimento';

export async function cadastrarEstabelecimento(formData: Estabelecimento) {
  try {
    const response = await api.post('/estabelecimentos', formData);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao cadastrar estabelecimento:', error);
    throw error;
  }
}
