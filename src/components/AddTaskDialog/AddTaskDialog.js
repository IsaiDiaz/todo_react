import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, addTaskCategory, deleteTaskCategory, clearSelectedCategories } from "../../actions/actions";
import styles from "./AddTaskDialog.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

const AddTaskDialog = ({ open, handleClose, categories }) => {
    const selectedCategories = useSelector((state) => state.tasks.selectedCategories);
    const dispatch = useDispatch();
    const [newTaskData, setNewTaskData] = useState({
        name: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        status: "",
        categories: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTaskData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddTask = () => {
        newTaskData.categories = selectedCategories;
        dispatch(addTask(newTaskData));
        dispatch(clearSelectedCategories());
        setNewTaskData({
            name: "",
            description: "",
            date: new Date().toISOString().slice(0, 10),
            status: "",
            categories: []
        });
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className={styles.dialogTitle}>Agregar Nueva Tarea</DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <DialogContentText>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            type="text"
                            name="name"
                            label="Nombre de la tarea"
                            value={newTaskData.name}
                            onChange={handleInputChange}
                            InputProps={{
                                className: styles.textfield, // Aplicamos la clase de estilo aquí
                                style: { "& .MuiOutlinedInput-notchedOutline": { borderColor: "yellow" } }, // Cambiamos el color del borde cuando está en :focus
                            }}
                        />
                        <TextField
                            fullWidth
                            type="text"
                            name="description"
                            label="Descripción de la tarea"
                            value={newTaskData.description}
                            onChange={handleInputChange}
                            className={styles.textfield}
                        />
                        <TextField
                            fullWidth
                            label="Fecha límite de la tarea"
                            type="date"
                            name="date"
                            value={newTaskData.date}
                            onChange={handleInputChange}
                            className={styles.textfield}
                        />
                        <TextField
                            fullWidth
                            type="text"
                            name="status"
                            label="Estado de la tarea"
                            value={newTaskData.status}
                            onChange={handleInputChange}
                            className={styles.textfield}
                        />
                        <Select
                            fullWidth
                            label="Categoría de la tarea"
                            name="category"
                            className={styles.textfield}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    <p onClick={() => dispatch(addTaskCategory(category))}>{category}</p>
                                </MenuItem>
                            ))}
                        </Select>
                        {/*Show selected categories*/}
                        {selectedCategories.map((category, index) => (
                            <div key={category}>
                                <p>{category}</p>
                                <button onClick={() => dispatch(deleteTaskCategory(index))}>Eliminar</button>
                            </div>
                        ))}
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions className={styles.dialogActions}>
                <Button onClick={handleClose} className={styles.cancelButton} variant="outlined" >Cancelar</Button>
                <Button onClick={handleAddTask} className={styles.addButton} variant="contained" autoFocus >Agregar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTaskDialog;