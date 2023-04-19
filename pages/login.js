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
        <div className="hidden md:flex w-3/5 h-screen bg-[url('/images/todo4.jpg')] bg-no-repeat bg-center bg-cover items-center justify-center">
          <div className="flex flex-col gap-5 w-2/3">
            <h1 className=" text-white drop-shadow-[0_3px_2px_rgba(0,0,0,1)] font-sans font-bold text-left text-6xl">Bem-vindo(a) de volta!</h1>
            <p className=" text-white drop-shadow-[0_3px_2px_rgba(0,0,0,1)] font-sans text-left text-4xl">Faça login para acessar a sua conta. Aproveite tudo o que temos a oferecer!</p>
          </div>
        </div>
        <div className="md:w-2/5 h-screen w-screen flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-blue-500">Sign In</h1>
          <form className="flex flex-col items-center gap-5 m-5" onSubmit={handleSubmit}>
            <div className="border rounded-full w-60 h-10 flex pl-3 gap-2 items-center border-black">
              <PersonOutlineIcon />
              <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} className="focus:outline-none" />
            </div>
            <div className="border rounded-full w-60 h-10 flex pl-3 gap-2 items-center border-black">
              <LockOpenIcon />
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="focus:outline-none" />
            </div>
            <button className="border rounded-full w-60 h-10 border-black text-white font-bold mt-5 bg-gradient-to-r from-blue-500 to-green-400 hover:from-lime-500 hover:to-cyan-500" type="submit">
              Login
            </button>
            {error && <p className="text-red-500 font-bold">{error}</p>}
          </form>
          <div className="flex justify-center gap-2">
            <p>Novo aqui?</p>
            <Link className=" text-sky-600 font-bold" href={"/register"}>
              Crie uma conta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
