import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { PlusSquareIcon } from "@chakra-ui/icons";


const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDir={{ base: "column", sm: "row" }}
                h={16}
            >
                <Text
                    onClick={() => navigate('/')}
                    cursor={"pointer"}
                    textTransform={"uppercase"}
                    bgGradient={'linear(to-r, cyan.400, blue.500)'}
                    bgClip={"text"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    fontSize={{ base: 22, sm: 28 }}
                >
                    product store  🛒
                </Text>
                <HStack alignItems={"center"} spacing={2}>
                    <Button onClick={() => navigate('/create')}>
                        <PlusSquareIcon fontSize={20} />
                    </Button>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun fontSize={20} />}
                    </Button>
                </HStack>
            </Flex>
        </Container >
    )
}

export default Navbar