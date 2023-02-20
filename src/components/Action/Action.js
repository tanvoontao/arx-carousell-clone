"use client"
import Link from "next/link"
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { BsThreeDotsVertical } from "react-icons/bs"
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

import { setAlert } from "@/redux/alert/action";
import axios from "@/config/apis"
import useAxiosFunc from "@/hooks/useAxiosFunc";
import getErrorMsg from "@/helper/getErrorMsg";

export default function Action(props) {

    const [category, error, loading, axiosFetch] = useAxiosFunc();

    const { slug, id } = props
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {




        let isConfirm = window.confirm(`Do you really want to delete this category: ${slug}?`)
        if (isConfirm) {

            await axiosFetch({
                axios: axios,
                method: 'DELETE',
                url: `/categories/${id}`,
                requestConfig: {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            });



        }
    }

    useEffect(() => {
        if (!loading && !error && category) {
            setAlert({ show: true, message: `You have just deleted the category [ ${category.name} ]. `, severity: "info" })
            router.push("/admin/dashboard/categories")
        }
        else if (!loading && error) {
            setAlert({ show: true, message: getErrorMsg(error), severity: "error" })
        }
    }, [loading, error, category])

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton
                    onClick={(e) => { setAnchorEl(e.currentTarget); }}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <BsThreeDotsVertical className='text-gray1' width={30} height={30} />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Link
                        className='flex flex-row items-center'
                        href={`/admin/dashboard/categories/${slug}/update`}
                    >
                        <AiOutlineEdit className='mr-3' /> Edit
                    </Link>

                </MenuItem>

                <Divider />

                <MenuItem onClick={handleDelete}>
                    <AiFillDelete className='mr-3' /> Delete
                </MenuItem>

            </Menu>
        </>
    );
}