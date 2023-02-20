import AdminAuthProvider from "@/components/Providers/AdminAuthProvider"
import SideBar from '@/components/SideBar/SideBar';
import logo from "/public/images/logo.png"

import useToggle from '@/hooks/useToggle';

import { SideBarProvider } from "../SideBar/SideBarContext";


const AdminLayout = ({ children }) => {
    const { status: expand, toggleStatus: toggleExpand } = useToggle(false)

    const value = {
        expand,
        toggleExpand
    };

    return (
        <AdminAuthProvider>
            <div className="w-full flex h-full">
                <SideBarProvider value={value}>
                    <SideBar brand="Carousell" logo={logo} toggleExpand={toggleExpand} />
                    <div className={`w-full ${expand ? "ml-72" : "ml-16"}`}>
                        {children}
                    </div>
                </SideBarProvider>
            </div>
        </AdminAuthProvider>
    )
}



export default AdminLayout