import DarkModeBtn from '@/components/Button/DarkModeBtn'
import NavBar from '@/components/NavBar/NavBar'


const UserLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            <DarkModeBtn />
            {children}
            <p>Im a footer yoo</p>
        </>
    )
}

export default UserLayout