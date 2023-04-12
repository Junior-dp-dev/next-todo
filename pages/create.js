import axios from "axios";
import { useState } from "react";

export default function CreateObject() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      content: content,
    };

    axios
      .post("http://localhost:8000/create", data)
      .then((response) => {
        console.log(response.data);
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
