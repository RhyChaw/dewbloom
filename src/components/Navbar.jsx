"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>DewBloom</div>
      {!isAdminPage && (
        <div className={styles.links}>
          <Link href="/course" className={styles.navBtn}>Course</Link>
        </div>
      )}
      {!isAdminPage && (
        <Link href="/signup" className={styles.signupBtn}>
          Sign Up
        </Link>
      )}
    </nav>
  );
}
