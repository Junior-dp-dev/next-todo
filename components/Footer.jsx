import Router, { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  if (router.pathname === "/" || router.pathname === "/register" || router.pathname === "/login") {
    return null;
  }

  return (
    <footer className="bg-black text-white min-h-p55 flex items-center justify-center font-handlee">
      <p>Junior de Paula &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
