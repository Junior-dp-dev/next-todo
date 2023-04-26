import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import axios from "axios";
import Head from "next/head";
import { Note } from "@/components/BoxNote";

export default function Lista() {
  const [notes, setNotes] = useState([]);
  const [deleted, setDeleted] = useState(false);

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

  useEffect(() => {
    getNotes();
  }, [deleted]);

  const uncompletedTodos = notes.filter((note) => !note.finished);
  return (
    <>
      <Head>
        <title>Notas</title>
      </Head>
      <Note notes={uncompletedTodos} getNotes={getNotes} />
    </>
  );
}
