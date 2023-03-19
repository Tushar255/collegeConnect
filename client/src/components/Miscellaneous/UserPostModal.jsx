import React from 'react'
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
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const UserPostModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <Button onClick={onOpen}><ViewIcon fontSize="2xl" m={1} /></Button>

            <Modal size="full" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    {/* <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        {user.name}
                    </ModalHeader> */}

                    <ModalCloseButton />

                    <ModalBody
                    // display="flex"
                    // flexDirection="column"
                    // justifyContent="space-between"
                    // alignItems="center"
                    >
                        {/* <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={user.pic}
                            alt={user.name}
                        />
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            fontFamily="Work sans"
                        >
                            Email: {user.email}
                        </Text> */}
                        <Grid
                            templateAreas={`"header header"
                                "nav main"
                                "nav footer"`}
                            gridTemplateRows={'50px 1fr 30px'}
                            gridTemplateColumns={'150px 1fr'}
                            h='200px'
                            gap='1'
                            color='blackAlpha.700'
                            fontWeight='bold'
                        >
                            <GridItem pl='2' bg='orange.300' area={'header'}>
                                Header
                            </GridItem>
                            <GridItem pl='2' bg='pink.300' area={'nav'}>
                                Nav
                            </GridItem>
                            <GridItem pl='2' bg='green.300' area={'main'}>
                                Main
                            </GridItem>
                            <GridItem pl='2' bg='blue.300' area={'footer'}>
                                Footer
                            </GridItem>
                        </Grid>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default UserPostModal