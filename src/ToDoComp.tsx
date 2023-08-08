import { TodoType } from "./App";
import { useState } from "react";

interface ToDoProp {
  task: TodoType;
}

export function ToDoComp({ task }: ToDoProp): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked: boolean) => !prevChecked);
  };

  return (
    <div>
      <h2>{task.action}</h2>
      <p>Complete by: {task.date}</p>
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
