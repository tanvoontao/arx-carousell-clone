import Link from 'next/link'

const NavBarStyles = {
    ul: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}

const NavBar = () => {

    const links = [
        {
            title: "Home",
            url: "/"
        },
        {
            title: "Modal",
            url: "/modal-test"
        },
        {
            title: "Material Table",
            url: "/mui-table"
        },
        {
            title: "Admin",
            url: "/admin/login"
        },
    ]

    return (
        <nav data-aos="fade-down">
            <ul style={NavBarStyles.ul}>
                {
                    links.map((link) => (
                        <li key={link.url}><Link href={link.url}>{link.title}</Link></li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default NavBar;