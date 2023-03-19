import { Avatar, background, Box, Button, Text } from '@chakra-ui/react';
import React from 'react'

const UserListItem = ({ isTrue, user, chatAvail, handleChatFunction, handleConnectFunction }) => {
    return (
        <Box
            bg="#E8E8E8"
            _hover={{
                background: "pink"
            }}
            w="100%"
            h="12%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box display="flex" justifyContent="space-between" w="100%" alignItems="center">
                <Text>{user.name}</Text>
                <Box display="flex" flexDirection={"column"}>

                    {chatAvail ?
                        <Button
                            mb={1}
                            _hover={{ color: "black" }}
                            size='xs'
                            colorScheme="whatsapp"
                            variant='solid'
                            onClick={handleChatFunction}
                        >
                            Chat
                        </Button> : ""
                    }
                    {isTrue ? <Button
                        size='xs'
                        _hover={{ color: "black" }}
                        colorScheme="telegram"
                        variant='solid'
                        onClick={handleConnectFunction}
                    >
                        Add/Remove
                    </Button> : ""}
                </Box>
            </Box>
        </Box>
    )
}

export default UserListItem