import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <h1 className={styles.brandTitle}>React Store</h1>
      </NavLink>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
