import Link from "next/link";
import { removeToken, removeRefreshToken, getUsernameCookies, removeUsernameCookies } from "../utils/auth";
import Router, { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  function handleLogout() {
    removeToken();
    removeRefreshToken();
    removeUsernameCookies();
    dropdown();
    Router.push("/");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (router.pathname === "/" || router.pathname === "/register" || router.pathname === "/login" || router.pathname === "/about") {
    return null;
  }

  function dropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <nav className="md:flex md:items-center md:justify-between w-full px-10 gap-10 p-3 text-white font-bold text-2xl font-handlee bg-[url('/images/Background.jpg')]">
      <div className="flex justify-between items-center ">
        <h1 className=" font-bold capitalize">{getUsernameCookies()}</h1>
        <span className="md:hidden block" onClick={dropdown}>
          {!showDropdown ? <MenuIcon className="text-4xl " /> : <CloseIcon className="text-4xl " />}
        </span>
      </div>
      <ul
        ref={dropdownRef}
        className={`md:flex md:items-center md:gap-10 md:z-auto md:static md:opacity-100 md:w-auto md:bg-none md:py-0 ${
          !showDropdown ? "opacity-0 top-[-400px] " : "opacity-90 top-12 "
        } transition-all ease-in duration-300 absolute py-5 text-center left-0 w-full bg-[url('/images/Background.jpg')]`}>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer mb-5 md:my-0">
          <Link onClick={dropdown} href="/create">
            Criar
          </Link>
        </li>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer my-5 md:my-0">
          <Link onClick={dropdown} href="/notes">
            Notas
          </Link>
        </li>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer my-5 md:my-0">
          <Link onClick={dropdown} href="/notesFinished">
            Concluídos
          </Link>
        </li>
        <li className="hover:text-yellow-400 drop-shadow-lg cursor-pointer my-5 md:my-0">
          <Link onClick={dropdown} href="/about">
            Sobre
          </Link>
        </li>
        <li className=" hover:text-yellow-400 drop-shadow-lg cursor-pointer mt-5 md:my-0">
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </nav>
  );
}
