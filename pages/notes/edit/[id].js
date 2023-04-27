import { useRouter } from "next/router";
import Head from "next/head";
import EditNote from "../../../components/EditNote";
import PrivateRoute from "@/components/PrivateRoute";

export default function EditNoteId() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PrivateRoute>
      <Head>
        <title>Editar Nota</title>
      </Head>
      <div>
        <EditNote noteId={id} />
      </div>
    </PrivateRoute>
  );
}
