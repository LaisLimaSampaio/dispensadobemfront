import { useState } from "react";
import CadastroCliente  from "../components/CadastroCliente/CadastroCliente";
import CadastroEstabelecimento from "../components/CadastroEstabelecimento/CadastroEstabelecimento";

export default function Cadastro()  {
  const [tipoCadastro, setTipoCadastro] = useState<"cliente" | "estabelecimento">("cliente");

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h1>Cadastre-se</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Cadastrar-se como: </label>
        <select value={tipoCadastro} onChange={(e) => setTipoCadastro(e.target.value as "cliente" | "estabelecimento")}>
          <option value="cliente">Cliente</option>
          <option value="estabelecimento">Estabelecimento</option>
        </select>
      </div>

      {tipoCadastro === "cliente" ? (
        <CadastroCliente />
      ) : (
        <CadastroEstabelecimento />
      )}
    </div>
  );
};
