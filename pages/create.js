import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import FormTodo from "./../components/FormTodo";

export default function CreateObject() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      content: content,
    };

    axios
      .post(`${process.env.API_URL}/create`, data)
      .then((response) => {
        console.log(response.data);
        router.push(`/todos/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Criar Nota</title>
      </Head>
      <FormTodo titleText="Nova Nota" handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
    </>
  );
}
