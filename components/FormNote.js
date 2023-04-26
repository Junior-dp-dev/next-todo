import React from "react";

function FormNote(props) {
  const { titleText, buttonText, handleSubmit, title, setTitle, content, setContent } = props;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-vh90 justify-center items-center gap-4">
      <h1 className="text-5xl mb-5 font-bold">{titleText}</h1>
      <div className="flex flex-col items-start">
        <label className="font-bold">Título:</label>
        <input type="text" placeholder={title} defaultValue={title} onChange={(e) => setTitle(e.target.value)} className="focus:outline-none rounded w-80 h-8 pl-3 border-2 border-black" />
      </div>
      <div className="flex flex-col items-start">
        <label className="font-bold">Conteúdo:</label>
        <textarea defaultValue={content} onChange={(e) => setContent(e.target.value)} className="focus:outline-none rounded w-80 pl-3 border-2 border-black" />
      </div>
      <button className="border rounded-full w-60 h-10 border-black text-white font-bold mt-5 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-green-600 hover:to-lime-400" type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export default FormNote;
