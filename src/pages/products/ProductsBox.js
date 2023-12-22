import React from "react";
import { Box, Flex, Grid, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import SingleProduct from "./SingleProduct";

function ProductsBox({ products }) {
    return (
        <Box p={4}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"lg"}>
            <Text fontSize={"xl"}
                fontWeight={600} mb={4}>
                {products.title}
            </Text>
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={2}
            >
                <SingleProduct product={products.items[0]}/>
                <SingleProduct product={products.items[1]}/>
            </Grid>

            <Grid
                mt={4}
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
            >
                <SingleProduct product={products.items[2]}/>
                <SingleProduct product={products.items[3]}/>
                
            </Grid>
        </Box>
    );
}

export default ProductsBox;
