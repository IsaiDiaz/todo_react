import React from "react";
import styles from "./Task.module.css";
import PropTypes from 'prop-types';

class Task extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.task}>
                <h2 className={styles.task_name}>{this.props.name}</h2>
                <p className={styles.task_content_text}><strong>Descripción: </strong>{this.props.description}</p>
                <p className={styles.task_content_text}><strong>Fecha: </strong>{this.props.date}</p>
                <p className={styles.task_content_text}><strong>Estado: </strong>{this.props.status}</p>
                <p className={styles.task_content_text}><strong>Categorias: </strong>{this.props.categories.map( (category) => <i>{category} </i>)}</p>
                <div className={styles.buttons_container}>
                <button className={styles.task_button} onClick={this.props.handleDelete}>Eliminar</button>
                <button className={styles.task_button} onClick={this.props.handleEdit}>Editar</button>
                <button className={styles.task_button} onClick={this.props.handleComplete}>Completar</button>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default Task;