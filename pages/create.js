import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import FormNote from "@/components/FormNote";
import PrivateRoute from "@/components/PrivateRoute";
import axiosInstance from "@/components/axiosInstance ";

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

    axiosInstance
      .post(`notes/add/`, data)
      .then((response) => {
        console.log(response.data);
        router.push(`/notes/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PrivateRoute>
      <Head>
        <title>Criar Nota</title>
      </Head>
      <FormNote titleText={"Nova Nota"} buttonText={"Criar"} handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
    </PrivateRoute>
  );
}
