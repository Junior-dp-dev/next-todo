import styles from "@/styles/Home.module.css";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Início</title>
        <meta name="keywords" content="TodoList, Lista de Afazeres" />
        <meta name="description" content="Não esqueça de mais nada!" />
      </Head>
      <div>
        <h1 className={styles.title}>Bem vindo</h1>
        <form className={styles.container}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </>
  );
}
