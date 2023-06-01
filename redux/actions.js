// This is a constant that represents the type of action for setting a list of tasks
export const SET_TASKS = 'SET_TASKS';
// This is a constant that represents the type of action for setting the ID of a single task
export const SET_TASK_ID = 'SET_TASK_ID';

// This is an action creator that takes a list of tasks as an argument and returns a function that dispatches an action
// with the type SET_TASKS and the tasks as the payload
export const setTasks = tasks => dispatch => {
    dispatch({
        type: SET_TASKS,
        payload: tasks, 
    })
};

// This is an action creator that takes the ID of a single task as an argument and returns a function that dispatches an action
// with the type SET_TASK_ID and the task ID as the payload
export const setTaskID = taskID => dispatch => {
    dispatch({
        type: SET_TASK_ID,
        payload: taskID, 
    })
};