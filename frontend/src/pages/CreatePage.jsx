import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';


const CreatePage = () => {
    console.log("rendering CreatePage")

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });
    const { createProduct } = useProductStore();
    const toast = useToast();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
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
            setNewProduct({ name: '', price: '', image: '' })
        }
    }

    return (
        <Container maxW={'container.sm'} mt={10}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} mb={8} textAlign={"center"} >
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue('white', 'gray.800')} padding={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        /> name
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        /> price
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                        /> image
                        <Button onClick={handleAddProduct} w={"full"} colorScheme='blue'>Add Product</Button>
                    </VStack>
                </Box>
            </VStack>
        </Container >
    )
}

export default CreatePage