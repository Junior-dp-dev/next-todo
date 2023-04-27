import Link from "next/link";
import { removeToken } from "../utils/auth";
import Router, { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    removeToken();
    Router.push("/");
  }

  if (router.pathname === "/" || router.pathname === "/register" || router.pathname === "/login" || router.pathname === "/about") {
    return null;
  }

  return (
    <ul className="flex text-white font-bold text-2xl  font-handlee gap-10  min-h-p60 pl-5 items-center bg-[url('/images/todo4.jpg')] ">
      <li className="hover:text-yellow-400 drop-shadow-lg">
        <Link href="/create">Criar</Link>
      </li>
      <li className="hover:text-yellow-400 drop-shadow-lg">
        <Link href="/notes">Notas</Link>
      </li>
      <li className="hover:text-yellow-400 drop-shadow-lg">
        <Link href="/notesFinished">Concluídos</Link>
      </li>
      <li className="hover:text-yellow-400 drop-shadow-lg">
        <Link href="/about">Sobre</Link>
      </li>
      <li className=" hover:text-yellow-400 drop-shadow-lg">
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
}
