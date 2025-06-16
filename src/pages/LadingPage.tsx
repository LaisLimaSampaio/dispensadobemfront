import { useState } from 'react';
import './LadingPage.css'
import { useNavigate } from 'react-router-dom';
export default function LandingPage(){
    const [termoBusca, setTermoBusca] = useState('');
    const navigate = useNavigate();

    const handleBusca = () => {
        if (termoBusca.trim()) {
        navigate(`/busca?termo=${encodeURIComponent(termoBusca)}`);
        }
    };
    return(
        <>
            <div className="fundo">
            <div className='container'>
                <h1 className='titulo'>O que deseja comer hoje?</h1>
                <p className='texto'>
                Conectamos pessoas a alimentos de qualidade que estão próximos da data de vencimento. 
                Assim, ajudamos a reduzir o desperdício de comida e oferecemos opções mais acessíveis 
                para quem busca economia sem abrir mão da responsabilidade social.
                </p>

                <div className='buscador-box'>
                    <input
                        className='buscador'
                        placeholder='Digite aqui um produto, categoria ou estabelecimento'
                        type="text"
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                    />
                    <button className='botao' onClick={handleBusca}>
                        <img src="./pesquisa.png" alt="Pesquisar" />
                    </button>
                </div>
            </div>
            </div>
        </>
    );
}