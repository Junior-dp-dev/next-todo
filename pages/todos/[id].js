import axios from "axios";
import Link from "next/link";
import { handleDelete } from "../../components/DeleteApi";

export async function getStaticPaths() {
  // Aqui você faz a requisição para obter os IDs dos seus itens
  const { data } = await axios.get(`${process.env.API_URL}`);
  const paths = data.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Aqui você faz a requisição para obter os dados do item com base no ID fornecido na rota
  const { id } = params;
  const { data } = await axios.get(`${process.env.API_URL}/read/${id}`);

  return { props: { item: data } };
}

export default function ItemPage({ item }) {
  return (
    <>
      <h1>{item.title}</h1>
      <p>{item.content}</p>
      <button onClick={() => handleDelete(item)}>Deletar</button>
      <button>
        <Link href={`/todos/edit/${item.id}`}>Editar</Link>
      </button>
      <Link href={`/todos`}>Voltar</Link>
    </>
  );
}
