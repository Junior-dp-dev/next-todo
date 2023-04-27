import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { getToken } from "../utils/auth";
import { useRouter } from "next/router";
import { NoteFinished } from "@/components/BoxNote";
import Link from "next/link";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import PrivateRoute from "@/components/PrivateRoute";

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
    <PrivateRoute>
      <Head>
        <title>Concluídos</title>
      </Head>
      {notes.length !== 0 ? (
        <NoteFinished notes={uncompletedTodos} getNotes={getNotes} />
      ) : (
        <div className="min-h-vh90 flex flex-col items-center justify-center gap-5">
          <h1 className=" text-5xl  font-bold">Conclua suas notas!</h1>
          <Link href={"/notes"}>
            <CheckBoxIcon className="text-5xl text-green-500" />
          </Link>
        </div>
      )}
    </PrivateRoute>
  );
}
