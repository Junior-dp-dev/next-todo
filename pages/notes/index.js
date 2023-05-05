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
  const router = useRouter();

  const getNotes = () => {
    axiosInstance
      .get("notes/")
      .then((response) => {
        const data = response.data;
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
        <Note notes={uncompletedTodos} getNotes={getNotes} router={router} />
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
