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
  const [message, setMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      setMessage("Carregando...");
      try {
        const noteData = await GetOne(noteId);
        setTitle(noteData.title);
        setContent(noteData.content);
        setMessage(null);
      } catch (error) {
        console.error(error);
        setMessage("Falha ao atualizar nota.");
        setError("Falha ao buscar nota.");
      }
    };
    fetchNote();
  }, [noteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Carregando...");
    try {
      const response = await axiosInstance.put(`notes/update/${noteId}/`, {
        title,
        content,
      });
      setMessage(null);
      router.push(`/notes/`);
    } catch (error) {
      console.error(error);
      setMessage("Falha ao atualizar nota.");
    }
  };

  return (
    <>
      <Head>
        <title>Editar Nota</title>
      </Head>
      {error ? (
        <div className="min-h-vh90 flex flex-col items-center justify-center gap-5">
          <h1 className=" text-5xl  font-bold">{error}</h1>{" "}
        </div>
      ) : (
        <FormNote titleText={"Editar Nota"} message={message} buttonText={"Atualizar"} handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
      )}
    </>
  );
};

export default EditNote;
