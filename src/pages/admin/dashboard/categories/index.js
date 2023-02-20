import AdminLayout from "@/components/Layout/AdminLayout"
import Header from "@/components/Header/Header"
import CategoryLayout from "@/components/Layout/CategoryLayout";

export default function CategoriesPage() {

    return (
        <AdminLayout>
            <Header title={"Manage the Categories"} />
            <hr className="mx-5" />

            <CategoryLayout>
                <p>⬅️ Click the category to show the details</p>
            </CategoryLayout>

        </AdminLayout>
    )
}
