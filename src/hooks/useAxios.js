import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const useAxios = (config) => {
    const { axios, method, url, requestConfig = {} } = config;
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);

    const [user] = useAuthState(auth);
    const [token, setToken] = useState(null);

    const refetch = () => setReload(prev => prev + 1);


    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setError(null);


            try {
                if (token) {
                    requestConfig.headers.Authorization = `Bearer ${token}`;
                }

                const res = await axios.request({
                    url,
                    method: method.toLowerCase(),
                    ...requestConfig,
                    signal: controller.signal
                });


                setResponse(res.data);
            } catch (error) {
                if (error.code != "ERR_CANCELED") {
                    setError(error);
                }
                // console.log(error);

            } finally {
                setLoading(false);
            }
        }


        fetchData();

        return () => controller.abort();
    }, [reload, token])

    useEffect(() => {
        if (user) {
            user.getIdToken().then(setToken);
        }
    }, [user]);

    return [response, error, loading, refetch];
}

export default useAxios


/*
How to use it:
joke --> response

const [joke, error, loading, refetch] = useAxios({
    axios: axios,
    method: 'GET',
    url: '/',
    requestConfig: {
        headers: {
            'Content-Language': 'en-US', --> can add on
            'Accept': 'text/html' --> can be overridden
            'Authorization': `Bearer ${token}`
        }
    }
});



*/