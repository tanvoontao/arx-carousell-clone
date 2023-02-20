import { useEffect, useState } from 'react';
import axios from "@/config/apis"
import useAxios from "@/hooks/useAxios";
import Metatags from '@/components/Metatags/Metatags';
import UserLayout from '@/components/Layout/UserLayout';
// axios demo

const ModalTest = () => {

    const [products, error, loading, refetch] = useAxios({
        axios: axios,
        method: 'GET',
        url: '/products/table',
        requestConfig: {

        }
    });

    useEffect(() => {
        if (loading) {
            console.log("Im loading...")
        }
        else if (!loading && error) {
            console.log(error)
        }
        else if (!loading && !error && products) {
            console.log(products)
        }
        else if (!loading && !error && !products) {
            console.log("Why I dont see anything")
        }
    }, [loading, error, products])




    return (

        <UserLayout>

            <Metatags />
            {loading && <p>Loading...</p>}

            {!loading && error && <p className="errMsg">{JSON.stringify(error)}</p>}

            {!loading && !error && products && <p>{JSON.stringify(products)}</p>}

            {!loading && !error && !products && <p>No dad joke to display</p>}
        </UserLayout>
    )
}

export default ModalTest