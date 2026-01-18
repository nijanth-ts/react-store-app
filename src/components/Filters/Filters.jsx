import styles from "./Filters.module.css";

const Filters = ({
  search,
  onSearch,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}) => {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Electronics">Electronics</option>
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Price: All</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        <option value="az">A–Z</option>
      </select>
    </div>
  );
};

export default Filters;