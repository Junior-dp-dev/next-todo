import { useState, useEffect } from "react";
import Head from "next/head";
import { GetOne } from "../components/GetOne";
import { NoteId } from "./BoxNote";
import { useRouter } from "next/router";

const Note = ({ noteId }) => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const errorsNote = () => {
    console.log(note.title + " deleted");
  };

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
      <NoteId note={note} router={router} isFinished={note.finished} getNotes={errorsNote} />
    </>
  );
};

export default Note;
