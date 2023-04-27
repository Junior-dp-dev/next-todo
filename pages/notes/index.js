import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import axios from "axios";
import Head from "next/head";
import { Note } from "@/components/BoxNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

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
    <PrivateRoute>
      <Head>
        <title>Notas</title>
      </Head>
      {notes.length !== 0 ? (
        <Note notes={uncompletedTodos} getNotes={getNotes} />
      ) : (
        <div className="min-h-vh90 flex flex-col items-center justify-center gap-5">
          <h1 className=" text-5xl  font-bold">Crie sua primeira nota!</h1>
          <Link href={"/create"}>
            <AddCircleOutlineIcon className="text-5xl text-sky-500" />
          </Link>
        </div>
      )}
    </PrivateRoute>
  );
}
