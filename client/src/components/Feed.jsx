import React, { useEffect } from 'react'
import { Box, Text, Stack, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../State/PostSlice';
import axios from 'axios';
import Posts from './Posts';

const Feed = () => {
    const posts = useSelector((state) => state.post.posts);
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const toast = useToast();

    const allPost = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.get("http://localhost:3002/api/post", config);

        dispatch(setPosts(data));
    }

    useEffect(() => {
        allPost();
    }, [])

    const handleLike = async (postId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const ids = {
                postId: postId,
                userId: user._id
            }

            const { data } = await axios.post("http://localhost:3002/api/post/like", { ids }, config);

            toast({
                title: data.msg,
                status: "success",
                duration: 1000,
                isClosable: true,
                position: "top"
            });

        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w={{ base: "100%", md: "45%" }}
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
                boxShadow={'dark-lg'}
            >
                {posts ?
                    (<Stack display={'flex'} alignItems={'center'} overflowY="scroll" spacing={'10'} p={{ base: 0, sm: 4 }}>
                        {posts.map((post) => (
                            <Posts
                                post={post}
                                handleLike={handleLike}
                                handleComment={() => { }}
                                postDetailButton={true}
                            />
                        ))}
                    </Stack>)
                    :
                    <Text align={"center"} bg={"red"} borderRadius="lg" color="white" p={1}>No Post</Text>
                }
            </Box>
        </>
    )
}

export default Feed