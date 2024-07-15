/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineJoinRight } from "react-icons/md";
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import { useEffect } from 'react';
import Post from '../Sidebar/Post';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { RiSendPlaneFill } from "react-icons/ri";
import { Outlet } from 'react-router-dom';
import DitiAI from '../Sidebar/QI';

const Sidenav = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openPost, setOpenPost] = useState(false);
    const [openAi, setOpenAi] = useState(false)

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        console.log("Invoked");
    }, [openPost]);

    const handlePublish = () => {
        setOpenPost(!openPost);
    };

    const handleClosePost = () => {
        setOpenPost(false);
    };

    const handleAi = () => {
        setOpenAi(!openAi)
    };

    const handleCloseAi = () => {
        setOpenAi(false)
    };

    const menuItem = [
        {
            name: "Dashboard",
            icon: <MdDashboardCustomize />,
            path: "/dashboard"
        },
        {
            name: 'Social Integration',
            icon: <MdOutlineJoinRight />,
            path: '/social-integration'
        },
        {
            name: <div onClick={handlePublish}>Publish</div>,   
            icon: <RiSendPlaneFill onClick={handlePublish} />
        },
        {
            name: <div onClick={handleAi}>Quantum AI</div>,
            icon: <AutoAwesomeIcon onClick={handleAi} />
        },
        {
            name: "Analytics",
            icon: <EqualizerOutlinedIcon />,
            path: '/analytics'
        },
        {
            name: "Account Overview",
            icon: <MdOutlineAccountCircle />,
            path: "/account-overview"
        }
    ];

    return (
        <div className="container">
            <div
                className="sidebar"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ width: isOpen ? "240px" : "50px" }}>
                <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "40px" : "0px" }} className="bars"></div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className='prat'>
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
            <Outlet />
            {openPost && <Post onClose={handleClosePost} />}
            {openAi && <DitiAI onClose={handleCloseAi} />}
        </div>
    );
};

export default Sidenav;