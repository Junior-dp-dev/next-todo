import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axiosInstance from "./axiosInstance ";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function BtnDelete(props) {
  const { note, router, getNotes } = props;

  const handleDelete = async () => {
    const shouldDelete = confirm("Tem certeza que deseja deletar?");
    if (shouldDelete) {
      try {
        await axiosInstance.delete(`notes/delete/${note.id}/`);
        note.finished ? router.push(`/notesFinished`) : router.push(`/notes`);
        getNotes();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={handleDelete}>
      <DeleteIcon className="text-red-600" />
    </button>
  );
}

const handleFinish = async (note, setFinished, setFData) => {
  try {
    const updateNote = { ...note, finished: setFinished, fData: setFData };
    await axiosInstance.put(`notes/update/${note.id}/`, updateNote);
  } catch (error) {
    console.error(error);
  }
};

function BtnEdit(props) {
  const { note } = props;

  return (
    <button>
      <Link href={`/notes/edit/${note.id}`}>
        <EditIcon className="text-orange-400" />
      </Link>
    </button>
  );
}

function BtnVisibility({ note }) {
  return (
    <button>
      <Link href={`/notes/${note.id}`}>
        <VisibilityIcon className="text-blue-400" />
      </Link>
    </button>
  );
}

function formatarData(data = new Date()) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function BtnCheckBoxOut(props) {
  const { note, router, getNotes } = props;

  const handleFinishNote = async () => {
    await handleFinish(note, true, formatarData());
    getNotes();
    router.push(`/notes/`);
  };

  return (
    <button onClick={handleFinishNote}>
      <CheckBoxOutlineBlankIcon className="text-green-600" />
    </button>
  );
}

function BtnCheckBox(props) {
  const { note, router, getNotes } = props;

  const handleFinishNote = async () => {
    await handleFinish(note, false);
    getNotes();
    router.push(`/notesFinished/`);
  };

  return (
    <button onClick={handleFinishNote}>
      <CheckBoxIcon className="text-green-600" />
    </button>
  );
}

export function Note(props) {
  const { notes, getNotes, router } = props;
  return (
    <div className="min-h-vh90 ">
      <h1 className="my-5 pb-5 mx-10 text-5xl font-bold border-b border-blue-500 text-sky-600">A fazer</h1>
      <div className="flex gap-5 flex-wrap justify-center px-5 my-10">
        {notes.map((note) => (
          <div key={note.id} className="md:w-auto w-64 flex text-left flex-col border-4 border-sky-500 rounded-xl">
            <h2 className="font-bold text-4xl px-4 pt-3 pb-2 break-words">
              {note.title.slice(0, 23)}
              {note.title.length > 23 ? "..." : ""}
            </h2>
            <span className="border-b mx-3 border-sky-500 opacity-30"></span>
            <p className="text-2xl p-4 flex-grow break-words ">
              {note.content.slice(0, 35)}
              {note.content.length > 35 ? "..." : ""}
            </p>
            <div className="flex md:gap-5 gap-2 justify-between md:mx-4 mx-2 mb-3 items-center">
              <div className="flex gap-1">
                <EventIcon className=" text-gray-500" />
                <p>{note.cData}</p>
              </div>
              <div className="flex md:gap-3 gap-1">
                <BtnDelete note={note} router={router} getNotes={getNotes} />
                <BtnEdit note={note} />
                <BtnVisibility note={note} />
                <BtnCheckBoxOut note={note} getNotes={getNotes} router={router} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NoteFinished(props) {
  const { notes, getNotes, router } = props;

  return (
    <div className="min-h-vh90 ">
      <h1 className="my-5 pb-5 mx-10 text-5xl font-bold border-b border-yellow-500 text-yellow-700">Concluídos</h1>
      <div className="flex gap-5 flex-wrap justify-center px-5 my-10">
        {notes.map((note) => (
          <div key={note.id} className="md:w-auto w-64 flex text-left flex-col border-4 border-yellow-500 rounded-xl">
            <h2 className="font-bold text-4xl px-4 pt-3 pb-2 break-words">
              {note.title.slice(0, 23)}
              {note.title.length > 23 ? "..." : ""}
            </h2>
            <span className="border-b mx-3 border-yellow-500 opacity-30"></span>
            <p className="text-2xl p-4 flex-grow break-words ">
              {note.content.slice(0, 35)}
              {note.content.length > 35 ? "..." : ""}
            </p>
            <div className="flex md:gap-5 gap-2 justify-between md:mx-4 mx-2 mb-3 items-center">
              <div className="md:flex gap-3">
                <div className="flex gap-1">
                  <EventIcon className=" text-gray-500" />
                  <p>{note.cData}</p>
                </div>
                <div className="flex gap-1">
                  <EventAvailableIcon className=" text-gray-500" />
                  <p>{note.fData}</p>
                </div>
              </div>
              <div className="flex gap-3 mr-1">
                <BtnDelete note={note} router={router} getNotes={getNotes} />
                <BtnVisibility note={note} />
                <BtnCheckBox note={note} getNotes={getNotes} router={router} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NoteId(props) {
  const { note, router, isFinished, getNotes } = props;
  const color = isFinished ? "border-yellow-500" : "border-sky-500";
  return (
    <div className="flex flex-col min-h-vh90  justify-center items-center mx-20">
      <div className={`flex md:max-w-full break-words md:w-auto my-10 w-64 text-left flex-col border-4 ${color} rounded-xl`}>
        <h2 className=" font-bold text-5xl p-5 ">{note.title}</h2>
        <span className={`border-b mx-3 ${color} opacity-30`}></span>
        <p className="text-3xl p-7 flex-grow break-words ">{note.content}</p>
        <div className="bottom-0">
          <div className="bottom-0 flex justify-between mx-5 mb-3 items-center gap-3">
            <div className="md:flex">
              <div className="flex gap-1 md:mr-3">
                <EventIcon className=" text-gray-500" />
                <p>{note.cData}</p>
              </div>
              {isFinished && (
                <div className="flex gap-1 md:mr-3">
                  <EventAvailableIcon className=" text-gray-500" />
                  <p>{note.fData}</p>
                </div>
              )}
            </div>

            <div className="flex md:gap-3 gap-1">
              <BtnDelete note={note} router={router} getNotes={getNotes} />
              {!isFinished && <BtnEdit note={note} />}
              {isFinished ? <BtnCheckBox note={note} router={router} getNotes={getNotes} /> : <BtnCheckBoxOut note={note} router={router} getNotes={getNotes} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
