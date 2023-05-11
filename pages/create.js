import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import FormNote from "@/components/FormNote";
import PrivateRoute from "@/components/PrivateRoute";
import axiosInstance from "@/components/axiosInstance ";

export default function CreateObject() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const router = useRouter();

  function formatarData(data = new Date()) {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Adicionando nota...");

    const data = {
      title: title,
      content: content,
      cData: formatarData(),
    };

    axiosInstance
      .post(`notes/add/`, data)
      .then(() => {
        setMessage("Nota adicionada.");
        router.push(`/notes/`);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Erro ao adicionar nota.");
      });
  };

  return (
    <PrivateRoute>
      <Head>
        <title>Criar Nota</title>
      </Head>
      <FormNote titleText={"Nova Nota"} message={message} buttonText={"Criar"} handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
    </PrivateRoute>
  );
}
