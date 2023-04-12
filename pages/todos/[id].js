import axios from "axios";
import Link from "next/link";

export async function getStaticPaths() {
  // Aqui você faz a requisição para obter os IDs dos seus itens
  const { data } = await axios.get("http://localhost:8000");
  const paths = data.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Aqui você faz a requisição para obter os dados do item com base no ID fornecido na rota
  const { id } = params;
  const { data } = await axios.get(`http://localhost:8000/read/${id}`);

  return { props: { item: data } };
}

const handleDelete = async (item) => {
  try {
    await axios.delete(`http://localhost:8000/delete/${item.id}`);
    console.log("Todo deletado com sucesso!");
  } catch (error) {
    console.error(error);
  }
};

export default function ItemPage({ item }) {
  return (
    <>
      <h1>{item.title}</h1>
      <p>{item.content}</p>
      <button onClick={() => handleDelete(item)}>Deletar</button>
      <button>
        <Link href={`http://localhost:3000/todos/edit/${item.id}`}>Editar</Link>
      </button>
      <Link href={`/todos`}>Voltar</Link>
    </>
  );
}
