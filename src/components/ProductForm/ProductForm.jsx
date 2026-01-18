import { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        price: initialData.price || "",
        category: initialData.category || "",
        image: initialData.image || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(form);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>

      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <span className={styles.error}>{errors.title}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          aria-invalid={!!errors.price}
        />
        {errors.price && (
          <span className={styles.error}>{errors.price}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          aria-invalid={!!errors.image}
        />
        {errors.image && (
          <span className={styles.error}>{errors.image}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          aria-invalid={!!errors.category}
        >
          <option value="">Select</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Electronics">Electronics</option>
        </select>
        {errors.category && (
          <span className={styles.error}>{errors.category}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />
      </div>


      <div className={styles.actions}>
        <button
          type="button"
          className={styles.back}
          onClick={handleBack}
        >
          Back
        </button>

        <button type="submit" className={styles.submit}>
          {initialData ? "Update Product" : "Save Product"}
        </button>
      </div>

    </form>
  );
};

export default ProductForm;