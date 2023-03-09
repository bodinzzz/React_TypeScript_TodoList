import React, { ChangeEvent, useState } from "react";
import "./Home.scss";
import { ITask } from "../interfaces/ITask";
import TodoTask from "../components/TodoTask";
import { Button, TextField, Rating } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "react-moment";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [importance, setImportance] = useState<number | null>(null);

  const addTask = (): void => {
    const newTask = { id: Date.now().toString(), taskName: task, deadline: deadline, importance: importance };
    setTodoList([...todoList, newTask]);
    console.log(todoList);
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
      <div className="home__input-container">
        <TextField type="text" label="Task" name="task" variant="outlined" onChange={(event) => setTask(event.target.value)} />
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
        <Button variant="outlined" size="large" onClick={addTask}>
          Add Task
        </Button>
      </div>
      <div className="home__todo-list">
        {todoList.map((task: ITask, key: number) => {
          <button>delete</button>;
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default Home;
