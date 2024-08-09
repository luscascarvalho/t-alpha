import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../login/Login.css";
import { toast } from "react-toastify";

function Login() {
  const [taxNumber, setCpfCnpj] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://interview.t-alpha.com.br/api/auth/login",
      headers: { "Content-Type": "application/json" },
      data: { taxNumber, password },
    };

    try {
      const response = await axios.request(options);

      if (response.data.success) {
        const token = response.data.data.token;
        toast.success("Logado!");

        if (token) {
          localStorage.setItem("authToken", token);
          navigate("/dashboard");
        } else {
          console.error("Token errado.");
        }
      } else {
        toast.error("Login/senha errados!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login/senha errados!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div>
          <label>CPF/CNPJ</label>
          <input
            type="text"
            value={taxNumber}
            onChange={(e) => setCpfCnpj(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Não tem uma conta?{" "}
        <button onClick={() => navigate("/register")}>Registrar</button>
      </p>
    </div>
  );
}

export default Login;
