import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:8000");
  const paths = data.map((item) => ({
    params: { id: item.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await axios.get(`http://localhost:8000/read/${id}`);
  return { props: { item: data } };
}

export default function EditPage({ item }) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/update/${item.id}`, {
        title,
        content,
      });
      console.log("Todo atualizado com sucesso!");
      router.push(`/todos/${item.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Editar Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          <label htmlFor="content">Conteúdo:</label>
          <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} />
        </div>
        <button type="submit">Salvar</button>
        <button>
          <Link href={`http://localhost:3000/todos/${item.id}`}>Cancelar</Link>
        </button>
      </form>
    </>
  );
}
