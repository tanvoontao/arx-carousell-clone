// import Form2 from "@/components/Input/Form2"
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from 'next/navigation'
import validate from "@/validators/login.validator";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    TextField, Button
} from '@mui/material';
import axios from "@/config/apis"
import useAxiosFunc from "@/hooks/useAxiosFunc";
import { useEffect } from "react";

export default function LoginPage() {
    const provider = new GoogleAuthProvider()
    const router = useRouter();
    const type = "login"
    const [user, error, loading, axiosFetch] = useAxiosFunc();


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validate)
    });

    const signinwithEmailPw = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            await doubleCheckWifDB(result)
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email');
                    break;
                default:
                    alert(error);
            }
        }
    }

    const doubleCheckWifDB = async (result) => {
        const token = await result.user.getIdToken()

        await axiosFetch({
            axios: axios,
            method: 'POST',
            url: '/users/getProfile',
            requestConfig: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    uid: result.user.uid,
                    email: result.user.email,
                    name: result.user.displayName,
                    role: "admin"
                }
            }
        })
    }

    const signin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            await doubleCheckWifDB(result)
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (formValues) => {
        await signinwithEmailPw(formValues.email, formValues.password)
    }

    useEffect(() => {
        if (!loading && !error && user) {
            console.log(user)
            if (user.uid && user.role == "admin") {
                router.push(`/admin/dashboard/products`)
            }
        }

        // if (loading) {
        //     console.log("Im loading...")
        // }
        // else if (!loading && error) {
        //     console.log(error)
        // }
        // else if (!loading && !error && user) {
        //     console.log(user)
        //     if (user.uid && user.role == "admin") {
        //         router.push(`/admin/dashboard/products`)
        //     }
        // }
        // else if (!loading && !error && !user) {
        //     console.log("Why I dont see anything")
        // }
    }, [loading, error, user])

    return (
        <div className="w-full flex justify-center items-center">

            <div className="w-2/3">

                {/* error from api */}
                {error &&
                    (error.code == "ERR_NETWORK"
                        ?
                        (
                            <p className="text-red-500">
                                🚧 Alert: Something went wrong with our network connection. Please try again later
                            </p>
                        )
                        :
                        (
                            <p className="text-red-500">
                                🚧 Alert: <br />
                                {(error.response.data.message).split('.').map((e) => (
                                    <span key={e}>
                                        {e} < br />
                                    </span>
                                ))}
                            </p>
                        )
                    )

                }

                {/* response success */}
                {
                    user && user.uid && user.role == "admin" && !error && (<p className="text-green-500">Login successfully. Redirecting you to the home page. </p>)
                }
                {
                    user && user.uid && user.role == "user" && !error && (<p className="text-red-500">You do not have access to admin account. </p>)
                }

                <form onSubmit={handleSubmit(data => {
                    onSubmit(data);
                })}>
                    <TextField
                        label="Email"
                        type="email"
                        error={errors?.email && true}
                        helperText={errors?.email?.message || ""}
                        fullWidth
                        sx={{ mt: 2 }}
                        {...register("email")}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        error={errors?.password && true}
                        helperText={errors?.password?.message || ""}
                        fullWidth
                        sx={{ mt: 2 }}
                        autoComplete="current-password"
                        {...register("password")}
                    />

                    <br />
                    <br />


                    <Button type="submit" variant="outlined" fullWidth disabled={loading}>
                        {/* {type == "login" ? '👆 Sign in now' : '👆 Sign up now'} */}
                        {loading ? "⏳......" : (type == "login" ? "👆 Sign in now" : "👆 Sign up now")}
                    </Button>

                </form>


                {/* divider line */}
                <div className="flex flex-row items-center text-center my-4">
                    <hr className="w-full border-gray-300" />
                    <span className="text-gray1 mx-2">or</span>
                    <hr className="w-full border-gray-300" />
                </div>

                {/* google btn */}
                <button className="w-full bg-white p-4 rounded-md shadow-md flex items-center hover:bg-gray-200 hover:shadow-lg focus:outline-none focus:shadow-outline"
                    onClick={type == "login" ? signin : signup}
                    disabled={loading}>
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" className="w-6 h-6" />
                    <span className="ml-2 font-medium text-gray-800">
                        {loading ? "⏳......" : (type == "login" ? "Sign in with Google" : "Sign up with Google")}
                        {/* {type == "login" ? 'Sign in with Google' : 'Sign up with Google'} */}
                    </span>
                </button>
            </div>



        </div>
    )
}

