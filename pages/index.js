import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Início</title>
        <meta name="keywords" content="TodoList, Lista de Afazeres" />
        <meta name="description" content="Não esqueça de mais nada!" />
      </Head>
      <div>
        <h1 className="text-3xl font-bold">Bem vindo</h1>
        <form className="flex flex-col items-center gap-2 mt-5">
          <label htmlFor="email">Email:</label>
          <input className="border border-black" type="email" id="email" name="email" required />
          <label htmlFor="password">Senha:</label>
          <input className="border border-black" type="password" id="password" name="password" required />
          <button className="border border-black hover:bg-gray-100 px-2 rounded mt-5" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
