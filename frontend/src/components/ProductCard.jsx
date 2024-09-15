import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }) => {
    console.log("Product Card Rendering")

    const [item, setItem] = useState(product)

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleDelete = async () => {
        const { success, message } = await deleteProduct(product._id);
        console.log(success, message);
        if (!success) {
            toast({
                title: "error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        } else {
            toast({
                title: "success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true
            })
        }
    }

    const handleUpdate = async () => {
        const { success, message } = await updateProduct(product._id, item)

        if (!success) {
            toast({ title: "Error", description: message, status: "error", duration: 5000, isClosable: true })
        } else {
            toast({ title: "Success", description: message, status: "success", duration: 5000, isClosable: true })
            onClose();
        }
    }

    return (
        <Box
            shadow={'xl'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={'cover'}></Image>

            <Box>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={"bold"} fontSize={'xl'} mb={4} color={textColor}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton
                        icon={<EditIcon></EditIcon>}
                        onClick={onOpen}
                        colorScheme='blue'
                    />
                    <IconButton
                        icon={<DeleteIcon></DeleteIcon>}
                        onClick={handleDelete}
                        colorScheme='red'
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Name'
                                value={item.name}
                                onChange={e => setItem(prevState => ({ ...prevState, name: e.target.value }))} />
                            <Input
                                placeholder='Price'
                                type='number'
                                value={item.price}
                                onChange={e => setItem(prevState => ({ ...prevState, price: e.target.value }))} />
                            <Input
                                placeholder='Image'
                                value={item.image}
                                onChange={e => setItem(prevState => ({ ...prevState, image: e.target.value }))} />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleUpdate}
                            colorScheme='blue'
                            marginRight={3}
                        >
                            Update
                        </Button>
                        <Button
                            variant={'ghost'}
                            onClick={() => {
                                setItem(product)
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard