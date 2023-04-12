import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateObject() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      content: content,
    };

    axios
      .post(`${process.env.API_URL}/create`, data)
      .then((response) => {
        console.log(response.data);
        router.push(`/todos/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Conteúdo:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
