import { useEffect, useState } from "react";
import Head from "next/head";
import { Note } from "@/components/BoxNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import axiosInstance from "../../components/axiosInstance ";
import { useRouter } from "next/router";

export default function Lista() {
  const [notes, setNotes] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const getNotes = () => {
    axiosInstance
      .get("notes/")
      .then((response) => {
        const data = response.data;
        setNotes(data);
        setMessage("Crie sua primeira nota!");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Erro ao carregar notas, tente novamente mais tarte.");
      });
  };

  if (!message) {
    setMessage("Carregando notas..");
  }

  useEffect(() => {
    getNotes();
  }, [deleted]);

  const deleting = () => {};

  const uncompletedTodos = notes.filter((note) => !note.finished);
  return (
    <PrivateRoute>
      <Head>
        <title>Notas</title>
      </Head>
      <>
        {uncompletedTodos.length !== 0 ? (
          <Note notes={uncompletedTodos} getNotes={getNotes} router={router} deleting={deleting} />
        ) : (
          <div className="min-h-vh90 flex flex-col items-center justify-center gap-5">
            <h1 className=" text-5xl  font-bold">{message}</h1>
            {message === "Crie sua primeira nota!" && (
              <Link href={"/create"}>
                <AddCircleOutlineIcon className="w-16 h-16 text-sky-500 !important" />
              </Link>
            )}
          </div>
        )}
      </>
    </PrivateRoute>
  );
}
