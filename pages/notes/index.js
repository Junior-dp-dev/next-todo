import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getToken } from "../../utils/auth";

export default function Lista() {
  const [notes, setNotes] = useState([]);
  const [deleted, setDeleted] = useState(false);

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

  const handleDelete = async (item) => {
    try {
      const token = getToken();
      await axios.delete(`${process.env.API_URL}/api/notes/delete/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Nota ${item.id} deletada`);
      setDeleted(!deleted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinish = async (item) => {
    const token = getToken();
    try {
      const updatedItem = { ...item, finished: true };
      const response = await axios.put(`${process.env.API_URL}/api/notes/update/${item.id}/`, updatedItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getNotes();

      console.log("Note updated:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const uncompletedTodos = notes.filter((note) => !note.finished);
  return (
    <>
      <Head>
        <title>Notas</title>
      </Head>

      <div className=" flex flex-col min-h-vh90 justify-center items-center gap-2 py-5">
        <h1 className="p-5 min-w-600 text-3xl font-bold border border-sky-500">Tarefas para fazer</h1>
        {uncompletedTodos.map((note) => (
          <ul key={note.id} className=" p-4 min-w-600 border border-sky-500">
            <li className="flex  justify-between">
              <Link className="flex items-baseline gap-2" href={`/notes/${note.id}`}>
                <h2 className="text-3xl">
                  {note.id})&nbsp; {note.title.slice(0, 20)}
                  {note.title.length > 20 ? "..." : ""}
                </h2>
                <p className=" from-neutral-500">
                  {note.content.slice(0, 8)}
                  {note.content.length > 8 ? "..." : ""}
                </p>
              </Link>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    handleDelete(note);
                  }}>
                  <DeleteIcon className="text-red-600" />
                </button>

                <button>
                  <Link href={`/notes/edit/${note.id}`}>
                    <EditIcon className="text-orange-400" />
                  </Link>
                </button>
                <button
                  onClick={() => {
                    handleFinish(note);
                  }}>
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
