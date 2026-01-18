import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import ProductForm from "../../components/ProductForm/ProductForm";
import {
  getProducts,
  addProduct,
  updateProduct,
} from "../../api/productApi";

import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = id ? id : null;

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        const productToEdit = products.find(
          (product) => product.id === productId
        );

        if (productToEdit) {
          setInitialData(productToEdit);
        }
      } catch (error) {
        console.error("Failed to load product for edit", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (formData) => {
    try {
      if (productId) {
        await updateProduct(productId, {
          ...formData,
          id: productId,
        });
      } else {
        const newProduct = {
          ...formData,
          id: Date.now().toString(),
        };

        await addProduct(newProduct);
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.card}>
          <h3 className={styles.title}>
            {productId
              ? `Edit Product: ${initialData?.title || ""}`
              : "Add New Product"}
          </h3>

          {productId && loading ? (
            <p>Loading product details...</p>
          ) : (
            <ProductForm
              initialData={initialData}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;