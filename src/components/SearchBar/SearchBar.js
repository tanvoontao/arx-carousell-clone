'use client'
import { BiSearchAlt as SearchIcon } from "react-icons/bi"
import useSearch from '@/hooks/useSearch';


const SearchBar = () => {
    const { inputProps, handleSearch } = useSearch();

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
        }} className="flex flex-row items-center" >
            <input
                {...inputProps}
                type="text" placeholder="Enter to search category"
                className="border-blue1 border-2 rounded p-3 bg-transparent"
            />
            <button title="search" type="submit"
                className="bg-yellow1 rounded-r p-4 text-xl text-blue1 hover:bg-black2" >
                <SearchIcon />
            </button>
        </form >
    )
}

export default SearchBar