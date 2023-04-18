import { useState } from "react";
import axios from "axios";

const EditNoteForm = ({ noteId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("api");

    try {
      const response = await axios.put(
        `${process.env.API_URL}/api/notes/${noteId}`,
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
      onClose();
    } catch (error) {
      console.error(error);
      setError("Failed to update note.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-vh90 justify-center items-center gap-4">
      <h2 className="text-4xl mb-5 font-bold">Editar Nota {noteId}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <label className="flex flex-col items-start">
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-stone-500 w-80" />
      </label>

      <label className="flex flex-col items-start">
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="border border-stone-500 w-80" />
      </label>

      <button className="border font-bold border-black hover:bg-gray-100 px-6 py-1 rounded" type="submit">
        Update Note
      </button>
    </form>
  );
};

export default EditNoteForm;

{
  /* <form onSubmit={handleSubmit} className="flex flex-col min-h-vh90 justify-center items-center gap-4">
<h1 className="text-4xl mb-5 font-bold">{titleText}</h1>
<div className="flex flex-col items-start">
  <label>Título:</label>
  <input className="border border-stone-500 w-80" type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
</div>
<div className="flex flex-col items-start">
  <label>Conteúdo:</label>
  <textarea className="border border-stone-500  w-80" defaultValue={content} onChange={(e) => setContent(e.target.value)} />
</div>
<button className="border font-bold border-black hover:bg-gray-100 px-6 py-1 rounded" type="submit">
  Enviar
</button>
</form> */
}
