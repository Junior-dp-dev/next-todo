import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import { getToken } from "../utils/auth";

function BtnDelete(props) {
  const { note, getNotes } = props;
  const handleDelete = async () => {
    try {
      const token = getToken();
      await axios.delete(`${process.env.API_URL}/api/notes/delete/${note.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Nota ${note.id} deletada`);
      getNotes();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button onClick={handleDelete}>
      <DeleteIcon className="text-red-600" />
    </button>
  );
}

const handleFinish = async (note, setFinished, getNotes, router) => {
  const token = getToken();

  try {
    const updatedItem = { ...note, finished: setFinished };
    const response = await axios.put(`${process.env.API_URL}/api/notes/update/${note.id}/`, updatedItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Note updated:", response.data);
    getNotes();
    router.push(`/notes/`);
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

function BtnCheckBoxOut(props) {
  const { note, getNotes, router } = props;

  const handleFinishNote = async () => {
    await handleFinish(note, true, getNotes, router);
  };

  return (
    <button onClick={handleFinishNote}>
      <CheckBoxOutlineBlankIcon className="text-green-600" />
    </button>
  );
}

function BtnCheckBox(props) {
  const { note, getNotes, router } = props;

  const handleFinishNote = async () => {
    await handleFinish(note, false, getNotes, router);
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
      <h1 className="my-10 mx-40 pb-5 text-5xl font-bold border-b border-green-500">Tarefas para fazer</h1>
      <div className="flex gap-5 flex-wrap justify-center px-5">
        {notes.map((note) => (
          <div key={note.id} className="flex text-left flex-col w-[28rem] border-4 border-sky-500 rounded-xl">
            <h2 className=" font-bold text-4xl px-4 pt-3 pb-2">
              {note.title.slice(0, 23)}
              {note.title.length > 23 ? "..." : ""}
            </h2>
            <span className="border-b mx-3 border-green-500 opacity-30"></span>
            <p className="text-2xl p-4 flex-grow break-words ">
              {note.content.slice(0, 73)}
              {note.content.length > 73 ? "..." : ""}
            </p>
            <div className="bottom-0">
              <div className="flex justify-end gap-3 mr-5 mb-3">
                <BtnDelete note={note} getNotes={getNotes} />
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
      <h1 className="my-10 mx-40 pb-5 text-5xl font-bold border-b border-green-500">Tarefas para fazer</h1>
      <div className="flex gap-5 flex-wrap justify-center px-5">
        {notes.map((note) => (
          <div key={note.id} className="flex text-left flex-col w-[28rem] border-4 border-sky-500 rounded-xl">
            <h2 className=" font-bold text-4xl px-4 pt-3 pb-2">
              {note.title.slice(0, 23)}
              {note.title.length > 23 ? "..." : ""}
            </h2>
            <span className="border-b mx-3 border-green-500 opacity-30"></span>
            <p className="text-2xl p-4 flex-grow break-words ">
              {note.content.slice(0, 73)}
              {note.content.length > 73 ? "..." : ""}
            </p>
            <div className="bottom-0">
              <div className="flex justify-end gap-3 mr-5 mb-3">
                <BtnDelete note={note} getNotes={getNotes} />
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
  const { note } = props;

  return (
    <div className="flex flex-col min-h-vh90  justify-center items-center mx-20">
      <div className="flex text-left flex-col border-4 border-sky-500 rounded-xl">
        <h2 className=" font-bold text-5xl p-5 ">{note.title}</h2>
        <span className="border-b mx-3 border-green-500 opacity-30"></span>
        <p className="text-3xl p-7 flex-grow break-words ">{note.content}</p>
        <div className="bottom-0">
          <div className="flex justify-end gap-3 mr-5 mb-3">
            <BtnDelete note={note} />
            <BtnEdit note={note} />
            <BtnVisibility note={note} />
            <BtnCheckBoxOut note={note} />
          </div>
        </div>
      </div>
    </div>
  );
}
