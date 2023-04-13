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

  /* const uncompletedTodos = todos.filter((todo) => !todo.finished); */
  const uncompletedTodos = [
    { title: "A fazer", content: "conteudo", id: 1 },
    { title: "A fazer", content: "conteudo", id: 2 },
    { title: "A fazeraaaaassssssssssssssaaaa", content: "conteudoooooooooooooooo", id: 3 },
    { title: "A fazer", content: "conteudo", id: 4 },
    { title: "A fazer", content: "conteudo", id: 5 },
    { title: "A fazer", content: "conteudo", id: 6 },
    { title: "A fazer", content: "conteudo", id: 7 },
    { title: "A fazer", content: "conteudo", id: 8 },
    { title: "A fazer", content: "conteudo", id: 9 },
  ];
  return (
    <div className=" flex flex-col min-h-vh90 justify-center items-center gap-2 py-5">
      <h1 className="p-5 min-w-600 text-3xl font-bold border border-sky-500">Tarefas para fazer</h1>
      {uncompletedTodos.map((todo) => (
        <ul key={todo.id} className=" p-4 min-w-600 border border-sky-500">
          <li className="flex  justify-between">
            <Link className="flex items-baseline gap-2" href={`/todos/${todo.id}`}>
              <h2 className="text-3xl">
                {todo.id})&nbsp; {todo.title.slice(0, 20)}
                {todo.title.length > 20 ? "..." : ""}
              </h2>
              <p className=" from-neutral-500">
                {todo.content.slice(0, 8)}
                {todo.content.length > 8 ? "..." : ""}
              </p>
            </Link>
            <div className="flex gap-1.5 mr-2">
              <button
                onClick={() => {
                  handleDelete(todo);
                  router.push(`/todos/`);
                }}>
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
