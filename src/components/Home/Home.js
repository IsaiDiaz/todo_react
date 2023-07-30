import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addTask, deleteTask, editTask, changeStatus} from "../../actions/actions";
import styles from "./Home.module.css";
import Corner_Button from "../Corner_Button/Corner_Button";
import Task from "../Task/Task";
import AddTaskDialog from "../AddTaskDialog/AddTaskDialog";

const Home = () => {
    const categories = useSelector((state) => state.tasks.categories); 
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleDeleteTask = (index) => {
      dispatch(deleteTask(index));
    };

    const handleEditTask = (index) => {
      const name = prompt("Nombre de la tarea:");
      const description = prompt("Descripción de la tarea:");
      const date = prompt("Fecha de la tarea:");
      const status = prompt("Estado de la tarea:");
      const newTask = {
        name: name,
        description: description,
        date: date,
        status: status
      };
      dispatch(editTask(index, newTask));
    };

    const handleCompleteTask = (index) => {
      dispatch(changeStatus(index, "Completada"));
    }
  
    return (
      <div className={styles.main}>
        <h1 className={styles.title}>Tareas</h1>
        <div className={styles.container}>
          {tasks.length > 0? tasks.map((task, index) => (
            <Task
              key={index}
              name={task.name}
              description={task.description}
              date={task.date}
              status={task.status}
              categories={task.categories}
              handleDelete={() => handleDeleteTask(index)}
              handleEdit={() => handleEditTask(index)}
              handleComplete={() => handleCompleteTask(index)}
            /> 
          )) : <p className={styles.message}>No hay tareas</p> }
        </div>
        <Corner_Button text="+" action={handleOpen} />
        <AddTaskDialog open={open} handleClose={handleClose} categories={categories} />
      </div>
    );
  };

export default Home;