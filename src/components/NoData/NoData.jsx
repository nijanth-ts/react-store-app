import { useNavigate } from "react-router-dom";
import styles from "./NoData.module.css";

const NoData = ({
  title = "No products found",
  description = "Try adjusting your filters or add new products.",
  actionText,
  onAction,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.empty}>
      <svg
        width="72"
        height="72"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6" />
      </svg>

      <h2>{title}</h2>
      <p>{description}</p>

      {actionText ? (
        <button onClick={onAction}>
          {actionText}
        </button>
      ) :
      (
        <button onClick={() => navigate("/admin")}>
          Add New Product
        </button>
      )
    }
    </div>
  );
};

export default NoData;
