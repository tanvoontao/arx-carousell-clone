import { auth } from "@/config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { usePathname } from 'next/navigation';
import Loading from "@/components/Loading/Loading";
import axios from "@/config/apis"
import useAxiosFunc from "@/hooks/useAxiosFunc";


export const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [token, setToken] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const [userFromDB, err, isLoading, axiosFetch] = useAxiosFunc();


    const checkAdmin = async (user) => {
        const token = await user.getIdToken()
        setToken(token);

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
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    role: "admin"
                }
            }
        })
    };

    useEffect(() => {
        if (userFromDB && userFromDB.role !== 'admin') {
            router.push("/admin/login")
        }
        if (!loading && user && !userFromDB) {
            checkAdmin(user)
        }
        if (!loading && !error && !user) {
            router.push("/admin/login")
        }

    }, [error, loading, pathname, userFromDB])

    if ((loading || isLoading) && (!userFromDB || user)) return <Loading />
    if ((!loading && error) || (isLoading && err)) return <p>Something went wrong...</p>

    return <AdminAuthContext.Provider value={{ user, token }}> {children} </AdminAuthContext.Provider>

}

export default AdminAuthProvider
