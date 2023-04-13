import styles from "../../styles/Todos.module.css";
import axios from "axios";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { handleDelete } from "../../components/DeleteApi";
import { useRouter } from "next/router";

export async function getStaticProps() {
  try {
    const response = await axios.get(`${process.env.API_URL}`);
    const todos = response.data;
    console.log(todos);
    return {
      props: { todos },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { todos: [] }, // retorna um array vazio caso ocorra um erro
    };
  }
}

export default function Todos({ todos }) {
  const router = useRouter();
  const handleFinish = async (item) => {
    try {
      // define o valor do item.finished como true
      const updatedItem = { ...item, finished: true };

      // faz a requisição PUT para atualizar o item
      await axios.put(`${process.env.API_URL}/update/${item.id}`, updatedItem);
      router.push(`/todos/`);
    } catch (error) {
      console.error(error);
    }
  };

  const uncompletedTodos = todos.filter((todo) => !todo.finished);
  return (
    <div className={styles.container}>
      <h1 className="font-handlee">Tarefas para fazer</h1>
      {uncompletedTodos.map((todo) => (
        <ul key={todo.id}>
          <li>
            <Link className="flex items-baseline" href={`/todos/${todo.id}`}>
              <h2>
                {todo.id})&nbsp; {todo.title.slice(0, 20)}
                {todo.title.length > 20 ? "..." : ""}
              </h2>
              <p>
                {todo.content.slice(0, 8)}
                {todo.content.length > 8 ? "..." : ""}
              </p>
            </Link>
            <div className="flex gap-1.5 mr-2">
              <button onClick={() => handleDelete(todo)}>
                <DeleteIcon className="text-red-600" />
              </button>
              <Link href={`/todos/edit/${todo.id}`}>
                <EditIcon className="text-orange-400" />
              </Link>
              <button onClick={() => handleFinish(todo)}>
                <CheckCircleIcon className="text-green-600" />
              </button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}
