import React from "react";
import { ITask } from "../interfaces/ITask";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div>
      <div>{task.taskName}</div>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => completeTask(task.taskName)}>
        delete
      </Button>
    </div>
  );
};

export default TodoTask;
