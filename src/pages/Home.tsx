import React, { ChangeEvent, useState } from "react";
import "./Home.scss";
import { ITask } from "../interfaces/ITask";
import TodoTask from "../components/TodoTask";
import { Button } from "@mui/material";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  // @TODO: Not delete by its name but by id for example
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  return (
    <div className="home">
      <input type="text" placeholder="Task..." name="task" onChange={handleChange} />
      <input type="number" placeholder="Deadline(in Days)" name="deadline" onChange={handleChange} />
      <Button variant="outlined" onClick={addTask}>
        Add Task
      </Button>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          <button>delete</button>;
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default Home;
