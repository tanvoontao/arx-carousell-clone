import Link from 'next/link'

import axios from "@/config/apis"
import useAxios from "@/hooks/useAxios";
import styles from './categorylist.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';


const CategoryList = () => {

    const [url, setUrl] = useState('/categories');
    const [categories, error, loading, refetch] = useAxios({
        axios: axios,
        method: 'GET',
        url: url,
        requestConfig: {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    });

    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    const search = searchParams.get('search');


    const transform = (data) => {
        let output = [];
        for (let i = 0; i < data.length; i += 2) {
            output.push(data.slice(i, i + 2));
        }
        return output;
    }

    useEffect(() => {
        if (page) {
            setUrl(`/categories?page=${page}`);
        }
        else if (search) {
            setUrl(`/categories?search=${search}`);
        }
        else {
            setUrl(`/categories`);
        }
        refetch();
    }, [search, page]);



    return (
        <>

            <section
                className={`w-full rounded border-dashed border-2 border-yellow1 flex flex-col justify-between ${styles.menuBar}`}
            >
                {loading && <h2>🌀 Loading...</h2>}

                {!loading && error && <p className="text-red-500">Something went wrong</p>}

                {transform(categories).map((row, index) => (
                    <div key={`${index}-container`} className="flex flex-row w-full items-center gap-2 my-1">
                        {row.map((category, i) => (
                            <Link
                                key={category.slug}
                                href={`/admin/dashboard/categories/${category.slug}`}
                                className="group w-full h-44 flex flex-col justify-center items-center text-gray1 bg-blue1 hover:bg-yellow1 p-4 rounded "
                            >

                                <img
                                    src={category.images}
                                    alt="profile"
                                    className="group-hover:bg-gray1 rounded-full bg-gray1 w-14 h-14" />

                                <span className="group-hover:text-black1 text-gray1 text-center ">{category.name}</span>
                            </Link>
                        ))}

                    </div>
                ))}

            </section>
        </>
    )

    return (
        <>
            <div className='overflow-y-auto' style={{ height: 'calc(100vh - 210px)' }}>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
                <p>list</p>
            </div>
        </>
    )
}

export default CategoryList
