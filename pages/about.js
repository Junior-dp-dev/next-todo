import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const front = "<Frontend/>";
  const back = "<Backend/>";

  return (
    <>
      <Head>
        <title>Sobre</title>
      </Head>
      <ul className="flex md:static fixed w-full text-white font-bold text-2xl  font-handlee py-2 pl-10  bg-[url('/images/Background.jpg')] ">
        <li className="hover:text-green-100 drop-shadow-lg">
          <Link href="/notes">Voltar</Link>
        </li>
      </ul>
      <div className="md:p-12 px-3 py-10 justify-center flex flex-col  min-h-vh90">
        <div className="text-2xl">
          <h1 className=" font-bold text-4xl">Conheça um pouco mais sobre as pessoas que estão por trás deste projeto. </h1>
          <br />
          <p>
            Aqui na nossa equipe, estamos sempre trabalhando juntos para oferecer a melhor experiência possível para os nossos usuários. Se você tiver alguma dúvida ou sugestão, não hesite em entrar
            em contato conosco. Estamos ansiosos para ouvir a sua opinião!
          </p>
        </div>
        <div className="flex md:flex-row md:gap-28 flex-col gap-14 py-10 justify-center text-2xl">
          <div className="flex flex-col items-center">
            <Image className="border-2 border-black rounded-full" src="/images/Junior.jpg" alt="Foto Junior" width={200} height={200} />
            <h1>Junior de Paula</h1>
            <p>{front}</p>
            <div className="flex mt-5 gap-3">
              <Link className="hover:bg-purple-200 border-2 rounded-full px-5 pt-1 border-purple-600" href="https://github.com/Junior-dp-dev" target="_blank">
                Github
              </Link>
              <Link className="hover:bg-blue-200 border-2 rounded-full px-5 pt-1 border-blue-600" href="https://www.linkedin.com/in/junior-de-paula-1b7091262/" target="_blank">
                Linkedin
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image className="border-2 border-black rounded-full" src="/images/Cesar.jpg" alt="Foto Junior" width={213} height={213} />
            <h1>César Augusto</h1>
            <p>{back}</p>
            <div className="flex mt-5 gap-3">
              <Link className="hover:bg-purple-200 border-2 rounded-full px-5 pt-1 border-purple-600" href="https://github.com/KisarDev" target="_blank">
                Github
              </Link>
              <Link className="hover:bg-blue-200 border-2 rounded-full px-5 pt-1 border-blue-600" href="https://www.linkedin.com/in/cesar-martins-000325261/" target="_blank">
                Linkedin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full bg-sky-700 text-white py-2 flex items-center justify-center font-handlee">
        <p>Junior de Paula &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
