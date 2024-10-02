import CardGroup from '@/components/common/CardGroup';
import CreateTask from '@/components/common/createTask';
import Navbar from '@/components/common/Navbar'
import { deleteTask, getUserAllTask } from '@/services/operations/taskApi';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Mytask() {

    const [data, setData] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState({});
    const [del, setDel] = useState(false);
    const dispatch = useDispatch();
    const { task } = useSelector((state) => state.task);
    const { token } = useSelector((state) => state.auth);

    function handleEdit(id) {
        const result = data.filter((item) => item._id == id)[0];
        setTaskToEdit(result)
        console.log(taskToEdit)
    }

    function handleDel(id) {
        try {
            const result = data.filter((item) => item._id == id)[0];
            if (result) {
                dispatch(deleteTask(token, { taskId: id }))
            }
            window.location.reload();
        } catch (error) {
            console.log("Delete Task Error ", error.message)
        }
    }

    const fetchTasks = async () => {
        try {
            dispatch(getUserAllTask(token));
        } catch (error) {
            console.log("GET ASSIGNED TASK ERROR ", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [dispatch, token]);

    useEffect(() => {
        const createdTask = task?.allCreatedTask;
        setData(createdTask || []);
    }, [task]);
    return (
        <>
            <Navbar />
            <div className="w-11/12 mx-auto">
                <div className=" mt-8 flex flex-col-reverse lg:flex-row gap-5 relative">
                    <div className="lg:w-1/2">
                        {
                            data && (
                                <CardGroup style={"max-w-fit"} data={data} controls={true} handleEdit={handleEdit} handleDel={handleDel} />
                            )
                        }
                    </div>
                    <div className="lg:w-1/2">
                        <CreateTask prevData={taskToEdit} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mytask