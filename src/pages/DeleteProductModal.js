import React from "react";
import axios from "axios";

function DeleteProductModal({ productId, onClose, onDelete }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        return;
      }

      const options = {
        method: "DELETE",
        url: `https://interview.t-alpha.com.br/api/products/delete-product/${productId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(options);

      if (response.status >= 200 && response.status < 300) {
        onDelete();
        onClose();
      } else {
        console.error("Erro ao excluir produto:", response.data.message);
      }
    } catch (error) {
      console.error("Erro inesperado ao excluir produto:", error);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir este produto?</p>
        <div className="div-btn">
          <button onClick={handleDelete}>Excluir</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
