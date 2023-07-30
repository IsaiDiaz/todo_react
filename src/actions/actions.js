export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const ADD_TASK_CATEGORY = "ADD_TASK_CATEGORY";
export const DELETE_TASK_CATEGORY = "DELETE_TASK_CATEGORY";
export const CLEAR_SELECTED_CATEGORIES = "CLEAR_SELECTED_CATEGORIES";

export const addTask = (task)=>({
    type: ADD_TASK,
    payload: task,
});

export const deleteTask = (index)=>({
    type: DELETE_TASK,
    payload: index,
});

export const editTask = (index, task)=>({
    type: EDIT_TASK,
    payload: {
        index,
        task
    },
});

export const changeStatus = (index, status)=>({
    type: CHANGE_STATUS,
    payload: {
        index,
        status
    },
});

export const addTaskCategory = (category)=>({
    type: ADD_TASK_CATEGORY,
    payload: category,
});

export const deleteTaskCategory = (index)=>({
    type: DELETE_TASK_CATEGORY,
    payload: index,
});

export const clearSelectedCategories = ()=>({
    type: CLEAR_SELECTED_CATEGORIES,
});

