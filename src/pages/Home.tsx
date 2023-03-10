import React, { useState } from "react";
import "./Home.scss";
import { ITask } from "../interfaces/ITask";
import TodoTask from "../components/TodoTask";
import { Button, TextField, Rating, Container, Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { DateValidationError } from "@mui/x-date-pickers";
// import moment from "react-moment";

const Home = () => {
  const today = new Date();
  // const today = dayjs();
  // var todayDate = new Date();
  // todayDate = today.toDate();
  // console.log(today);
  // console.log(todayDate);
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [importance, setImportance] = useState<number | null>(null);
  const [taskError, setTaskError] = useState(false);
  const [deadlineError, setDeadlineError] = useState<DateValidationError | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!task) {
      setTaskError(true);
    }
    if (!deadline) {
      setTaskError(true);
    }
    if (task && deadline && importance) {
      console.log(task, deadline, importance);
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

  const deadlineErrorMessage = React.useMemo(() => {
    switch (deadlineError) {
      case "maxDate":
      case "minDate": {
        return "date must in the first quarter of 2022";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "Your date is not valid";
      }
    }
  }, [deadline]);

  return (
    <div className="home">
      <form className="home__input-container" onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Task"
          name="task"
          variant="outlined"
          error={taskError}
          helperText={taskError ? "Task Name is Required" : " "}
          onChange={(event) => setTask(event.target.value)}
          className="home__input-container__task"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} className="home__input-container__deadline">
          <DatePicker
            value={deadline}
            label="Deadline"
            onChange={(newDeadline: Date | null) => {
              setDeadline(newDeadline);
            }}
            disablePast
            format="YYYY/MM/DD"
            onError={(newError: DateValidationError) => setDeadlineError(newError)}
            slotProps={{
              textField: {
                helperText: deadlineError ? deadlineErrorMessage : " ",
              },
            }}
          />
        </LocalizationProvider>
        <Box className="home__input-container__rating">
          <Rating
            name="simple-controlled"
            value={importance}
            onChange={(event, newValue) => {
              setImportance(newValue);
            }}
          />
        </Box>
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
