import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { id, title, price, image } = product;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} loading="lazy" />
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>₹ {Number(price).toFixed(2)}</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.edit}
          onClick={() => onEdit(id)}
        >
          Edit
        </button>

        <button
          type="button"
          className={styles.delete}
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;