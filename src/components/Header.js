import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // check if user is logged in by checking for token in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(token ? true : false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <header className={styles.header}>
      <h2>
        <Link className={styles.link} href="/">
          workspaced.org
        </Link>
      </h2>
      <nav className={styles.navList}>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <button onClick={() => handleNavigation("/login")}>Log in</button>
            <button onClick={() => handleNavigation("/register")}>
              Sign up
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
