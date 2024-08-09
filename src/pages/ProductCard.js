import React from "react";
import "./ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Preço:</strong> R$ {product.price.toFixed(2)}
      </p>
      <p>
        <strong>Em estoque:</strong> {product.stock}
      </p>
      <div className="product-card-actions">
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Deletar</button>
      </div>
    </div>
  );
}

export default ProductCard;
