import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "../utils/auth";

export default function PrivateRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    console.log(token);

    if (!token) {
      // Redirecionar o usuário para a página de login se ele não estiver autenticado
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
}
