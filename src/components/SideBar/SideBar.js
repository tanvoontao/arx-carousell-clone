import styles from './SideBar.module.css';

// REACT ICONS
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineDashboard as DashboardIcon } from "react-icons/md";
import {
    RiProductHuntFill as ProductIcon,
    RiFileUserFill as UserIcon,
    RiUser3Fill as NormalUserIcon,
    RiAdminFill as AdminIcon,
    RiStore2Fill as SellerIcon
} from "react-icons/ri";
import { MdCategory as CategoryIcon } from "react-icons/md";
import { AiOutlineDown as DropDownIcon } from "react-icons/ai";

import { useContext } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SideBarContext } from "../SideBar/SideBarContext";


// REACT CUSTOM HOOKS
import useToggle from '@/hooks/useToggle';


const SideBar = (props) => {
    const { brand, logo } = props
    const { expand, toggleExpand } = useContext(SideBarContext);

    const menus = [
        {
            id: "dashboard",
            name: "Dashboard",
            url: "/admin/dashboard",
            icon: DashboardIcon
        },
        {
            id: "products",
            name: "Products",
            url: "/admin/dashboard/products",
            icon: ProductIcon
        },
        {
            id: "categories",
            name: "Categories",
            url: "/admin/dashboard/categories",
            icon: CategoryIcon
        },
        {
            id: "users",
            name: "Users",
            icon: UserIcon,
            "sublinks": [
                {
                    id: "normal-users",
                    name: "Normal Users",
                    url: "/admin/dashboard/users",
                    icon: NormalUserIcon
                },
                {
                    id: "admin",
                    name: "Admin",
                    url: "/admin/dashboard/admin",
                    icon: AdminIcon
                },
                {
                    id: "seller",
                    name: "Sellers",
                    url: "/admin/dashboard/sellers",
                    icon: SellerIcon
                }
            ]
        }
    ]


    return (
        // <Provider value={value}>
        <nav className={`${expand ? "w-72" : "w-16"} bg-blue1 p-3 h-full z-50 fixed`}>

            <SideBarHeader brand={brand} logo={logo} />

            <div className={styles.menuBar}>
                <div className="mt-10">

                    {menus?.map((menu, i) => (

                        !(menu.sublinks)
                            ? (<SideBarLink key={menu.id} href={menu.url} icon={menu.icon}>{menu.name}</SideBarLink>) // all links
                            : (<SideBarDropdown key={menu.id} title={menu.name} icon={menu.icon} items={menu.sublinks} />) // dropdowns
                    ))}

                </div>
            </div>

        </nav>
        // </Provider>
    )
}

const SideBarHeader = (props) => {
    const { brand, logo } = props
    const { expand, toggleExpand } = useContext(SideBarContext);

    const titleStyle = `${expand ? "opacity-100" : "opacity-0"} font-black text-3xl ml-2 text-gray1 `
    const imgWrapperStyle = "flex items-center justify-center min-w-fit rounded"

    return (
        <header className="relative">
            <div className="flex items-center">
                <span className={imgWrapperStyle}>
                    <Image
                        src={logo}
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded"
                    />
                </span>

                <p className={titleStyle}> {brand} </p>
            </div>

            <AiOutlineRight
                className={`${styles.toggle} text-blue1 bg-yellow1 `}
                style={expand && { transform: 'translateY(-50%) rotate(0deg)' }}
                onClick={toggleExpand} />
        </header>
    )
}

const SideBarLink = (props) => {
    const { href, icon, children } = props
    const { expand } = useContext(SideBarContext);

    const linkStyle = "group flex items-center p-3 mt-1 rounded hover:bg-gradient-to-r  hover:from-yellow1 hover:to-blue1"
    const pStyle = `font-medium text-gray1 ml-2 text-lg ${expand ? "opacity-100" : "opacity-0"}`

    return (
        <Link href={href} className={linkStyle}>
            <div className='min-w-fit'>
                {React.createElement(icon, { size: "15", className: "text-gray1" })}
            </div>
            <p className={pStyle}> {children} </p>
        </Link>
    )
}

const SideBarDropdown = (props) => {
    const { title, icon, items } = props
    const { expand } = useContext(SideBarContext);
    const { status: open, toggleStatus: toggleDropdown } = useToggle(false)

    const linkStyle = `group flex flex-row items-center p-2 hover:bg-gradient-to-r  hover:from-blue1 hover:to-yellow1 rounded-md  `
    const linkPStyle = `ml-4 text-sm font-medium text-gray1 group-hover:text-white1`
    const linkWrapperStyle = `pl-12 mt-2 flex flex-col justify-center gap-y-1 ${!expand && "hidden"} ${!open && "hidden"}`

    return (
        <div>
            <div className='flex items-center p-3 mt-1 hover:bg-red1 rounded-md relative '>
                <a
                    className={`${!expand && "justify-center "} group flex flex-row items-center  `}
                >
                    <div>
                        {React.createElement(icon, { size: "15", className: "text-gray1" })}
                    </div>

                    <h2 className={`font-medium text-gray1 ml-2 text-lg ${!expand && "opacity-0"}`} >
                        {title}
                    </h2>
                </a>
                <DropDownIcon
                    // key={name + "-icon"}
                    size={20}
                    className={`cursor-pointer flex-end absolute right-2 text-gray1 ${!expand && "opacity-0"}`}
                    style={open && { transform: 'rotate(180deg)' }}
                    onClick={toggleDropdown}
                />
            </div>

            <ul className={linkWrapperStyle} >

                {items.map((sublink, i) => (
                    <li
                        key={sublink.id}
                        data-aos="fade-right">
                        <Link href={sublink.url} className={linkStyle} >
                            <div> {React.createElement(sublink.icon, { size: "20", className: "text-gray1" })} </div>
                            <h2 className={linkPStyle} > {sublink.name} </h2>
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    )
}



export default SideBar;