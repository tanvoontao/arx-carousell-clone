'use client'
import { useSelector } from "react-redux";
import Alert from "@/components/Alert/Alert";
import Modal from '@/components/Modal/FormModal';


const Layout = ({ children }) => {
    const state = useSelector((state) => state.alert);

    // container mx-auto position-relative dark:bg-red-500
    return (
        // bg-blue-600
        <div className="w-full dark:bg-gray-700 position-relative ">
            {/* <div className="container mx-auto position-relative "> */}
                {children}
                {
                    state.show && (
                        <Alert
                            severity={state.severity}
                            style={{
                                position: "fixed",
                                right: 0,
                                bottom: 0
                            }}
                            className="min-w-fit m-3"
                        >
                            {state.message}
                        </Alert>
                    )
                }
                <Modal />
            {/* </div > */}
        </div >
    );
};



export default Layout