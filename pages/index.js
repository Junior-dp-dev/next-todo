import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Não recebeu nada");

  async function submitForm() {
    try {
      const response = await axios.post(`${process.env.API_URL}/login`, { username, password });
      const token = response.data.token;
      if (token) {
        const json = jwt.decode(token);
        setMessage(`Bem vindo ${json.username}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocorreu um erro ao fazer login");
    }
  }

  return (
    <>
      <Head>
        <title>Início</title>
        <meta name="keywords" content="TodoList, Lista de Afazeres" />
        <meta name="description" content="Não esqueça de mais nada!" />
      </Head>
      <div className="flex flex-col min-h-vh90 justify-center">
        <h1 className="text-3xl font-bold">Bem vindo</h1>
        <form className="flex flex-col items-center gap-2 mt-5">
          <label htmlFor="email">Email:</label>
          <input className="border border-black" type="text" name="username" value={username} required onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Senha:</label>
          <input className="border border-black" type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
          <button className="border border-black hover:bg-gray-100 px-2 rounded mt-5" type="button" onClick={submitForm}>
            Enviar
          </button>
        </form>
        <h1>{message}</h1>
      </div>
    </>
  );
}
