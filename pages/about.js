import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function About() {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/read/1")
      .then((response) => {
        const data = response.data;
        setTodo(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Sobre</title>
      </Head>
      <h1>Página Sobre Nós {todo.title}</h1>
    </>
  );
}
