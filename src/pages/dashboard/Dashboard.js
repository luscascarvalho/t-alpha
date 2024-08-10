import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import EditProductModal from "../EditProductModal";
import DeleteProductModal from "../DeleteProductModal";
import AddProductModal from "../AddProductModal";
import "../dashboard/Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("Token não encontrado. Faça login novamente.");
          return;
        }

        const options = {
          method: "GET",
          url: "https://interview.t-alpha.com.br/api/products/get-all-products",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.request(options);

        setProducts(data.data.products || []);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (productId) => {
    setSelectedProduct(productId);
    setIsDeleteModalOpen(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true); // Abre o modal de criação
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false); // Fecha o modal de criação
  };

  const handleSave = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    closeModals();
  };

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    closeModals();
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={openAddModal}>Criar Novo Produto</button>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => openEditModal(product)}
              onDelete={() => openDeleteModal(product.id)}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
      {isEditModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={closeModals}
          onSave={handleSave}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProductModal
          productId={selectedProduct}
          onClose={closeModals}
          onDelete={handleDelete}
        />
      )}
      {isAddModalOpen && (
        <AddProductModal onClose={closeModals} onSave={handleSave} />
      )}
    </div>
  );
}

export default Dashboard;
