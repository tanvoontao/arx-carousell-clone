'use client'
import { useState } from "react";

const useToggle = (initialValue = true) => {
    const [status, setStatus] = useState(initialValue);
    const toggleStatus = () => setStatus((prevStatus) => !prevStatus);

    return { status, toggleStatus };
};
export default useToggle