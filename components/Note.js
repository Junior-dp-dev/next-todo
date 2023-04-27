import { useState, useEffect } from "react";
import Head from "next/head";
import { GetOne } from "../components/GetOne";
import { NoteId } from "./BoxNote";

const Note = ({ noteId }) => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await GetOne(noteId);
        setNote(noteData);
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
        <title>Nota</title>
      </Head>
      <NoteId note={note} />
    </>
  );
};

export default Note;
