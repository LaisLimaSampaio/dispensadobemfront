
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './BuscaPage.css'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
type Produto = {
  id: number;
  nome: string;
  descricao?: string;
  fotoUrl?: string;
  dataValidade: string,
  precoOriginal?: number;
  precoDesconto?: number;
  categoria?: { nome: string };
};

type Estabelecimento = {
  id: number;
  nomeFantasia: string;
  categoria?: { nome: string };
  produtos: Produto[];
};
export default function BuscaPage() {
    const query = useQuery();
    const termoURL  = query.get("termo")?.toLowerCase() || "";

    const navigate = useNavigate();

    const [termo, setTermo] = useState(termoURL);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [abaAtiva, setAbaAtiva] = useState<"produtos" | "estabelecimentos">("produtos");


    function handleBusca() {
        navigate(`/busca?termo=${encodeURIComponent(termo)}`);
    }
      // Simula chamadas API
    useEffect(() => {
    async function fetchDados() {
        // Supondo que as APIs estejam em:
        const estab = await fetch("http://localhost:8080/estabelecimentos").then(res => res.json());
        const prod = await fetch("http://localhost:8080/produtos").then(res => res.json());

        setEstabelecimentos(estab);
        setProdutos(prod);
    }
    fetchDados();
    }, []);

    // Função para filtrar estabelecimentos pelo termo
    function filtrarEstabelecimentos() {
    const t = termo.toLowerCase();
    return estabelecimentos.filter(e =>
        e.nomeFantasia.toLowerCase().includes(t) ||
        (e.categoria?.nome.toLowerCase().includes(t) ?? false)
    );
    }
    function calcularDiasParaVencer(dataValidade: string) {
        const hoje = new Date();
        const validade = new Date(dataValidade);
        const diff = validade.getTime() - hoje.getTime();
        const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return dias;
        }

    // Função para filtrar produtos pelo termo
    function filtrarProdutos() {
    const t = termo.toLowerCase();
    return produtos.filter(p =>
        p.nome.toLowerCase().includes(t) ||
        (p.categoria?.nome.toLowerCase().includes(t) ?? false)
    );
    }

    const estabelecimentosFiltrados = filtrarEstabelecimentos();
    const produtosFiltrados = filtrarProdutos();
    return(
        <>
            <div className='pagina-busca' style={{ padding: "2rem" }}>
                
                <div className='buscador-box'>
                    <input
                    type="text"
                    placeholder="Buscar produtos ou estabelecimentos"
                    value={termo}
                    onChange={e => setTermo(e.target.value)}
                    className='buscador'
                    />
                    <button className='botao' onClick={handleBusca}>
                        <img src="./pesquisa.png" alt="Pesquisar" />
                    </button>
                </div>


                <div style={{ marginBottom: "1rem", display: 'flex' }}>
                    <div
                        className={`seletor ${abaAtiva === "produtos" ? "ativa" : ""}`}
                        onClick={() => setAbaAtiva("produtos")}
                    >
                        Produtos
                    </div>

                    <div
                        className={`seletor ${abaAtiva === "estabelecimentos" ? "ativa" : ""}`}
                        onClick={() => setAbaAtiva("estabelecimentos")}
                    >
                        Estabelecimentos
                    </div>
                </div>

                {abaAtiva === "produtos" && (
                    <div className='produtos-box'>
                    {produtosFiltrados.length === 0 ? (
                        <p>Nenhum produto encontrado.</p>
                    ) : (
                        produtosFiltrados.map(p => (

                        <div key={p.id} className='produto'>

                            <div className='img-box'>
                                <img className='img' src="./camera-para-tirar-fotos.png" alt="" />
                            </div>

                            <div className='info-box'>

                                <strong>{p.nome}</strong> 

                                {p.descricao && <p className='descricao'>{p.descricao}</p>}

                                <p className='validade'>
                                    <p>Validade: {p.dataValidade}</p>
                                    <p>
                                        {(() => {
                                            const dias = calcularDiasParaVencer(p.dataValidade);
                                            return dias >= 0
                                            ? `${dias} dia${dias === 1 ? '' : 's'} para vencimento`
                                            : `Produto vencido há ${Math.abs(dias)} dia${Math.abs(dias) === 1 ? '' : 's'}`;
                                        })()}
                                    </p>
                                </p>

                                <div className='precos'>
                                    <p className='preco-original'>R$ {p.precoOriginal?.toFixed(2)}</p>
                                    <p className='preco-desconto'>{p.precoDesconto && <> R$ {p.precoDesconto.toFixed(2)}</>}</p>
                                </div>
                                
                                
                            </div>
                            
                        </div>

                        ))
                    )}
                    </div>
                )}

                {abaAtiva === "estabelecimentos" && (
                    <div className='estabelecimento-box'>
                    {estabelecimentosFiltrados.length === 0 ? (
                        <p>Nenhum estabelecimento encontrado.</p>
                    ) : (
                        estabelecimentosFiltrados.map(e => (
                        <div key={e.id} className='estabelecimento'>
                            <strong className='nomeEstabelecimento'>{e.nomeFantasia}</strong><br />
                            
                            <div >
                                {e.produtos.length > 0 && (
                                    <small className='lista-produtos'>{e.produtos.map(p => (
                                        <div className='est-produto'>
                                            <div className='est-box-img'>
                                                <img src="./camera-para-tirar-fotos.png" alt="" />
                                            </div>
                                            <strong >{p.nome}</strong>
                                            <p>{p.descricao}</p>
                                            <p>{p.dataValidade}</p>
                                            <div className='est-preco'>
                                                <p className='est-preco-o'>R$ {p.precoOriginal?.toFixed(2)}</p>
                                                <p className='est-preco-d'>R$ {p.precoDesconto?.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}</small>
                                )}
                            </div>
                            <br />
                        </div>
                        
                        ))
                    )}
                    </div>
                )}
                </div>
        </>
    );
}