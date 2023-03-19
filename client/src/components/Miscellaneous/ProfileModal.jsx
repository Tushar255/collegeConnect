import React, { useEffect, useState } from 'react'
import {
    Button,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    Text,
    Grid,
    GridItem,
    Box,
    Stack,
    Card,
    CardHeader,
    Flex,
    CardBody,
    Avatar,
    Heading,
    CardFooter,
    useToast,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CommentModal from './CommentModal'
import { useNavigate } from 'react-router-dom'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = useSelector((state) => state.user.token)

    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);

    const navigate = useNavigate();
    const toast = useToast();

    const getUserPosts = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const userId = user._id;

        const { data } = await axios.post("http://localhost:3002/api/post/userposts", { userId }, config)

        setPosts(data.posts);
        setPostCount(data.totalPosts);
    }

    useEffect(() => {
        getUserPosts();
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
            {
                children ? <span onClick={onOpen}>{children}</span> : (
                    <IconButton
                        display={{ base: "flex" }}
                        icon={<ViewIcon />}
                        onClick={onOpen}
                    />
                )
            }
            <Modal size="full" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalCloseButton bg="red" color={"white"} />

                    <ModalBody
                        display="flex"
                        h="100%"
                        bg="skyblue"
                        justifyContent={"space-evenly"}
                    >
                        <Box
                            display="flex"
                            flexDir={"column"}
                            bg="#F8F8F8"
                            p={3}
                            alignItems="center"
                            justifyContent={"space-between"}
                            h="100%"
                            w="28%"
                            borderRadius="lg"
                        >
                            <Box
                                display="flex"
                                flexDir={"column"}
                                bg="#E8E8E8"
                                p={3}
                                alignItems="center"
                                justifyContent={"space-between"}
                                h="100%"
                                w="100%"
                                borderRadius="lg"
                            >
                                <Box
                                    display="flex"
                                    flexDir={"column"}
                                    justifyContent={"center"}
                                    alignItems="center"
                                >
                                    <Image
                                        borderRadius="full"
                                        boxSize="150px"
                                        src={user.pic}
                                        alt={user.name}
                                        mb={2}
                                    />
                                    <Text
                                        fontSize={{ base: "28px", md: "30px" }}
                                        fontFamily="Work sans"
                                    >
                                        {user.name.toUpperCase()}
                                    </Text>
                                    <Box display="flex">
                                        <Text
                                            fontSize={{ base: "28px", md: "30px" }}
                                            fontFamily="Work sans"
                                        >
                                            Friends: {user.friends.length},
                                        </Text>
                                        <Text
                                            ml={2}
                                            fontSize={{ base: "28px", md: "30px" }}
                                            fontFamily="Work sans"
                                        >
                                            Posts: {postCount}
                                        </Text>
                                    </Box>
                                    <Text
                                        fontSize={{ base: "28px", md: "30px" }}
                                        fontFamily="Work sans"
                                    >
                                        {user.email}
                                    </Text>
                                </Box>

                                {(user.bio) ? <Text
                                    fontSize={{ base: "28px", md: "30px" }}
                                    fontFamily="Work sans"
                                >
                                    Bio: {user.bio}
                                </Text> : ""
                                }

                                <Box
                                    display="flex"
                                    flexDir={"column"}
                                    justifyContent={"center"}
                                    alignItems="center"
                                >
                                    <Text
                                        fontSize={{ base: "28px", md: "30px" }}
                                        fontFamily="Work sans"
                                    >
                                        College: {user.college}
                                    </Text>

                                </Box>

                                <Button colorScheme={"green"}>Edit</Button>
                            </Box>
                        </Box>

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
                            {posts.length !== 0 ?
                                (<Stack overflowY="scroll" >
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

                                                    <CommentModal postId={post._id} handleCommentFunction={() => { }}
                                                    />
                                                </Box>
                                                <Button onClick={() => navigate(`/post/${post._id}`)} _hover={{ bg: "skyblue" }}>
                                                    <ViewIcon fontSize="2xl" m={1} />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </Stack>) :
                                <Text
                                    h="100%"
                                    align={"center"}
                                    bg={"grey"}
                                    borderRadius="lg"
                                    color="white"
                                    p={1}
                                >
                                    No Post
                                </Text>
                            }
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal