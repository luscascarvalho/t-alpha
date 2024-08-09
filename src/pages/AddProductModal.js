import React, { useState } from "react";
import axios from "axios";

function AddProductModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        return;
      }

      const options = {
        method: "POST",
        url: "https://interview.t-alpha.com.br/api/products/create-product",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          name,
          description,
          price: Number(price),
          stock: Number(stock),
        },
      };

      const response = await axios.request(options);

      if (response.status === 201) {
        onSave({
          id: response.data.data.id,
          name,
          description,
          price: Number(price),
          stock: Number(stock),
        });
        onClose();
      } else {
        console.error("Erro ao criar produto:");
      }
    } catch (error) {
      console.error(
        "Erro ao criar produto:",
        error.response ? error.response.data : error.message
      );
    }
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Criar Novo Produto</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Estoque"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <div className="div-btn">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
