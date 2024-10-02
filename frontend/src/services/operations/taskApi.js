import { setLoading, setTask } from "@/slices/taskSlice";
import apiConnector from "../apiConnector";
import { taskEndpoints } from "../apis";
import { toast } from "@/hooks/use-toast";

const {
    USER_ALL_TASK,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK
} = taskEndpoints;

export function getUserAllTask(token) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", USER_ALL_TASK, {}, {
                Authorization: `Bearer ${token}`
            })
            if (!response) {
                throw new Error(response.data.message)
            }
            // console.log(response);
            dispatch(setTask(response.data.data))
        } catch (error) {
            console.log("GET USER ALL TASK API ERROR: ", error.message)
            toast({
                title: "Error in fetching task",
                variant: "destructive"
            })
        }
        dispatch(setLoading(false));
    }
}

export function createTask(token, data) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", CREATE_TASK, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response) {
                throw new Error(response.data.message)
            }

            toast({
                title: "task created Succesfully"
            })

        } catch (error) {
            console.log("CREATE TASK API ERROR: ", error)
            toast({
                title: "Error in creating task",
                variant: "destructive"
            })
        }
        dispatch(setLoading(false));
    }
}

export function updateTask(token, data) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("PUT", UPDATE_TASK, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response) {
                throw new Error(response.data.message)
            }
            // console.log(response)

            toast({
                title: "task Updated Succesfully"
            })

        } catch (error) {
            console.log("UPDATE TASK API ERROR: ", error)
            toast({
                title: "Error in updating task",
                variant: "destructive"
            })
        }
        dispatch(setLoading(false));
    }
}

export function deleteTask(token, data) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE", DELETE_TASK, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response) {
                throw new Error(response.data.message)
            }
            // console.log(response)

            toast({
                title: "task Deleted Succesfully"
            })

        } catch (error) {
            console.log("DELETED TASK API ERROR: ", error)
            toast({
                title: "Error in Deleting task",
                variant: "destructive"
            })
        }
        dispatch(setLoading(false));
    }
}