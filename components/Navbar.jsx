import Link from "next/link";
import { removeToken, removeRefreshToken } from "../utils/auth";
import Router, { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [click, setClick] = useState(false);

  function handleLogout() {
    removeToken();
    removeRefreshToken();
    Router.push("/");
  }

  if (router.pathname === "/" || router.pathname === "/register" || router.pathname === "/login" || router.pathname === "/about") {
    return null;
  }

  const hideClassBar = "opacity-0 top-[-400px] ";
  const showClassBar = "opacity-90 top-12 ";
  function clique() {
    click ? setClick(false) : setClick(true);
    console.log(click);
  }

  return (
    <nav className="md:flex md:items-center md:justify-between w-full px-10 gap-10 p-3 text-white font-bold text-2xl font-handlee bg-[url('/images/Background.jpg')]">
      <div className="flex justify-between items-center ">
        <h1 className="">Logo</h1>
        <span onClick={clique}>{!click ? <MenuIcon className="text-4xl md:hidden block" /> : <CloseIcon className="text-4xl" />}</span>
      </div>
      <ul
        className={`md:flex md:items-center md:gap-10 md:z-auto md:static md:opacity-100 md:w-auto md:bg-none md:py-0 ${
          !click ? hideClassBar : showClassBar
        } transition-all ease-in duration-300 absolute py-5 text-center left-0 w-full bg-[url('/images/Background.jpg')]`}>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer mb-5 md:my-0">
          <Link href="/create">Criar</Link>
        </li>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer my-5 md:my-0">
          <Link href="/notes">Notas</Link>
        </li>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer my-5 md:my-0">
          <Link href="/notesFinished">Concluídos</Link>
        </li>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer my-5 md:my-0">
          <Link href="/about">Sobre</Link>
        </li>
        <li className=" hover:text-yellow-400 drop-shadow-lg cursor-pointer mt-5 md:my-0">
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </nav>
  );
}
