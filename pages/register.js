import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("As senhas não se coincidem");
    } else {
      axios
        .post(`${process.env.API_URL}/api/users/create`, {
          username,
          password,
        })
        .then(() => {
          setIsAccountCreated(true);
        })
        .catch((error) => {
          setIsAccountCreated(false);
          console.error(error);
          if (error.response && error.response.status === 400) {
            // Erro de autenticação
            setError("O nome de usuário inserido já está em uso ou não está disponível.");
          } else if (error.response && error.response.status === 404) {
            // Erro de rota não encontrada
            setError("A rota para criar o usuário não foi encontrada. Entre em contato com o suporte.");
          } else if (error.response && error.response.status === 500) {
            // Erro interno do servidor
            setError("Houve um erro interno no servidor. Tente novamente mais tarde.");
          } else {
            // Outro tipo de erro
            setError("Não foi possível criar a sua conta. Tente novamente mais tarde.");
          }
        });
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirnChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="keywords" content="TodoList, Lista de Afazeres" />
        <meta name="description" content="Não esqueça de mais nada!" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-[url('/images/Background.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="px-20 py-28 min-w-full  flex flex-col justify-center rounded-lg shadow-lg drop-shadow-[0_6px_6px_rgba(0,0,0,0.6)] bg-white">
          {isAccountCreated ? (
            <div className="flex flex-col justify-center items-center gap-10">
              <h1 className="text-4xl font-bold text-blue-500">Úsuario Criado com sucesso!</h1>
              <Link className="border rounded-full px-20 py-2  border-black text-white font-bold bg-gradient-to-r from-blue-500 to-green-400 hover:from-lime-500 hover:to-cyan-500" href={"/"}>
                Login
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold text-blue-500">Login</h1>
              <form className="flex flex-col items-center gap-5 m-5" onSubmit={handleSubmit}>
                <div className="border rounded-full w-60 h-10 flex pl-3 gap-2 items-center border-black">
                  <PersonOutlineIcon />
                  <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} className="focus:outline-none" />
                </div>
                <div className="border rounded-full w-60 h-10 flex pl-3 gap-2 items-center border-black">
                  <LockOpenIcon />
                  <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="focus:outline-none" />
                </div>
                <div className="border rounded-full w-60 h-10 flex pl-3 gap-2 items-center border-black">
                  <LockOpenIcon />
                  <input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={handlePasswordConfirnChange} className="focus:outline-none" />
                </div>

                <button
                  className="border rounded-full w-60 h-10 border-black text-white font-bold mt-5 bg-gradient-to-r from-blue-500 to-green-400 hover:from-lime-500 hover:to-cyan-500"
                  type="submit">
                  Registrar
                </button>
                {error && <p className="text-red-500 font-bold">{error}</p>}
              </form>
              <Link className=" text-sky-600 font-bold" href={"/"}>
                Voltar
              </Link>
            </div>
          )}
        </div>
        <Link className=" text-white font-bold drop-shadow-[0_3px_2px_rgba(0,0,0,1)] mt-5" href={"/about"}>
          Sobre Nós
        </Link>
      </div>
    </>
  );
}
