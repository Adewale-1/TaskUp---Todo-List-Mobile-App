// Import the SET_TASKS and SET_TASK_ID action types from the actions file
import { SET_TASKS , SET_TASK_ID } from "./actions";

// This is the initial state of the reducer, with an empty list of tasks and the task ID set to 1
const initialState = {
    tasks: [] ,
    taskID: 1,

}


// This is the reducer function that takes in the current state and an action as arguments
// and returns a new state based on the action type and payload
function taskReducer(state = initialState, action) {
   switch(action.type) {
        // If the action type is SET_TASKS, return a new state object with the tasks field set to the payload
    case SET_TASKS:
        return{
            ...state, tasks: action.payload,
        };
        // If the action type is SET_TASK_ID, return a new state object with the taskID field set to the payload
    case SET_TASK_ID:
        return{
            ...state, taskID: action.payload,
        };
        // If the action type is not recognized, return the current state
        default:
            return state;
   } 
}

// Export the reducer function as the default export
export default taskReducer;