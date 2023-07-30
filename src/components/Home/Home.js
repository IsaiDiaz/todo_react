import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addTask, deleteTask, editTask, changeStatus} from "../../actions/actions";
import styles from "./Home.module.css";
import Corner_Button from "../Corner_Button/Corner_Button";
import Task from "../Task/Task";

const Home = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState('');
  
    const handleAddTask = () => {
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
      dispatch(addTask(newTask));
      setNewTask('');
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
              handleDelete={() => handleDeleteTask(index)}
              handleEdit={() => handleEditTask(index)}
              handleComplete={() => handleCompleteTask(index)}
            /> 
          )) : <p className={styles.message}>No hay tareas</p> }
        </div>
        <Corner_Button text="+" action={handleAddTask} />
      </div>
    );
  };

export default Home;