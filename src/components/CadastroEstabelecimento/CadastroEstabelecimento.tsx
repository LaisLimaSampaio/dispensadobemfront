import type { Categoria } from "../../types/Categoria";
import type { Estabelecimento } from "../../types/Estabelecimento";
import {listarCategoriasEstabelecimento} from '../../api/categoriasEstabelecimento'
import { useState, useEffect } from 'react';
import { cadastrarEstabelecimento } from "../../api/estabelecimento";
import './CadastroEstabelecimento.css'

export default function CadastroEstabelecimento () {

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [formData, setFormData] = useState<Estabelecimento>({
        nomeFantasia: "",
        cnpj: "",
        email: "",
        senha: "",
        horarioFuncionamento: "",
        ofereceEntrega: false,
        taxaEntrega: 0,
        entregaGratisAcima: 0,
        distanciaMaxEntregaKm: 0,
        telefone: "",
        categoria: {
        id: 0,
        },
        endereco: {
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        },
    });

    useEffect(() => {
        listarCategoriasEstabelecimento()
        .then(response => setCategorias(response.data))
        .catch(err => console.error("Erro ao carregar categorias", err));
    }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("endereco.")) {
      const enderecoField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [enderecoField]: value,
        },
      }));
    } else if (name === "categoria") {
      setFormData((prev) => ({
        ...prev,
        categoria: { id: Number(value) },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const estabelecimentoCadastrado = await cadastrarEstabelecimento(formData);
      localStorage.setItem("estabelecimentoId", estabelecimentoCadastrado.id.toString());
      alert("Estabelecimento cadastrado com sucesso!");
      // resetar form se quiser:
      // setFormData({...});
    } catch (error) {
      console.error("Erro ao cadastrar estabelecimento:", error);
      alert("Erro ao cadastrar estabelecimento");
    }
  };

  return(
  
    <form onSubmit={handleSubmit}>
        <h2>Cadastrar Estabelecimento</h2>

        <label>Nome Fantasia:</label>
        <input className="input" type="text" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} required />

        <label>CNPJ:</label>
        <input className="input" type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required />

        <label>Email:</label>
        <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Senha:</label>
        <input className="input" type="password" name="senha" value={formData.senha} onChange={handleChange} required />

        <label>Horário de Funcionamento:</label>
        <input className="input" type="text" name="horarioFuncionamento" value={formData.horarioFuncionamento} onChange={handleChange} />

        <label>Oferece Entrega:</label>
        <input  type="checkbox" name="ofereceEntrega" checked={formData.ofereceEntrega} onChange={handleChange} />

        <label>Taxa de Entrega:</label>
        <input className="input" type="number" name="taxaEntrega" value={formData.taxaEntrega} onChange={handleChange} />

        <label>Entrega Grátis Acima de:</label>
        <input className="input" type="number" name="entregaGratisAcima" value={formData.entregaGratisAcima} onChange={handleChange} />

        <label>Distância Máxima para Entrega (km):</label>
        <input className="input" type="number" name="distanciaMaxEntregaKm" value={formData.distanciaMaxEntregaKm} onChange={handleChange} />

        <label>Telefone:</label>
        <input className="input" type="text" name="telefone" value={formData.telefone} onChange={handleChange} />

        <label>Categoria:</label>

        <select className="input" name="categoria" value={formData.categoria.id} onChange={handleChange} required>

        <option value={0}>Selecione uma categoria</option>
        {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
        ))}
        </select>

        <h3>Endereço</h3>

        <label>Rua:</label>
        <input className="input" type="text" name="endereco.rua" value={formData.endereco.rua} onChange={handleChange} required />

        <label>Número:</label>
        <input className="input" type="text" name="endereco.numero" value={formData.endereco.numero} onChange={handleChange} required />

        <label>Complemento:</label>
        <input className="input" type="text" name="endereco.complemento" value={formData.endereco.complemento} onChange={handleChange} />

        <label>Bairro:</label>
        <input className="input" type="text" name="endereco.bairro" value={formData.endereco.bairro} onChange={handleChange} required />

        <label>Cidade:</label>
        <input className="input" type="text" name="endereco.cidade" value={formData.endereco.cidade} onChange={handleChange} required />

        <label>Estado (UF):</label>
        <input className="input" type="text" name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} required maxLength={2} />

        <label>CEP:</label>
        <input className="input" type="text" name="endereco.cep" value={formData.endereco.cep} onChange={handleChange} required />

        <br />
        <button type="submit">Cadastrar</button>
    </form>
    
)

}