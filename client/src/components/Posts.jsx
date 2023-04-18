import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import CommentModal from './Miscellaneous/CommentModal';
import { ViewIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import UserBadgeItem from './UserAvatar/UserBadgeItem';

const Posts = ({ post, handleLike, handleComment, postDetailButton }) => {
    const navigate = useNavigate();

    return (
        <Card
            w="100%"
            key={post._id}
            bg="#E8E8E8"
            // px={3}
            // py={2}
            border={'1px solid black'}
        >
            <Box
                display={"flex"}
                flexDir={'column'}
            >
                <Box w="100%">
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>

                                <Avatar
                                    key={post.userId._id}
                                    name={post.userId.name}
                                    src={post.userId.pic}
                                />

                                <Box>
                                    <Heading size='sm'>{post.userId.name}</Heading>
                                    <Text>{post.userId.headline}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody
                        pt={1}
                    >
                        <Text as="b">{post.heading}</Text>
                        <Text mt={2} textAlign={'justify'}>
                            {post.content}
                        </Text>
                        <Box justifyContent={{ base: 'center' }} alignItems={'center'} w="100%" display="flex" flexWrap="wrap" mt={5}>
                            {post.tags.map((tag, index) => (
                                <UserBadgeItem
                                    key={index}
                                    user={tag}
                                    noCrossIcon={true}
                                    handleFunction={() => { }}
                                />
                            ))}
                        </Box>
                    </CardBody>
                </Box>
                {post.pic ?
                    <Box
                        display="flex"
                        justifyContent={"center"}
                    >
                        <Image
                            align={"center"}
                            boxSize={{ base: '350px', sm: '400px', md: '500px' }}
                            src={post.pic}
                        />
                    </Box> : ""
                }
            </Box>

            <CardFooter
                display={'flex'}
                justifyContent='space-between'
            >
                <Box>
                    <Button
                        size={{ base: 'xs', sm: 'sm', md: 'md' }}
                        variant='solid'
                        mr={5}
                        colorScheme='pink'
                        _hover={{ color: 'black' }}
                        onClick={() => handleLike(post._id)}
                    >
                        Like
                    </Button>
                    <CommentModal postId={post._id} handleCommentFunction={() => { handleComment() }} />
                </Box>

                {
                    postDetailButton ?
                        <Button
                            size={{ base: 'xs', sm: 'sm', md: 'md' }}
                            onClick={() => navigate(`/post/${post._id}`)}
                            _hover={{ bg: "skyblue" }}
                        >
                            <ViewIcon fontSize="2xl" m={1} />
                        </Button>
                        : ""
                }
            </CardFooter>
        </Card>
    )
}

export default Posts