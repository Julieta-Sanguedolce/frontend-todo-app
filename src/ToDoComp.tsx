import { TodoType } from "./App";
import { useState } from "react";

interface ToDoProp {
  todo: TodoType;
}

export function ToDoComp({ todo }: ToDoProp): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked: boolean) => !prevChecked);
  };

  return (
    <div>
      <h2>{todo.task}</h2>
      <p>Complete by: {todo.due_date}</p>
      <label>
        Completed?
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
}
