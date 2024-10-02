import CardGroup from '@/components/common/CardGroup';
import Navbar from '@/components/common/Navbar'
import { getUserAllTask } from '@/services/operations/taskApi';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



function Home() {

    const [data, setData] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { task } = useSelector((state) => state.task);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                dispatch(getUserAllTask(token));
            } catch (error) {
                console.log("GET ASSIGNED TASK ERROR ", error);
            }
        };

        fetchTasks();
    }, [dispatch, token]);

    useEffect(() => {
        const assignedTask = task?.allAssignedTask;
        setData(assignedTask || []);
    }, [task]);

    return (
        <>
            <Navbar />
            <div className="w-11/12 mx-auto">
                <div className=" mt-8">
                    {
                        data && (
                            <CardGroup style={"max-w-fit"} data={data} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Home