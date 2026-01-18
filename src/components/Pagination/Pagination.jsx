import styles from "./Pagination.module.css";

const Pagination = ({ current, total, onChange }) => {
  if (total <= 1) return null;

  const pages = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      Math.abs(i - current) <= 1
    ) {
      pages.push(i);
    } else if (
      pages[pages.length - 1] !== "..."
    ) {
      pages.push("...");
    }
  }

  return (
    <div className={styles.pagination}>
      {current > 1 && (
        <button
          className={styles.arrow}
          onClick={() => onChange(current - 1)}
        >
          ‹
        </button>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className={styles.dots}>
            …
          </span>
        ) : (
          <button
            key={index}
            className={
              page === current
                ? styles.active
                : styles.page
            }
            onClick={() => onChange(page)}
            disabled={page === current}
          >
            {page}
          </button>
        )
      )}

      {current < total && (
        <button
          className={styles.arrow}
          onClick={() => onChange(current + 1)}
        >
          ›
        </button>
      )}
    </div>
  );
};

export default Pagination;
