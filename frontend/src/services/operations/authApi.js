import { setSignupData } from "@/slices/authSlice";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "@/slices/authSlice";
import apiConnector from "../apiConnector";
import { toast } from "@/hooks/use-toast";
import { setUser } from "@/slices/userSlice";

const { REGISTER, LOGIN, LOGOUT } = authEndpoints;

export function signUp(signUpData, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", REGISTER, signUpData);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const signupData = response.data.newUser;
            dispatch(setSignupData(signupData));  // Dispatching the signupData

            navigate("/login");
            toast({
                title: "Welcome!",
                description: "Registration successful",
            });
        } catch (error) {
            console.log("SIGN_UP API ERROR: ", error.message);
            toast({
                title: "Registration Failed",
                description: error.message,
                variant: "destructive",  // Corrected the variant for error
            });
        }
        dispatch(setLoading(false));
    };
}

export function login(loginData, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN, loginData);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            await dispatch(setUser(response.data.data.user));
            await dispatch(setToken(response.data.data.token));

            navigate("/");
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
        } catch (error) {
            console.log("LOGIN API ERROR: ", error.message);
            toast({
                title: "Login Failed",
                description: error.message,
                variant: "destructive",
            });
        }
        dispatch(setLoading(false));
    };
}

export function logout(token) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGOUT, {}, {
                Authorization: `Bearer ${token}`
            })
            if (!response) {
                throw new Error(response.data.message)
            }
            console.log(response);
            dispatch(setToken(null));
            dispatch(setUser(null));
            toast({
                title: "logout successful"
            })
        } catch (error) {
            console.log("LOGOUT API ERROR: ", error.message)
            toast({
                title: "error in logout",
                variant: "destructive"
            })
        }
        dispatch(setLoading(false));
    }
}
