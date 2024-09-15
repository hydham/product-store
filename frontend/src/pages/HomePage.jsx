import { Box, Container, Flex, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
    console.log('rendering Homepage')
    const { getProducts, products } = useProductStore();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            await getProducts();
            setLoading(false);
        }
        fetchProducts();
    }, [getProducts])

    console.log('Products fetched:', products);  // Log the products fetched

    return (
        <Container maxW={"container.xl"} py={12} >
            <VStack spacing={8}>
                <Text
                    fontSize={30}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Products 🚀
                </Text>

                {
                    loading === true ? <Spinner /> :
                        products.length === 0 ?
                            <Box >
                                <Text color={'gray.500'} fontWeight={'bold'} textAlign={'center'} fontSize={"xl"}>
                                    No products found 😢 {" "}
                                    <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                                        <Link to={"/create"}>Create a product</Link>
                                    </Text>
                                </Text>
                            </Box> :

                            <SimpleGrid
                                columns={{ base: 1, sm: 2, lg: 3 }}
                                spacing={10}
                                width={"full"}
                            >
                                {
                                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                                }
                            </SimpleGrid>
                }

            </VStack>
        </Container >
    )
}

export default HomePage