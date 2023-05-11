import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NoteFinished } from "@/components/BoxNote";
import Link from "next/link";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PrivateRoute from "@/components/PrivateRoute";
import axiosInstance from "@/components/axiosInstance ";

export default function Lista() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    axiosInstance
      .get(`notes/`)
      .then((response) => {
        const data = response.data;
        setNotes(data);
        setMessage("Conclua suas notas!");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Erro ao carregar notas, tente novamente mais tarte.");
      });
  };

  if (!message) {
    setMessage("Carregando notas..");
  }

  const uncompletedTodos = notes.filter((note) => note.finished);
  return (
    <PrivateRoute>
      <Head>
        <title>Concluídos</title>
      </Head>
      {notes.length !== 0 ? (
        <NoteFinished notes={uncompletedTodos} getNotes={getNotes} router={router} />
      ) : (
        <div className="min-h-vh90 flex flex-col items-center justify-center gap-5">
          <h1 className=" text-5xl  font-bold">{message}</h1>
          {message === "Conclua suas notas!" && (
            <Link href={"/notes"}>
              <CheckBoxIcon className="text-5xl text-green-500" />
            </Link>
          )}
        </div>
      )}
    </PrivateRoute>
  );
}
