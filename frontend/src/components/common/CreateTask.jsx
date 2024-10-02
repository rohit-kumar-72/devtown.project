import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Form } from '../ui/form';
import { createTask, updateTask } from '@/services/operations/taskApi';


const CreateTask = ({ prevData = {} }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    // Initialize useForm with react-hook-form and zod resolver for validation
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        if (prevData) {
            reset(
                {
                    title: prevData?.title,
                    description: prevData?.description,
                    dueDate: prevData?.dueDate?.substring(0, 10)
                }
            ); // This will set all fields to prevData values
            setPriority(prevData?.priority)
        }
    }, [prevData, reset]);

    const onSubmit = async (data) => {
        try {
            console.log(priority)
            if (prevData?._id) {
                console.log(prevData)
                dispatch(updateTask(token, { taskId: prevData._id, updates: { ...data, priority } }))
            } else {
                dispatch(createTask(token, { ...data, priority }));
                console.log("Task created:", data);
            }
            window.location.reload();
        } catch (error) {
            if (prevData?._id) {
                console.error("Error Updating task:", error);
            } else {
                console.error("Error creating task:", error);
            }
        }
    };

    return (
        <Form>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-4 p-4 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4">Create Task</h1>

                {/* Title */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Task title"
                        {...register('title')}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Task description"
                        {...register('description')}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Due Date */}
                <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                        type="date"
                        id="dueDate"
                        {...register('dueDate')}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
                </div>

                {/* Priority */}
                <div>
                    <Label>Priority</Label>
                    <Select
                        value={priority}
                        onValueChange={(value) => setPriority(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full mt-4">
                    {prevData?._id ? "Update Task" : "Create Task"}
                </Button>
            </form>
        </Form>
    );
};

export default CreateTask;
