import Link from "next/link";
import { removeToken } from "../utils/auth";
import Router, { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    removeToken();
    Router.push("/");
  }

  if (router.pathname === "/" || router.pathname === "/register" || router.pathname === "/login") {
    return null;
  }

  return (
    <ul className="flex bg-black text-white font-handlee gap-10  min-h-p60 pl-5 items-center">
      <li className="hover:text-cyan-600">
        <Link href="/">Home</Link>
      </li>
      <li className="hover:text-cyan-600">
        <Link href="/create">Criar</Link>
      </li>
      <li className="hover:text-cyan-600">
        <Link href="/todos">A fazer</Link>
      </li>
      <li className="hover:text-cyan-600">
        <Link href="/todos/finished">Concluídos</Link>
      </li>
      <li className="hover:text-cyan-600">
        <Link href="/about">Sobre</Link>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
}
