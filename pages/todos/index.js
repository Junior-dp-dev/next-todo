import styles from "../../styles/Todos.module.css";
import axios from "axios";
import Link from "next/link";

export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:8000/");
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
  return (
    <>
      <h1>Tarefas para fazer</h1>
      <ul className={styles.todolist}>
        {todos.map((todo) => (
          <li key={todo.id}>
            {" "}
            {todo.title} - <Link href={`/todos/${todo.id}`}>Ver mais..</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
