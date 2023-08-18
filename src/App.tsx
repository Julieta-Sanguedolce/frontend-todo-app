import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToDoComp } from "./ToDoComp";
import { TodoInfo, TodoType } from "./Types";
import {
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

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
      <Heading padding="30" textAlign="center" size="4xl">
        To Do App
      </Heading>
      <br></br>

      <FormControl
        width="500px"
        alignItems="center"
        margin="20px"
        border="1px solid gray"
        marginBottom="100px"
      >
        <FormLabel margin="10px">Add a new thing To Do</FormLabel>
        <Input
          width="400px"
          margin="20px"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Please write your To Do..."
        />
        <FormLabel margin="10px">Do by:</FormLabel>
        <Input
          width="200px"
          margin="20px"
          value={todoDate}
          type="date"
          min={minDate}
          onChange={(e) => setTodoDate(e.target.value)}
        ></Input>
        <Button margin="20px" onClick={addNewTodo}>
          ADD
        </Button>
      </FormControl>
      <Heading size="2xl" margin="20px">
        To do List
      </Heading>
      {todoList.map((e) => (
        <ToDoComp key={e.id} todo={e} />
      ))}
    </div>
  );
}

export default App;
