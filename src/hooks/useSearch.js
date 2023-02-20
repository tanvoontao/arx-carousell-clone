'use client'
import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const useSearch = (searchTerms = "") => {
    const router = useRouter();
    const pathname = usePathname();
    const searchInputRef = useRef(searchTerms);

    const handleChange = (event) => {
        searchInputRef.current = event.currentTarget.value;
    };

    const handleSearch = () => {
        if (!searchInputRef.current) { router.push(`${pathname}`); }
        else { router.push(`${pathname}?search=${searchInputRef.current}`); }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") handleSearch();
    };

    const inputProps = { onChange: handleChange, onKeyDown: handleKeyDown };

    return {
        inputProps,
        handleSearch,
        handleChange,
        handleKeyDown,
    };
};


export default useSearch