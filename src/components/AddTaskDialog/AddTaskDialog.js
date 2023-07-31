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
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const AddTaskDialog = ({ open, handleClose, categories }) => {
    const selectedCategories = useSelector((state) => Array.from(state.tasks.selectedCategories));
    const dispatch = useDispatch();
    const [newTaskData, setNewTaskData] = useState({
        name: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        status: "Pendiente",
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
            status: "Pendiente",
            categories: []
        });
        handleClose();
    };

    const handleCategoryChange = (category) => {
        dispatch(addTaskCategory(category));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setNewTaskData((prevData) => ({
            ...prevData,
            [name]: checked,
            status: checked ? "Completado" : "Pendiente", // Establecer el valor del estado basado en el estado del checkbox
        }));
    };

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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="completed"
                                    checked={newTaskData.completed}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                />
                            }
                            label="Completado"
                        />
                        <Select
                            fullWidth
                            label="Categoría de la tarea"
                            name="category"
                            value={<MenuItem value="" disabled selected>
                                Seleccione una o más categorías
                            </MenuItem>}
                            className={styles.textfield}
                        >
                            <MenuItem value="" disabled selected>
                                Seleccione una o más categorías
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category} style={
                                    { cursor: "default" }
                                }>
                                    <div className={styles.options_container}>
                                        <span>{category}</span>
                                        <button className={styles.inline_button} onClick={() => handleCategoryChange(category)}>+</button>
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                        {/*Show selected categories*/}
                        <div className={styles.categories_container}>
                            {selectedCategories.map((category, index) => (
                                <div key={category} className={styles.selected_categories}>
                                    <p>{category}</p>
                                    <button className={styles.inline_button} onClick={() => dispatch(deleteTaskCategory(category))}>-</button>
                                </div>
                            ))}
                        </div>
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