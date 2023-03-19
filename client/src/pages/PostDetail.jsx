import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Stack, Text, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import CommentModal from '../components/Miscellaneous/CommentModal';

const PostDetail = () => {
    const postId = useParams();
    const [post, setPost] = useState();
    const [likes, setLikes] = useState(0);
    const [likedUser, setLikedUser] = useState([]);
    const [commentedUser, setCommentedUser] = useState([]);
    const [comments, setComments] = useState(0);
    const [fetchAgainLikes, setFetchAgainLikes] = useState(false);

    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.user);
    const toast = useToast();

    const currPost = async () => {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } = await axios.post("http://localhost:3002/api/post/postdetail", { postId }, config);

        setPost(data.post);
    }

    useEffect(() => {
        currPost();
    }, [])

    const handleLike = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const ids = {
                postId: postId.id,
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

            setFetchAgainLikes(!fetchAgainLikes)

        } catch (error) {
            alert(error)
        }
    }

    const allLikes = async () => {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } = await axios.post("http://localhost:3002/api/post/alllike", { postId }, config);

        setLikes(data.likes);
        setLikedUser(data.likedUser);
    }

    const allComments = async () => {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } = await axios.post("http://localhost:3002/api/post/allcomments", { postId }, config);

        setComments(data.comments);
        setCommentedUser(data.commentedUser);
    }

    useEffect(() => {
        allLikes();
    }, [fetchAgainLikes])

    useEffect(() => {
        allComments();
    }, [])



    return (
        <Box w="100%" h="100vh" p="10px">
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                ml="15%"
                w="65%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {post ?
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
                            <Box>
                                <h3>Likes: {likes}</h3>
                                <h3>Comments: {comments}</h3>
                            </Box>
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
                                <CommentModal postId={post._id} handleCommentFunction={() => { allComments() }} />
                            </Box>
                        </CardFooter>
                    </Card> : "No Post"
                }

                {/* <LikeAndComments /> */}
                <Box display="flex" justifyContent={"space-between"} w="100%" h="54%" p={3} bg="white">

                    <Box
                        id='likes'
                        display="flex"
                        flexDir="column"
                        w="30%"
                        h="100%"
                        alignItems={"center"}
                    >

                        <Box
                            display="flex"
                            flexDir="column"
                            p={3}
                            bg="#F8F8F8"
                            // bg="gold"
                            w="100%"
                            h="80%"
                            borderRadius="lg"
                            overflowY="hidden"
                        >
                            <Text fontSize='2xl' align="center" mb="2">Likes</Text>
                            {likedUser ? (
                                <Stack overflowY="scroll">
                                    {likedUser.map((user) => (
                                        <Box
                                            display="felx"
                                            justifyContent="space-between"
                                            bg={"#E8E8E8"}
                                            color={"black"}
                                            px={3}
                                            py={1.5}
                                            borderRadius="lg"
                                            key={user._id}
                                        // _hover={{
                                        //     background: "brown"
                                        // }}
                                        >

                                            <Flex spacing='4'>
                                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                    <Avatar name={user.userId.name} src={user.userId.pic} />

                                                    <Box>
                                                        <Heading size='sm'>{user.userId.name}</Heading>
                                                        <Text>Creator, Chakra UI</Text>
                                                    </Box>
                                                </Flex>
                                            </Flex>
                                        </Box>
                                    ))}
                                </Stack>
                            ) : "No requests"
                            }
                        </Box>
                    </Box>

                    <Box
                        id='comments'
                        display="flex"
                        flexDir="column"
                        w="68%"
                        h="100%"
                        alignItems={"center"}
                    >

                        <Box
                            display="flex"
                            flexDir="column"
                            p={3}
                            bg="#F8F8F8"
                            // bg="gold"
                            w="100%"
                            h="80%"
                            borderRadius="lg"
                            overflowY="hidden"
                        >
                            <Text fontSize='2xl' align="center" mb="2">Comments</Text>
                            {commentedUser ? (
                                <Stack overflowY="scroll">
                                    {commentedUser.map((user) => (
                                        <>
                                            <Box
                                                bg={"#E8E8E8"}
                                                color={"black"}
                                                px={3}
                                                py={2}
                                                borderRadius="lg"
                                                key={user._id}
                                            // _hover={{
                                            //     background: "brown"
                                            // }}
                                            >

                                                <Flex spacing='4'>
                                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                        <Avatar src={user.userId.pic} />

                                                        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                                                            <Heading size='sm'>{user.userId.name}</Heading>
                                                            <Text ml={2}>Creator, Chakra UI</Text>
                                                        </Box>
                                                    </Flex>
                                                </Flex>

                                                <Box
                                                    p={2}
                                                >
                                                    {user.commentText}
                                                </Box>
                                            </Box>
                                        </>
                                    ))}
                                </Stack>
                            ) : "No requests"
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PostDetail