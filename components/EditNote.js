import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useRouter } from "next/router";
import FormNote from "./FormNote";
import Head from "next/head";
import { GetOne } from "../components/GetOne";
import { useEffect } from "react";

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

    const token = getToken();

    try {
      const response = await axios.put(
        `${process.env.API_URL}/api/notes/update/${noteId}/`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Note updated:", response.data);

      // Close the form after successful update
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
      <FormNote titleText={"Editar Nota"} buttonText={"Atualizar"} handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
    </>
  );
};

export default EditNote;
