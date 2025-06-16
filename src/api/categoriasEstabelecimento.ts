import type { Categoria } from "../types/Categoria";
import api from './axios'

export const listarCategoriasEstabelecimento = () => {
  return api.get<Categoria[]>("/categorias-estabelecimento");
};
