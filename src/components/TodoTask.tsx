import React from "react";
import { ITask } from "../interfaces/ITask";
import { Typography, Button, Card, CardContent, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { pink } from "@mui/material/colors";
import "./TodoTask.scss";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const card = (task: ITask, completeTask: any) => {
  return (
    <CardContent>
      <Rating name="read-only" value={task.importance} readOnly />
      <Typography variant="h5" gutterBottom>
        {task.taskName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {task.deadline ? task.deadline.toString() : ""}
      </Typography>
      <Button variant="outlined" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => completeTask(task.id)}>
        Delete
      </Button>
    </CardContent>
  );
};

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div className="todo-task">
      <Card variant="outlined">{card(task, completeTask)} </Card>
    </div>
  );
};

export default TodoTask;
