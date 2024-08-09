import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modal.css";

function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setStock(product.stock || 0);
    }
  }, [product]);

  const handleSave = async () => {
    if (!product) {
      console.error("Produto não está definido.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        return;
      }

      const options = {
        method: "PATCH",
        url: `https://interview.t-alpha.com.br/api/products/update-product/${product.id}`,
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

      if (response.status === 200) {
        onSave({
          id: product.id,
          name,
          description,
          price: Number(price),
          stock: Number(stock),
        });
        onClose();
      } else {
        console.error(
          "Erro ao editar produto:",
          response.data.message || response.statusText
        );
      }
    } catch (error) {
      console.error(
        "Erro ao editar produto:",
        error.response ? error.response.data : error.message
      );
    }
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Produto</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do Produto"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição do Produto"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preço do Produto"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Quantidade em estoque"
        />

        <div className="div-btn">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
