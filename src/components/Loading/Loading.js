import Image from 'next/image';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <Image src="/images/loading.png" alt="Loading image" width={300} height={300} priority />
                <p className="text-gray-500 text-lg mt-4">Loading...</p>
            </div>
        </div>
    )
}

export default Loading