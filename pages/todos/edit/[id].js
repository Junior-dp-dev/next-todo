import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import FormTodo from "./../../../components/FormTodo";

export async function getStaticPaths() {
  /* const { data } = await axios.get(`${process.env.API_URL}`); */
  const data = [
    { title: "A fazer", content: "conteudo", id: 1 },
    { title: "A fazer", content: "conteudo", id: 2 },
    { title: "A fazeraaaaassssssssssssssaaaa", content: "conteudoooooooooooooooo", id: 3 },
    { title: "A fazer", content: "conteudo", id: 4 },
    { title: "A fazer", content: "conteudo", id: 5 },
    { title: "A fazer", content: "conteudo", id: 6 },
    { title: "A fazer", content: "conteudo", id: 7 },
    { title: "A fazer", content: "conteudo", id: 8 },
    { title: "A fazer", content: "conteudo", id: 9 },
  ];
  const paths = data.map((item) => ({
    params: { id: item.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  /* const { data } = await axios.get(`${process.env.API_URL}/read/${id}`); */
  const data = "{ title: A fazer, content: conteudo, id: 1 }";
  return { props: { item: data } };
}

export default function EditPage({ item }) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${process.env.API_URL}/update/${item.id}`, {
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
      <Head>
        <title>{title}</title>
      </Head>
      <FormTodo titleText="Editar Nota" handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
    </>
  );
}
