import React from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { signUp } from '@/services/operations/authApi'


function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { toast } = useToast();
    const { login, signupData } = useSelector((state) => state.auth);

    const form = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            dispatch(signUp(data, navigate))
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
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your full name"
                                        value={signupData?.fullname}
                                        {...form.register("fullname", {
                                            required: "Full Name is required",
                                            validate: (value) => {
                                                if (!validator.isLength(value, { min: 3, max: 20 })) {
                                                    return "Full Name must be between 3 and 20 characters";
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.fullname?.message}
                                </FormMessage>
                            </FormItem>
                        </div>
                        <div className="">
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your username"
                                        value={signupData?.username}
                                        {...form.register("username", {
                                            required: "Username is required",
                                            validate: (value) => {
                                                if (!validator.isLength(value, { min: 3, max: 20 })) {
                                                    return "Username must be between 3 and 20 characters";
                                                }
                                                if (!validator.isAlphanumeric(value)) {
                                                    return "Username must contain only letters and numbers";
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.username?.message}
                                </FormMessage>
                            </FormItem>
                        </div>
                        <div className="">
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        value={signupData?.email}
                                        {...form.register("email", {
                                            required: "Email is required",
                                            validate: (value) => {
                                                if (!validator.isEmail(value)) {
                                                    return "Email must be valid";
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.email?.message}
                                </FormMessage>
                            </FormItem>
                        </div>
                        <div className="">
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your password"
                                        value={signupData?.password}
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
                        <div className="">
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your confirm Password"
                                        value={signupData?.confirmPassword}
                                        type="password"
                                        {...form.register("confirmPassword", {
                                            required: "Confirm Password is required",
                                            validate: (value) => {
                                                if (value !== form.watch("password")) {
                                                    return "Passwords do not match";
                                                }
                                                return true;
                                            },
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.confirmPassword?.message}
                                </FormMessage>
                            </FormItem>
                        </div>
                        <Button type="submit">signup</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Register