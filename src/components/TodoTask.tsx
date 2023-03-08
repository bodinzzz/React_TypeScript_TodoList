import React from "react";
import { ITask } from "../interfaces/ITask";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div>
      <div>{task.taskName}</div>
      <button onClick={() => completeTask(task.taskName)}>delete</button>
    </div>
  );
};

export default TodoTask;
