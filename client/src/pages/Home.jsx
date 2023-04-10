import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Feed from '../components/Feed';
import SideDrawer from '../components/Miscellaneous/SideDrawer';
import RequestList from '../components/Friends/RequestList';
import { setSelectedChat } from '../State/ChatSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }

        dispatch(setSelectedChat(null))
    });

    return (
        <div style={{ width: "100%" }} >
            {user && <SideDrawer />}
            <Box
                display='flex'
                flexFlow={{ base: "row", md: "row-reverse" }}
                justifyContent={{ base: "stretch", md: "right" }}
                w="100%"
                h="91.5vh"
                p="10px"
            >
                <RequestList />
                <Feed />
            </Box>
        </div>
    )
}

export default Home