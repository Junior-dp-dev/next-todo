import axios from "axios";
import { useState } from "react";
import { setToken, setRefreshToken } from "../utils/auth";
import Head from "next/head";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.API_URL}/api/token/`, {
        username,
        password,
      });
      const { access, refresh } = response.data;
      // armazene o access e refresh token em localStorage ou em um estado global, como Redux
      setToken(access);
      setRefreshToken(refresh);
      router.push("/notes");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        // Erro de autenticação
        setError("Usuário ou senha incorretos.");
      } else {
        // Outro tipo de erro
        setError("Não foi possível efetuar o login. Tente novamente mais tarde.");
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="keywords" content="TodoList, Lista de Afazeres" />
        <meta name="description" content="Não esqueça de mais nada!" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-[url('/images/Background.jpg')] bg-no-repeat bg-center bg-cover">
        <h1 className=" text-white drop-shadow-[0_3px_2px_rgba(0,0,0,1)] font-sans font-bold text-left text-6xl mb-6">Just To Do!</h1>
        <div className="px-20 py-28 min-w-full flex flex-col justify-center rounded-lg shadow-lg drop-shadow-[0_6px_6px_rgba(0,0,0,0.6)] bg-white">
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
        <Link className=" text-white font-bold drop-shadow-[0_3px_2px_rgba(0,0,0,1)] mt-5" href={"/about"}>
          Sobre Nós
        </Link>
      </div>
    </>
  );
}
