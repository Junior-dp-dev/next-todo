import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../utils/auth";
import FormNote from "@/components/FormNote";
import { GetOne } from "../components/GetOne";
import { useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";

export default function CreateObject() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    GetOne(27)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = getToken();
    const data = {
      title: title,
      content: content,
    };

    axios
      .post(`${process.env.API_URL}/api/notes/add/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
