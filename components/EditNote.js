import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useRouter } from "next/router";
import FormNote from "./FormNote";
import Head from "next/head";

const EditNote = ({ noteId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

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
      <FormNote titleText={"Editar Nota " + noteId} buttonText={"Atualizar"} handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} />
    </>
  );
};

export default EditNote;
