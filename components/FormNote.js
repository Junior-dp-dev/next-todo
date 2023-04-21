import React from "react";

function FormNote(props) {
  const { titleText, buttonText, handleSubmit, title, setTitle, content, setContent } = props;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-vh90 justify-center items-center gap-4">
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
        {buttonText}
      </button>
    </form>
  );
}

export default FormNote;
