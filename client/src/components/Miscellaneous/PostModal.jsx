import React, { useState } from 'react'
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
    VStack,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Textarea,
} from '@chakra-ui/react'
import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { setPosts } from '../../State/PostSlice'

const PostModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

    const toast = useToast();
    const dispatch = useDispatch();

    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)
    const [pic, setPic] = useState("")

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            setLoading(false);
            return;
        }

        if (pics.type === "image/jpg" || pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dghjrpqap");
            fetch("https://api.cloudinary.com/v1_1/dghjrpqap/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
            setPic("")
        }
    }

    const handlePost = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const info = {
                userId: user._id,
                heading: heading,
                content: content,
                pic: pic,
            }

            const { data } = await axios.post(`http://localhost:3002/api/post/create`, { info }, config)

            dispatch(setPosts(data.post));

            toast({
                title: data.msg,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });

            setHeading("")
            setContent("")
            onClose();
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
    }

    return (
        <>
            <Button onClick={onOpen}><AddIcon fontSize="2xl" m={1} /></Button>

            <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Create a new post
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {/* <VStack spacing="5px"> */}
                        <FormControl id="heading">
                            <FormLabel>Heading</FormLabel>
                            <Input
                                id='heading'
                                placeholder="Write a Heading"
                                onChange={(e) => setHeading(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="pic">
                            <FormLabel>Upload a Picture</FormLabel>
                            <Input
                                type="file"
                                p={1.5}
                                accept="image/*"
                                onChange={(e) => postDetails(e.target.files[0])}
                            />
                        </FormControl>
                        <FormControl id="content" isRequired>
                            <FormLabel>Content</FormLabel>
                            <Textarea id='content'
                                placeholder="Write Some Content"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={handlePost}>Create</Button>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostModal