import React from "react";
import { useState, useEffect } from "react";
import "./utils/App.css";
import axios from "axios";
import { ToDoComp } from "./ToDoComp";
import { TodoInfo, TodoType } from "./Types";

export const apiURL = "https://to-do-app-0386.onrender.com";

function App(): JSX.Element {
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);
  const minDate = new Date().toJSON().split("T")[0];

  async function fetchToDoList() {
    const response = await axios.get(apiURL);
    const listOfTodos = await response.data;
    setTodoList(listOfTodos);
  }

  useEffect(() => {
    fetchToDoList();
  }, [todoList]);

  function addNewTodo() {
    const newTodo: TodoType = {
      task: todoText,
      due_date: new Date(todoDate).toISOString().split("T")[0],
      completed: false,
    };
    axios.post(apiURL, newTodo);
  }

  return (
    <div>
      <h1 className="title">To Do App</h1>
      <br></br>
      <div className="todoInput">
        <p>Add a new thing To Do</p>
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Please write your To Do..."
        />
        <input
          value={todoDate}
          type="date"
          min={minDate}
          onChange={(e) => setTodoDate(e.target.value)}
        ></input>
        <br />
        <button onClick={addNewTodo}>ADD</button>
      </div>
      <h1>To do List</h1>
      {todoList.map((e) => (
        <ToDoComp key={e.id} todo={e} />
      ))}
    </div>
  );
}

export default App;
