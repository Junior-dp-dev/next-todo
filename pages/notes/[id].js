import { useRouter } from "next/router";
import PrivateRoute from "@/components/PrivateRoute";
import Note from "../../components/Note";

export default function NoteId() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PrivateRoute>
      <div>
        <Note noteId={id} router={router} />
      </div>
    </PrivateRoute>
  );
}
