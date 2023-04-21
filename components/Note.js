import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Head from "next/head";

const Note = ({ noteId }) => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`${process.env.API_URL}/api/note/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNote(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch note.");
      }
    };
    fetchNote();
  }, [noteId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!note) {
    return <p>Loading note...</p>;
  }

  return (
    <>
      <Head>
        <title>Nota {note.id}</title>
      </Head>
      <div>
        <h2 className="text-4xl mb-5 font-bold">{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </>
  );
};

export default Note;
