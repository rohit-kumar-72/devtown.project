const BASE_URL = import.meta.env.VITE_BASE_URL;


// auth apis 
export const authEndpoints = {
    REGISTER: BASE_URL + "/auth/register",
    LOGIN: BASE_URL + "/auth/login",
    LOGOUT: BASE_URL + "/auth/logout",
}

// task apis
export const taskEndpoints = {
    CREATE_TASK: BASE_URL + "/task/create-task",
    USER_ALL_TASK: BASE_URL + "/task/user-all-task",
    UPDATE_TASK: BASE_URL + "/task/update-task",
    DELETE_TASK: BASE_URL + "/task/delete-task",
    ALL_TASK: BASE_URL + "/task/all-task",
}