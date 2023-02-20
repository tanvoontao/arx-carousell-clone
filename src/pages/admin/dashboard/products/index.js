import AdminLayout from "@/components/Layout/AdminLayout"
import Header from "@/components/Header/Header"
import axios from "@/config/apis"
import useAxiosFunc from "@/hooks/useAxiosFunc";
import { setModal } from "@/redux/modal/action";
import MaterialTable from "@material-table/core";
import { setAlert } from "@/redux/alert/action";
import { useEffect, useRef } from 'react';
import { Avatar } from "@mui/material";
import getErrorMsg from "@/helper/getErrorMsg";


export default function ProductsPage() {
    const [product, error, loading, axiosFetch] = useAxiosFunc();
    const tableRef = useRef();




    const columns = [
        { title: "id", field: "id", hidden: true },
        { title: "Product Image", render: (rowData) => <Avatar size={40} alt={rowData.name} src={rowData.images[0]} /> },
        { title: "Name", field: "name", align: "left" },
        { title: "Category", field: "category", align: "left" },
        { title: "Condition", field: "condition", align: "left" },
        { title: "Price", field: "price", type: "currency", currencySetting: { currencyCode: "MYR", minimumFractionDigits: 2 } },
        {
            title: "Actions",
            render: (rowData) => {
                return (
                    <>
                        <button
                            className="rounded-full w-10 h-10 hover:bg-gray-500 focus:outline-none focus:shadow-outline active:bg-gray-400"
                            onClick={() => openEditModal(rowData)}
                        >
                            <span >🖊️</span>
                        </button>
                        <button
                            className="rounded-full w-10 h-10 hover:bg-gray-500 focus:outline-none focus:shadow-outline active:bg-gray-400"
                            onClick={() => alertDelete(rowData)}
                        >
                            <span >🗑️</span>
                        </button>
                    </>
                );
            },
        },
    ]


    const openAddModal = () => {
        setModal({ type: 'ProductForm', data: null });
    }

    const openEditModal = (product) => {
        setModal({ type: 'ProductForm', data: product });
    }

    const alertDelete = async (product) => {

        const isConfirm = confirm(`Are you sure you want to delete [${product.name}] ?`);

        if (isConfirm) {
            await axiosFetch({
                axios: axios,
                method: 'DELETE',
                url: `/products/${product._id}`,
                requestConfig: {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            });
        }
    }

    useEffect(() => {
        if (!loading && !error && product) {
            setAlert({ show: true, message: `You have just deleted the product [ ${product.name} ]. Please click the refresh data button. `, severity: "info" })
        }
        else if (!loading && error) {
            setAlert({ show: true, message: getErrorMsg(error), severity: "error" })
        }
    }, [loading, error, product])

    return (
        <AdminLayout>
            <Header title={"Admin Dashboard Page"} />
            <hr className="mx-5" />

            <main className="container mx-auto p-5">
                <div data-aos="fade-right">

                    {/* Material Table */}
                    <MaterialTable
                        title="Product list from API"
                        columns={columns}
                        tableRef={tableRef}
                        // http://localhost:3001/api/v1/products/table
                        data={query =>
                            new Promise((resolve, reject) => {
                                let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/table?`
                                url += 'limit=' + query.pageSize
                                url += '&page=' + (query.page + 1)
                                if (query.search) {
                                    url += `&search=${query.search}`;
                                }
                                fetch(url)
                                    .then(response => response.json())
                                    .then(result => {
                                        resolve({
                                            data: result.data,
                                            page: result.page - 1,
                                            totalCount: result.total,
                                        })
                                    })
                                    .catch((error) => {
                                        reject(error);
                                    });
                            })
                        }
                        actions={[
                            {
                                icon: () => <p>➕</p>,
                                tooltip: "Add Product",
                                onClick: openAddModal,
                                isFreeAction: true
                            },
                            {
                                icon: () => <p>🔄</p>,
                                tooltip: 'Refresh Data',
                                isFreeAction: true,
                                onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                            }
                        ]}
                        localization={{ toolbar: { searchPlaceholder: 'Search by Name.. ' } }}
                        options={{
                            search: true,
                            paging: true, pageSizeOptions: [2, 5, 10, 20], pageSize: 2,
                            paginationType: "stepped", showFirstLastPageButtons: true,
                            paginationPosition: "bottom",
                        }}
                    />
                </div>
            </main>

        </AdminLayout>
    )
}

