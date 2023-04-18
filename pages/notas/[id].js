import { useRouter } from "next/router";
import Head from "next/head";
import EditNoteForm from "../EditNoteForm";

export default function EditNote() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Editar Nota</title>
      </Head>
      <div>
        <EditNoteForm noteId={id} />
      </div>
    </>
  );
}
