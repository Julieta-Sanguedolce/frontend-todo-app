import { TodoInfo } from "./Types";
import axios from "axios";
import { apiURL } from "./App";
import "./utils/App.css";
import {
  Button,
  ButtonGroup,
  Switch,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";

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
      const newTask = {
        task: userInput,
      };
      await axios.put(apiURL + "/" + todo.id, newTask);
      alert("Todo updated successfully!");
    }
  }

  async function markAsCompleted() {
    axios.put(apiURL + "/complete/" + todo.completed + "/" + todo.id);
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <CardBody width="600px" margin="20px">
        <Heading size="lg" margin="20px">
          {todo.task}
        </Heading>
        <Heading size="l" margin="20px">
          Complete by: {formattedDate}
        </Heading>
        <ButtonGroup variant="solid" spacing="6" margin="20px">
          <Button colorScheme="red" variant="solid" onClick={handleDeleteTodo}>
            Delete
          </Button>
          <Button colorScheme="teal" onClick={handleEditTodo}>
            Edit
          </Button>
        </ButtonGroup>
        <FormControl>
          <FormLabel margin="20px">Status</FormLabel>
          <Switch
            colorScheme="green"
            isChecked={todo.completed}
            onChange={markAsCompleted}
          >
            {todo.completed ? "Completed" : "Mark as completed"}
          </Switch>
        </FormControl>
      </CardBody>
    </Card>
  );
}
