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
      {/*       <div className="flex flex-col min-h-vh90 justify-center items-center gap-4">
        <div className="flex text-left flex-col p-14 border-4 border-sky-500 rounded-xl">
          <h2 className="text-5xl mb-7 font-bold">{note.title}</h2>
          <span className="border-b border-green-500 opacity-30"></span>
          <p className="text-2xl mt-7">{note.content}</p>
        </div>
      </div> */}
      <NoteId note={note} />
    </>
  );
};

export default Note;
