import styles from "@/styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Junior de Paula &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
