import { useState } from "react";
import { useRouter } from "next/router";
import FormNote from "./FormNote";
import Head from "next/head";
import { GetOne } from "../components/GetOne";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance ";

const EditNote = ({ noteId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await GetOne(noteId);
        setTitle(noteData.title);
        setContent(noteData.content);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch note.");
      }
    };
    fetchNote();
  }, [noteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.put(`notes/update/${noteId}/`, {
        title,
        content,
      });
      router.push(`/notes/`);
    } catch (error) {
      console.error(error);
      setError("Failed to update note.");
    }
  };

  return (
    <>
      <Head>
        <title>Editar Nota</title>
      </Head>
      {error ? (
        <p className="text-red-500 font-bold">{error}</p>
      ) : (
        <FormNote titleText={"Editar Nota"} buttonText={"Atualizar"} handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
      )}
    </>
  );
};

export default EditNote;
