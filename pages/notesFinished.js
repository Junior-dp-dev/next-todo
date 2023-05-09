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
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          <h1 className=" text-5xl  font-bold">Conclua suas notas!</h1>
          <Link href={"/notes"}>
            <CheckBoxIcon className="text-5xl text-green-500" />
          </Link>
        </div>
      )}
    </PrivateRoute>
  );
}
