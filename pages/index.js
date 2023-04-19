import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { setToken, getToken } from "../utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Link from "next/link";

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
      <div className="flex h-max ">
        <div className="flex flex-col items-center justify-center gap-20 w-screen h-screen bg-[url('/images/todo4.jpg')] bg-no-repeat bg-center bg-cover">
          <div className="flex flex-col gap-5 w-2/3">
            <h1 className=" text-white drop-shadow-[0_3px_2px_rgba(0,0,0,1)] font-sans font-bold text-6xl">Bem-vindo(a)!</h1>
            <p className=" text-white drop-shadow-[0_3px_2px_rgba(0,0,0,1)] font-sans  text-4xl">Faça login ou cadastre-se para acessar a sua conta. Aproveite tudo o que temos a oferecer!</p>
          </div>
          <div className="flex gap-10">
            <Link
              href={"/login"}
              className="flex justify-center items-center border-2 rounded-full w-60 h-14 border-gray-300 text-white font-bold text-2xl bg-gradient-to-r from-blue-500 to-green-400 hover:from-lime-500 hover:to-cyan-500">
              Entrar
            </Link>
            <Link
              href={"/register"}
              className="flex justify-center items-center border-2 rounded-full w-60 h-14 border-gray-300 text-white font-bold text-2xl bg-gradient-to-r from-blue-500 to-green-400 hover:from-lime-500 hover:to-cyan-500">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
