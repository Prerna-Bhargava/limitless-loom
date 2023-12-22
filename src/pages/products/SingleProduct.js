import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function SingleProduct({ product }) {
    return (
        <Link to={`/product/category/${product.category}`}>
            <Box p={1} rounded="md">
                <Box
                    width="9rem"
                    height="7rem"
                    backgroundImage={product.src}
                    backgroundRepeat='no-repeat'
                    backgroundSize="9rem 7rem"
                >
                </Box>
                <Text fontSize="lg">{product.category}</Text>
            </Box>
        </Link>
    )
}

export default SingleProduct

