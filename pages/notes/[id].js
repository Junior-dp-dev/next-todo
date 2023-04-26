import { useRouter } from "next/router";
import Head from "next/head";
import Note from "../../components/Note";

export default function NoteId() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>
        <Note noteId={id} />
      </div>
    </>
  );
}
