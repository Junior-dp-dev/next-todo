import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { handleDelete } from "../components/DeleteApi";

export default function Lista() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    const token = localStorage.getItem("api");
    console.log("token:" + token);
    axios
      .get(`${process.env.API_URL}/api/notes`, {
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

  return (
    <>
      <Head>
        <title>Notas</title>
      </Head>

      <div className=" flex flex-col min-h-vh90 justify-center items-center gap-2 py-5">
        <h1 className="p-5 min-w-600 text-3xl font-bold border border-sky-500">Tarefas para fazer</h1>
        {notes.map((note) => (
          <ul key={note.id} className=" p-4 min-w-600 border border-sky-500">
            <li className="flex  justify-between">
              <Link className="flex items-baseline gap-2" href={`/todos/${note.id}`}>
                <h2 className="text-3xl">
                  {/* {note.id})&nbsp; {note.body.slice(0, 20)} */}
                  {note.id})&nbsp; {note.body}
                  {note.body.length > 20 ? "..." : ""}
                </h2>
                <p className=" from-neutral-500">
                  {/* {note.user.slice(0, 8)} */}
                  {note.user}
                  {note.user.length > 8 ? "..." : ""}
                </p>
              </Link>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    handleDelete(note);
                    router.push(`/todos/`);
                  }}>
                  <DeleteIcon className="text-red-600" />
                </button>
                <button>
                  {/* <Link href={`/todos/edit/${note.id}`}> */}
                  <Link href={`/notas/${note.id}`}>
                    <EditIcon className="text-orange-400" />
                  </Link>
                </button>
                <button onClick={() => handleFinish(note)}>
                  <CheckCircleIcon className="text-green-600" />
                </button>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
