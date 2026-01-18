const BASE_URL = "http://localhost:3001/products";

/**
 * Fetch all products
 */
export const getProducts = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

/**
 * Add new product
 */
export const addProduct = async (product) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/**
 * Update product by id
 */
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * Delete product by id
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};