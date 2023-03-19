import React, { useEffect, useState } from 'react'
import { Heading, Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, IconButton, Text, Image, Button, Stack, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../State/PostSlice';
import axios from 'axios';
import { ViewIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom"
import CommentModal from './Miscellaneous/CommentModal';

const Feed = () => {
    const posts = useSelector((state) => state.post.posts);
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                w="65%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {posts ?
                    (<Stack overflowY="scroll" spacing={'10'} p={8}>
                        {posts.map((post) => (
                            <Card
                                w="100%"
                                key={post._id}
                                bg="#E8E8E8"
                                px={3}
                                py={2}
                            >
                                <Box
                                    display={"flex"}
                                    justifyContent="space-between"
                                >
                                    <Box w="100%">
                                        <CardHeader>
                                            <Flex spacing='4'>
                                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                    <Avatar key={post.userId._id} name={post.userId.name} src={post.userId.pic} />

                                                    <Box>
                                                        <Heading size='sm'>{post.userId.name}</Heading>
                                                        <Text>Creator, Chakra UI</Text>
                                                    </Box>
                                                </Flex>
                                            </Flex>
                                        </CardHeader>
                                        <CardBody>
                                            <Text as="b">{post.heading}</Text>
                                            <Text mt={2}>
                                                {post.content}
                                            </Text>
                                        </CardBody>
                                    </Box>
                                    {post.pic ? <Image
                                        boxSize='300px'
                                        src={post.pic}
                                    /> : ""
                                    }
                                </Box>

                                <CardFooter
                                    display={'flex'}
                                    justifyContent='space-between'
                                >
                                    <Box
                                        flexWrap='wrap'
                                        sx={{
                                            '& > button': {
                                                minW: '136px',
                                            },
                                        }}
                                    >
                                        <Button
                                            variant='solid'
                                            mr={5}
                                            colorScheme='pink'
                                            onClick={() => handleLike(post._id)}
                                        >
                                            Like
                                        </Button>
                                        <CommentModal postId={post._id} handleCommentFunction={() => { }} />
                                    </Box>

                                    <Button onClick={() => navigate(`/post/${post._id}`)} _hover={{ bg: "skyblue" }}>
                                        <ViewIcon fontSize="2xl" m={1} />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </Stack>) : <Text align={"center"} bg={"red"} borderRadius="lg" color="white" p={1}>No Post</Text>
                }
            </Box>
        </>
    )
}

export default Feed