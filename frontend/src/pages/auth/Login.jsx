import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import validator from 'validator'
import { login } from '@/services/operations/authApi';
import { useToast } from '@/hooks/use-toast';


function Login() {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            dispatch(login(data, navigate))
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-11/12 mx-auto lg:w-[30%] p-4 border rounded-md bg-white shadow-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="">
                            <FormItem>
                                <FormLabel>Username/Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your username/Email"
                                        {...form.register("identifier", {
                                            required: "Username/Email is required",
                                            validate: (value) => {
                                                if (validator.isEmail(value)) {
                                                    return true;
                                                }
                                                if (validator.isAlphanumeric(value)) {
                                                    return true;
                                                }
                                                return "Username must contain only letters and numbers";
                                            },
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.identifier?.message}
                                </FormMessage>
                            </FormItem>
                        </div>
                        <div className="">
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your password"
                                        type="password"
                                        {...form.register("password", {
                                            required: "Password is required",
                                            validate: (value) => {
                                                if (!validator.isLength(value, { min: 6 })) {
                                                    return "Password must be of length 6.";
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.password?.message}
                                </FormMessage>
                            </FormItem>
                        </div>
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login