import AdminLayout from "@/components/Layout/AdminLayout"
import Header from "@/components/Header/Header"
import CategoryLayout from "@/components/Layout/CategoryLayout";
import CategoryForm from "@/components/Form/CategoryForm";


export default function CreateCategoryPage() {


    return (
        <AdminLayout>
            <Header title={"Create the Categories"} />
            <hr className="mx-5" />

            <CategoryLayout>
                <CategoryForm />

            </CategoryLayout>

        </AdminLayout>
    )
}
