import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const useAxiosFunc = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState();

    const [user] = useAuthState(auth);
    const [token, setToken] = useState(null);

    const axiosFetch = async (configObj) => {
        setError(null);
        const {
            axios,
            method,
            url,
            requestConfig = {}
        } = configObj;

        if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);


            const config = {
                url,
                method: method.toLowerCase(),
                ...requestConfig,
                signal: ctrl.signal
            }

            const res = await axios.request(config);

            setResponse(res.data);
            // return Promise.resolve(res.data);

        } catch (error) {
            console.log(error);
            setError(error);
            // return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            user.getIdToken().then((token) => setToken(token));
        } else {
            setToken(null);
        }
    }, [user]);

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return [response, error, loading, axiosFetch];
}

export default useAxiosFunc


/*
How to use it:

import axios from "@/config/apis"
import useAxios from "@/hooks/useAxios";
import useAxiosFunc from "@/hooks/useAxiosFunc";

const [posts, error, loading, axiosFetch] = useAxiosFunc();

// GET REQUEST
const getData = () => {
    axiosFetch({
        axios: axios,
        method: 'get',
        url: '/posts'
    });
}

useEffect(() => {
    getData();
    // eslint-disable-next-line 
}, [])       

// POST / PATCH / DELETE REQUEST
const handleSubmit = () => {
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


// 4 important conditions

{loading && <p>Loading...</p>}

{!loading && error && <p className="errMsg">{error}</p>}

{!loading && !error && joke && <p>{joke?.joke}</p>}

{!loading && !error && !joke && <p>No dad joke to display</p>}

*/