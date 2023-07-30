import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addTask, deleteTask, editTask, changeStatus} from "../../actions/actions";
import styles from "./Home.module.css";
import Corner_Button from "../Corner_Button/Corner_Button";
import Task from "../Task/Task";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Home = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
      name: "",
      description: "",
      date: "",
      status: ""
    });

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewTaskData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleAddTask = () => {
      dispatch(addTask(newTaskData));
      setNewTaskData({
        name: "",
        description: "",
        date: "",
        status: ""
      });
      handleClose();
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
        <Corner_Button text="+" action={handleOpen} />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Agregar Nueva Tarea</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre de la tarea"
                  value={newTaskData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Descripción de la tarea"
                  value={newTaskData.description}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="date"
                  placeholder="Fecha de la tarea"
                  value={newTaskData.date}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="status"
                  placeholder="Estado de la tarea"
                  value={newTaskData.status}
                  onChange={handleInputChange}
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleAddTask}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

export default Home;