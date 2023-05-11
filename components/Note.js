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
    return (
      <div className="min-h-vh90 flex flex-col items-center justify-center gap-5">
        <h1 className=" text-5xl text-red-500 font-bold">{error}</h1>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-vh90 flex flex-col items-center justify-center gap-5">
        <h1 className=" text-5xl  font-bold">{"Carregando nota.."}</h1>
      </div>
    );
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
