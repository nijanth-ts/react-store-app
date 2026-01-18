import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/productApi";

import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoData from "../../components/NoData/NoData";

import styles from "./ProductListing.module.css";


const ITEMS_PER_PAGE = 4;

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((product) =>
        category ? product.category === category : true
      )
      .sort((a, b) => {
        if (sort === "low-high") return a.price - b.price;
        if (sort === "high-low") return b.price - a.price;
        if (sort === "az") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleEdit = (id) => {
    navigate(`/admin/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedProductId);
      setProducts((prev) =>
        prev.filter((p) => p.id !== selectedProductId)
      );
    } catch (error) {
      console.error("Failed to delete product", error);
    } finally {
      setIsModalOpen(false);
      setSelectedProductId(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
    setPage(1);
  };

  return (
    <>
      <Header />

      <main className={styles.container}>
        {products.length > 0 && (
          <Filters
            search={search}
            onSearch={setSearch}
            category={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
          />
        )}

        {filteredProducts.length === 0 ? (
          <NoData
            title="No products found"
            description={
              search || category || sort
                ? "No products match your current filters."
                : "There are no products yet. Start by adding one."
            }
            actionText={search || category || sort ? "Clear Filters" : null}
            onAction={clearFilters}
          />
        ) : (
          <>
            <div className={styles.grid}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            <Pagination
              current={page}
              total={totalPages}
              onChange={setPage}
            />
          </>
        )}
      </main>

      {isModalOpen && (
        <Modal
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default ProductList;