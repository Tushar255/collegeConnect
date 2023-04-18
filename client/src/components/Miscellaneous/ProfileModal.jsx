import React, { useEffect, useState } from 'react'
import {
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Image,
    Text,
    Box,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import axios from 'axios'
import UpdateProfileModal from './UpdateProfileModal'
import Posts from '../Posts'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = useSelector((state) => state.user.token)
    const loggedUser = useSelector((state) => state.user.user)
    const friends = useSelector((state) => state.friend.friends)

    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);

    const [name, setName] = useState()
    const [college, setCollege] = useState()
    const [email, setEmail] = useState()
    const [bio, setBio] = useState()
    const [headline, setHeadline] = useState()
    const [pic, setPic] = useState()
    const [fetchAgain, setFetchAgain] = useState(false)

    const toast = useToast();

    const userDetails = () => {
        setName(user.name.toUpperCase());
        setPic(user.pic);
        setHeadline(user.headline);
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
                        alignItems={'center'}
                    >
                        <Box
                            display="flex"
                            flexDir={"column"}
                            bg="#F8F8F8"
                            p={3}
                            alignItems="center"
                            justifyContent={"space-between"}
                            h="95%"
                            w="28%"
                            borderRadius="lg"
                            boxShadow={'dark-lg'}
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
                                            Friends: {(friends !== undefined) ? friends.length : ""}
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
                            w="55%"
                            h="95%"
                            borderRadius="lg"
                            overflowY="hidden"
                            boxShadow={'dark-lg'}
                        >
                            {posts.length !== 0 ?
                                (<Stack display={'flex'} alignItems={'center'} overflowY="scroll" spacing={'3'} p={{ base: 0, sm: 0 }}>
                                    {posts.map((post) => (
                                        <Posts
                                            key={post._id}
                                            post={post}
                                            handleLike={handleLike}
                                            handleComment={() => { }}
                                            postDetailButton={true}
                                        />
                                    ))}
                                </Stack>)
                                :
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