import React from "react";
import Link from "next/link";

function FormNote(props) {
  const { titleText, buttonText, handleSubmit, title, setTitle, content, setContent, message } = props;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-vh90 justify-center items-center gap-4">
      <h1 className="text-5xl mb-5 font-bold">{titleText}</h1>
      <div className="flex flex-col items-start">
        <label className="font-bold">Título:</label>
        <input
          type="text"
          maxLength="75"
          placeholder={title}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          className="focus:outline-none rounded md:w-80 w-60 h-8 pl-1 border-2 border-black"
        />
      </div>
      <div className="flex flex-col items-start">
        <label className="font-bold">Conteúdo:</label>
        <textarea defaultValue={content} maxLength="235" onChange={(e) => setContent(e.target.value)} className="focus:outline-none rounded md:w-80 w-60 pl-1 border-2 border-black" />
      </div>
      {message && <p className="font-bold">{message}</p>}
      <button className=" text-2xl border rounded-full w-60 h-12 border-black text-white font-bold mt-5 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-green-600 hover:to-lime-400" type="submit">
        {buttonText}
      </button>
      <button className="border rounded-full px-6 py-1 border-black text-white font-bold mt-5 bg-gradient-to-r from-sky-300 to-sky-400 hover:from-green-400 hover:to-lime-200">
        <Link href={"/notes"}>Cancelar</Link>
      </button>
    </form>
  );
}

export default FormNote;
