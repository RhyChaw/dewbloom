"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // adjust scroll threshold
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>DewBloom</div>
      {/* <div className={styles.links}>
        <Link href="/course">Course</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div> */}
      <Link href="/signup" className={styles.signupBtn}>
        Sign Up
      </Link>
    </nav>
  );
}
