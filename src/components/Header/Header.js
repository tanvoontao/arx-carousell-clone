'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { auth } from "@/config/firebase";
import { AdminAuthContext } from "../Providers/AdminAuthProvider";
import { useContext, useEffect } from 'react';
import { Typography, Tooltip, IconButton, Divider, MenuItem, Menu, Avatar, Box } from "@mui/material";
import DarkModeBtn from '@/components/Button/DarkModeBtn'



const Header = (props) => {
    const { title } = props
    const router = useRouter()
    const { user } = useContext(AdminAuthContext);

    const username = user ? user.email : "username"
    const avatar = user ? user.photoURL : "https://variety.com/wp-content/uploads/2022/02/Screen-Shot-2022-05-09-at-10.04.13-AM.png?w=1024"

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const signout = async () => {
        await auth.signOut()
        router.push('/admin/login')
    }









    return (
        <section className="flex flex-row items-center justify-between px-5">
            <div>

                <Typography variant="h4">{title}</Typography>
                <p className="text-gray-400" >😎 Welcome, {username}!</p>
            </div>
            <div className="flex justify-end items-center">
                <DarkModeBtn />
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 40, height: 40 }} alt="profile" src={avatar} />
                        </IconButton>
                    </Tooltip>
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
                        👨‍🚀 Profile
                    </MenuItem>
                    <MenuItem>
                        👨‍🚀 My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        ⚙️ Settings
                    </MenuItem>
                    <MenuItem onClick={signout}>
                        🚪 Logout
                    </MenuItem>
                </Menu>
            </div>

        </section>
    )
}


export default Header