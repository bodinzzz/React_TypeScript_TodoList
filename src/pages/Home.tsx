import React, { ChangeEvent, useState } from "react";
import "./Home.scss";
import { ITask } from "../interfaces/ITask";
import TodoTask from "../components/TodoTask";
import { Button, TextField, Rating, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "react-moment";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [importance, setImportance] = useState<number | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (task && deadline && importance) {
      const newTask = { id: Date.now().toString(), taskName: task, deadline: deadline, importance: importance };
      setTodoList([...todoList, newTask]);
    }
  };

  const completeTask = (taskIdToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.id != taskIdToDelete;
      })
    );
  };

  return (
    <div className="home">
      <form className="home__input-container" onSubmit={handleSubmit}>
        <TextField type="text" label="Task" name="task" variant="outlined" required onChange={(event) => setTask(event.target.value)} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={deadline}
            onChange={(newDeadline: Date | null) => {
              setDeadline(newDeadline);
            }}
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>
        <Rating
          name="simple-controlled"
          value={importance}
          onChange={(event, newValue) => {
            setImportance(newValue);
          }}
        />
        <Button variant="outlined" size="large" type="submit">
          Add Task
        </Button>
      </form>
      <Container>
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </Container>
    </div>
  );
};

export default Home;
