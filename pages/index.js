import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { setToken, getToken } from "../utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.push("/about");
    }
  }, []);

  const login = (username, password) => {
    return axios
      .post("http://localhost:8000/api/token/", {
        username: username,
        password: password,
      })
      .then((response) => {
        // O token de autenticação será retornado na resposta da API
        const tokenAcess = response.data.access;
        setToken(tokenAcess);
        console.log("Token acess recebido:", tokenAcess);
        return tokenAcess;
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          // Erro de autenticação
          localStorage.removeItem("api");
          setError("Usuário ou senha incorretos.");
        } else {
          // Outro tipo de erro
          setError("Não foi possível efetuar o login. Tente novamente mais tarde.");
        }
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // previne que a página recarregue após a submissão do formulário
    login(username, password).then((token) => {
      console.log("Login bem-sucedido");
      if (token) {
        router.push("/about"); // redireciona para outra página
      }
    });
  };

  return (
    <>
      <Head>
        <title>Início</title>
        <meta name="keywords" content="TodoList, Lista de Afazeres" />
        <meta name="description" content="Não esqueça de mais nada!" />
      </Head>
      <div className="flex flex-col min-h-vh90 justify-center">
        <h1 className="text-3xl font-bold">Bem vindo</h1>
        <form className="flex flex-col items-center gap-2 mt-5" onSubmit={handleSubmit}>
          <label>Nome de usuário:</label>
          <input className="border border-black" type="text" value={username} onChange={handleUsernameChange} />
          <label>Senha:</label>
          <input className="border border-black" type="password" value={password} onChange={handlePasswordChange} />
          <button className="border border-black hover:bg-gray-100 px-2 rounded mt-5" type="submit">
            Enviar
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
}
