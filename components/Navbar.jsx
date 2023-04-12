import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/todos">ToDos</Link>
      </li>
      <li>
        <Link href="/create">Create</Link>
      </li>
      <li>
        <Link href="/about">Sobre</Link>
      </li>
    </ul>
  );
}
