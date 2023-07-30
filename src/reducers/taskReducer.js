import { ADD_TASK, DELETE_TASK, EDIT_TASK, CHANGE_STATUS, ADD_TASK_CATEGORY, DELETE_TASK_CATEGORY, CLEAR_SELECTED_CATEGORIES} from "../actions/actions";

const initialState = {
    tasks: [],
    categories: ['Trabajo', 'Estudios', 'Hogar', 'Ocio'],
    selectedCategories: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task, index) => index === action.payload.index? action.payload.task : task)
            }
        case CHANGE_STATUS:
            return {
                ...state,
                tasks: state.tasks.map((task, index) => index === action.payload.index? {...task, status: action.payload.status} : task)
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task, index) => index !== action.payload)
            }
        case ADD_TASK_CATEGORY:
            return {
                ...state,
                selectedCategories: [...state.selectedCategories, action.payload]
            }
        case DELETE_TASK_CATEGORY:
            return {
                ...state,
                selectedCategories: state.selectedCategories.filter((category, index) => index !== action.payload)
            }
        case CLEAR_SELECTED_CATEGORIES:
            return {
                ...state,
                selectedCategories: []
            }
        default:    
            return state;
    }
}

export default taskReducer;