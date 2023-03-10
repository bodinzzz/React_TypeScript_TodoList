import React from "react";
import { ITask } from "../interfaces/ITask";
import { Typography, Button, Card, CardContent, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { pink } from "@mui/material/colors";
import "./TodoTask.scss";
import moment from "moment";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const card = (task: ITask, completeTask: any) => {
  let deadline = new Date();
  let deadlineFormatted: string = "";
  if (task.deadline) {
    deadline = new Date(task.deadline);
    deadlineFormatted = moment(deadline).format("YYYY/MM/DD");
  }

  return (
    <CardContent>
      <Rating name="read-only" value={task.importance} readOnly />
      <Typography variant="h5" gutterBottom>
        {task.taskName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {deadlineFormatted}
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
