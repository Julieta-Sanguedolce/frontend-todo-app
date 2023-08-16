import { TodoInfo } from "./Types";
import axios from "axios";
import { apiURL } from "./App";
import "./utils/App.css";

interface ToDoProp {
  todo: TodoInfo;
}

export function ToDoComp({ todo }: ToDoProp): JSX.Element {
  async function handleDeleteTodo() {
    axios.delete(apiURL + "/" + todo.id);
  }

  const formattedDate = new Date(todo.due_date).toISOString().split("T")[0];

  async function handleEditTodo() {
    const userInput = window.prompt(
      "Please edit the todo description: " + todo.task
    );
    if (userInput !== null) {
      axios.put(apiURL + "/" + todo.id, userInput);
    }
  }

  async function markAsCompleted() {
    axios.put(apiURL + "/complete/" + todo.completed + "/" + todo.id);
  }

  return (
    <div className="todoComp">
      <hr />
      <h3>{todo.task}</h3>
      <p>Complete by: {formattedDate}</p>
      <button onClick={handleDeleteTodo}>Delete</button>
      <button onClick={handleEditTodo}>Edit</button>
      <button onClick={markAsCompleted}>
        {todo.completed ? "Completed" : "Mark as completed"}
      </button>
    </div>
  );
}
