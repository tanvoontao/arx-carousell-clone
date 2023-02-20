import MUIPagination from '@mui/material/Pagination';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'
import axios from "@/config/apis"
import useAxios from "@/hooks/useAxios";



const Pagination = (props) => {
    const { api } = props
    const [response, error, loading] = useAxios({
        axios: axios,
        method: 'GET',
        url: api,
        requestConfig: {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    });
    const countt = response ? Math.ceil(response.count / 5) : 1;
    const pageNo = (countt > 0) ? countt : 1


    const router = useRouter()
    const pathname = usePathname();


    const handlePageChange = (e, value) => {
        router.push(`${pathname}?page=${value}`)
    };

    if (loading) {
        return <h2>🔍 Loading...</h2>;
    }

    if (error) {
        return <h2>💀 Error: {error.message}</h2>;
    }

    return (
        <div className='w-full flex items-center justify-center py-2'>
            <MUIPagination count={pageNo} variant="outlined" shape="rounded"
                onChange={handlePageChange} />
        </div>
    )
}
export default Pagination