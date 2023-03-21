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
import UpdateProfileModal from './UpdateProfileModal'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = useSelector((state) => state.user.token)
    const loggedUser = useSelector((state) => state.user.user)

    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);

    const [name, setName] = useState()
    const [college, setCollege] = useState()
    const [email, setEmail] = useState()
    const [bio, setBio] = useState()
    const [headline, setHeadline] = useState()
    const [friends, setFriends] = useState()
    const [pic, setPic] = useState()
    const [fetchAgain, setFetchAgain] = useState(false)

    const navigate = useNavigate();
    const toast = useToast();

    const userDetails = () => {
        setName(user.name.toUpperCase());
        setPic(user.pic);
        setHeadline(user.headline);
        setFriends(user.friends.length);
        setEmail(user.email);
        setBio(user.bio);
        setCollege(user.college)
    }
    useEffect(() => {
        userDetails();
    }, [fetchAgain])

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
                                        src={pic}
                                        mb={2}
                                    />
                                    <Text
                                        fontSize={{ base: "28px", md: "30px" }}
                                        fontFamily="Work sans"
                                    >
                                        {name}
                                    </Text>
                                    <Text
                                        fontSize={{ base: "14px", md: "16px" }}
                                        mb={3}

                                    >
                                        {headline}
                                    </Text>
                                    <Box display="flex" mb={1}>
                                        <Text
                                            fontSize={{ base: "28px", md: "30px" }}

                                        >
                                            Friends: {friends},
                                        </Text>
                                        <Text
                                            ml={2}
                                            fontSize={{ base: "28px", md: "30px" }}

                                        >
                                            Posts: {postCount}
                                        </Text>
                                    </Box>
                                    <Text
                                        fontSize={{ base: "26px", md: "28px" }}
                                        fontFamily="Work sans"
                                    >
                                        {email}
                                    </Text>
                                </Box>

                                {(bio) ? <Text
                                    w="80%"
                                    p={2}
                                    align="center"
                                    fontSize={{ base: "14px", md: "18px" }}

                                >
                                    {bio}
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

                                    >
                                        College: {college}
                                    </Text>

                                </Box>

                                {
                                    loggedUser === user ?
                                        <UpdateProfileModal ifUpdate={() => setFetchAgain(!fetchAgain)} /> : ""
                                }
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
                                (<Stack overflowY="scroll" spacing={'3'} >
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