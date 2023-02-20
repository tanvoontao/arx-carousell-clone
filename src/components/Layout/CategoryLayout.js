import CategoryList from "../List/CategoryList"
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@mui/material";
import Link from "next/link";

const CategoryLayout = ({ children }) => {
    return (
        <div className="p-5">
            <div className="flex flex-row items-center justify-between py-3">
                <SearchBar />

                <Link href="/admin/dashboard/categories/create">
                    <Button size="large" variant="outlined" >
                        Add Category
                    </Button>
                </Link>
            </div>

            <div className="flex justify-between items-start">
                <div className="w-1/3 p-2">
                    {/* <p>I think I will show pagination</p> */}
                    <Pagination api='/categories/total' />
                    <CategoryList />
                </div>
                <div className="w-2/3 p-2">
                    {children}
                </div>

            </div>


        </div>
    )
}

export default CategoryLayout