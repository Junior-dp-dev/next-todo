import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PrivateRoute from "../components/PrivateRoute";

export default function About() {
  const front = "<Frontend/>";
  const back = "<Backend/>";

  return (
    <PrivateRoute>
      <Head>
        <title>Sobre</title>
      </Head>
      <div className="p-10 justify-center flex flex-col gap-10 min-h-vh90">
        <div className="text-2xl">
          <h1 className=" font-bold text-4xl">Conheça um pouco mais sobre as pessoas que estão por trás deste projeto. </h1>
          <br />
          <p>
            Aqui na nossa equipe, estamos sempre trabalhando juntos para oferecer a melhor experiência possível para os nossos usuários. Se você tiver alguma dúvida ou sugestão, não hesite em entrar
            em contato conosco. Estamos ansiosos para ouvir a sua opinião!
          </p>
        </div>
        <div className="flex justify-evenly text-2xl">
          <div className=" w-96 flex flex-col items-center gap-2">
            <Image className=" border-2 border-black rounded-full" src="/images/Junior.jpg" alt="Foto Junior" width={200} height={200} />
            <h1>Junior de Paula</h1>
            <p>{front}</p>
            <div className="mt-5">
              <Link className=" hover:bg-purple-200 border-2 rounded-full border-purple-600 px-5 py-1 mx-3" href="/about">
                Github
              </Link>
              <Link className=" hover:bg-blue-200 border-2 rounded-full border-blue-600 px-5 py-1 mx-3" href="/about">
                Linkedin
              </Link>
            </div>
          </div>
          <div className=" w-96 flex flex-col items-center gap-2">
            <Image className=" border-2 border-black rounded-full" src="/images/Cesar.jpg" alt="Foto Junior" width={200} height={200} />
            <h1>César Augusto</h1>
            <p>{back}</p>
            <div className="mt-5">
              <Link className=" hover:bg-purple-200 border-2 rounded-full border-purple-600 px-5 py-1 mx-3" href="/about">
                Github
              </Link>
              <Link className=" hover:bg-blue-200 border-2 rounded-full border-blue-600 px-5 py-1 mx-3" href="/about">
                Linkedin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
