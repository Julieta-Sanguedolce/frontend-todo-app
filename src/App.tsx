import React from "react";
import { useState } from "react";
import "./utils/App.css";
import axios from "axios";
import { ToDoComp } from "./ToDoComp";

export interface TodoType {
  task: string;
  due_date: string;
  completed: boolean;
}

function App(): JSX.Element {
  const apiURL = "https://to-do-app-0386.onrender.com";
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const minDate = new Date().toJSON().split("T")[0];

  async function fetchToDoList() {
    const response = await axios.get(apiURL);
    const listOfTodos = await response.data;
    setTodoList(listOfTodos);
    console.log(listOfTodos);
  }

  function addNewTodo() {
    const newTodo: TodoType = {
      task: todoText,
      due_date: todoDate,
      completed: false,
    };
    axios.post(apiURL, newTodo);
    fetchToDoList();
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
      <p>To do List</p>
      <button onClick={fetchToDoList}>Update list</button>
      {/* {todoList.map((e) => (
        <ToDoComp key={e.id} todo={e} />
      ))} */}
    </div>
  );
}

export default App;
