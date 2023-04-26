import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { getToken } from "../utils/auth";
import { useRouter } from "next/router";
import { NoteFinished } from "@/components/BoxNote";

export default function Lista() {
  const [notes, setNotes] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getNotes();
  }, [deleted]);

  const getNotes = () => {
    const token = getToken();
    console.log("O token aqui na Lista é: token");
    axios
      .get(`${process.env.API_URL}/api/notes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log("OS DADOS RECEBIDOS SÃO:");
        console.table(data);
        setNotes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uncompletedTodos = notes.filter((note) => note.finished);
  return (
    <>
      <Head>
        <title>Concluídos</title>
      </Head>
      {/*  <BoxNote notes={uncompletedTodos} handleDelete={handleDelete} handleFinish={handleFinish} finished={true} /> */}
      <NoteFinished notes={uncompletedTodos} getNotes={getNotes} />
    </>
  );
}
