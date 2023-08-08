import React from "react";
import { useState } from "react";
import "./utils/App.css";
import axios from "axios";
import { ToDoComp } from "./ToDoComp";

export interface TodoType {
  id: number;
  action: string;
  date: string;
  completed: string;
}

function App(): JSX.Element {
  const apiURL = "http://localhost:4000/";
  let counterID = 3;
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const minDate = new Date().toJSON().split("T")[0];

  async function fetchToDoList() {
    const response = await axios.get(apiURL);
    const listOfTodos = response.data;
    setTodoList(listOfTodos);
  }

  function addNewTodo() {
    counterID++;
    const newTodo: TodoType = {
      id: counterID,
      action: todoText,
      date: todoDate,
      completed: "No",
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
      {todoList.map((e) => (
        <ToDoComp key={e.id} task={e} />
      ))}
    </div>
  );
}

export default App;
