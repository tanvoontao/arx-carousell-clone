// import { useRouter } from 'next/navigation'
import { useRouter } from 'next/router'
import AdminLayout from "@/components/Layout/AdminLayout"
import Header from "@/components/Header/Header"
import CategoryLayout from "@/components/Layout/CategoryLayout";

import axios from "@/config/apis"
import useAxios from "@/hooks/useAxios";
import { useEffect } from 'react';
import Action from '@/components/Action/Action';

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




    return (
        <AdminLayout>
            <Header title={"Manage the Categories"} />
            <hr className="mx-5" />

            <CategoryLayout>
                {loading && <h2>🌀 Loading...</h2>}
                {!loading && error && <p className="text-red-500">{error.message}</p>}

                <div className="px-2 h-full">

                    <div className="bg-blue1 w-full flex flex-row rounded p-3 gap-2 h-full">
                        <div className="w-64 h-full">
                            <img
                                src={category.images}
                                alt={"pimg"} className="object-cover rounded h-full w-auto bg-black2 max-h-64" />
                        </div>


                        <div className="w-full">
                            <div className="flex flex-row items-start justify-between">
                                <div>
                                    <h1 className='text-2xl font-black text-gray1'>{category.name}</h1>
                                    <span className='text-gray1 font-extralight opacity-50'>{category.slug}</span>
                                </div>

                                <Action slug={category.slug} id={category._id} />

                            </div>


                            <p className='mt-5 text-xl font-black text-gray1'>Description: </p>
                            <p className="text-gray1">
                                {category.description}
                            </p>
                        </div>
                    </div>



                </div>
            </CategoryLayout>

        </AdminLayout>
    )
}
