import './App.css';
import { Routes, Route } from 'react-router-dom'; // 👈 importa rotas do react-router
import LandingPage from './pages/LadingPage';
import Navbar from './components/menu/navbar';
import PaginaCadastro  from './pages/PaginaCadastro'; 
import BuscaPage from './pages/BuscaPage'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cadastro" element={<PaginaCadastro />} />
        <Route path="/busca" element={<BuscaPage />} />
      </Routes>
    </>
  );
}

export default App;
