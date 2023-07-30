import { ADD_TASK, DELETE_TASK, EDIT_TASK, CHANGE_STATUS} from "../actions/actions";
const initialState = {
    tasks: [],
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
        default:    
            return state;
    }
}

export default taskReducer;