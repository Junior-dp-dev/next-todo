import Link from "next/link";

export default function Navbar() {
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
    </ul>
  );
}
