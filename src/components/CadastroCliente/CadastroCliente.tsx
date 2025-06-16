import { useState } from 'react';
import './CadastroCliente.css'
import type { Cliente } from '../../types/Cliente';
import {cadastrarCliente} from '../../api/cliente'

export default function CadastroCliente(){


    const [cliente, setCliente] = useState<Cliente>({
            nome: '',
            email: '',
            senha: '',
            telefone: '',
            endereco: {
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            },
    });


    const [mensagem, setMensagem] = useState<string>('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

    const { name, value } = event.target;

    if (name.startsWith('endereco.')) {

      const campoEndereco = name.split('.')[1];
      setCliente(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [campoEndereco]: value,
        },
      }));

    } else {

      setCliente(prev => ({
        ...prev,
        [name]: value,
      }));

    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    console.log('Dados para enviar:', cliente);

    try {
        const response = await cadastrarCliente(cliente);
        const cliente = response.data;

   
        localStorage.setItem("clienteId", cliente.id.toString());

        alert("Cliente cadastrado com sucesso!");
        setMensagem('Cliente cadastrado com sucesso!');
        setCliente({
            nome: '',
            email: '',
            senha: '',
            telefone: '',
            endereco: {
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            },
        });
        } catch (error) {
        setMensagem('Erro ao cadastrar cliente.');
        }
    }


    return(
        <>
            <div className="cadastro-cliente-container">
                <h2>Cadastro de Cliente</h2>
                <form onSubmit={handleSubmit} className="cadastro-form">
                    <label>
                    Nome:
                    <input type="text" name="nome" value={cliente.nome} onChange={handleChange} required />
                    </label>

                    <label>
                    Email:
                    <input type="email" name="email" value={cliente.email} onChange={handleChange} required />
                    </label>

                    <label>
                    Senha:
                    <input type="password" name="senha" value={cliente.senha} onChange={handleChange} required />
                    </label>

                    <label>
                    Telefone:
                    <input type="tel" name="telefone" value={cliente.telefone} onChange={handleChange} />
                    </label>

                    <h3>Endereço</h3>

                    <label>
                    Rua:
                    <input type="text" name="endereco.rua" value={cliente.endereco.rua} onChange={handleChange} />
                    </label>

                    <label>
                    Número:
                    <input type="text" name="endereco.numero" value={cliente.endereco.numero} onChange={handleChange} />
                    </label>

                    <label>
                    Complemento:
                    <input type="text" name="endereco.complemento" value={cliente.endereco.complemento} onChange={handleChange} />
                    </label>

                    <label>
                    Bairro:
                    <input type="text" name="endereco.bairro" value={cliente.endereco.bairro} onChange={handleChange} />
                    </label>

                    <label>
                    Cidade:
                    <input type="text" name="endereco.cidade" value={cliente.endereco.cidade} onChange={handleChange} />
                    </label>

                    <label>
                    Estado:
                    <input type="text" maxLength={2} name="endereco.estado" value={cliente.endereco.estado} onChange={handleChange} />
                    </label>

                    <label>
                    CEP:
                    <input type="text" name="endereco.cep" value={cliente.endereco.cep} onChange={handleChange} />
                    </label>

                    <button className='btn-submit' type="submit">Cadastrar</button>
                </form>

                {mensagem && <p className="mensagem">{mensagem}</p>}
                </div>
            


        </>
    );
}