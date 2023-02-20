import { useRouter } from 'next/router'

import AdminLayout from "@/components/Layout/AdminLayout"
import Header from "@/components/Header/Header"
import CategoryLayout from "@/components/Layout/CategoryLayout";

import axios from "@/config/apis"
import useAxios from "@/hooks/useAxios";
import { useEffect } from 'react';
import CategoryForm from '@/components/Form/CategoryForm';


export default function CategoryPage() {
    const router = useRouter()
    const { slug } = router.query
    const [category, error, loading, refetch] = useAxios({
        axios: axios,
        method: 'GET',
        url: `/categories/${slug}`,
        requestConfig: {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    });

    useEffect(() => {
        refetch()
    }, [slug])

    console.log(category)




    return (
        <AdminLayout>
            <Header title={"Manage the Categories"} />
            <hr className="mx-5" />

            <CategoryLayout>
                {loading && <h2>🌀 Loading...</h2>}
                {!loading && error && <p className="text-red-500">{error.message}</p>}

                {category.length != 0 && <CategoryForm data={category} />}

            </CategoryLayout>

        </AdminLayout>
    )
}
