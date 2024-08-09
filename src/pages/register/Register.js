import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../register/Register.css";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://interview.t-alpha.com.br/api/auth/register",
      headers: { "Content-Type": "application/json" },
      data: { name, taxNumber, mail, phone, password },
    };

    try {
      const response = await axios.request(options);

      if (response.status === 201) {
        toast.success("Conta criada!");
        navigate("/login");
      } else {
        toast.error("Erro! Por favor, verifique suas credenciais.");
      }
    } catch (error) {
      toast.error("Tente novamente.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CPF/CNPJ</label>
          <input
            type="text"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p>
        Já tem uma conta?{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </p>
    </div>
  );
}

export default Register;
