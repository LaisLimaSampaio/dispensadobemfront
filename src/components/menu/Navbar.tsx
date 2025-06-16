import './Navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar(){
    return(
        <div className="navbar">
            <h1>Dispensa do Bem</h1>
            <div className="links">
                <div className="carrinho"><img src="./carrinho-carrinho.png" alt="" /></div>
                <Link to="/cadastro" className="cadastro">Cadastrar-se</Link>  
            </div>
        </div>

    );
}