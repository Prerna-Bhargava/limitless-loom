// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import { useParams } from 'react-router-dom'
// import { Box } from '@chakra-ui/react'

// function ProductCategory() {
//     const { category } = useParams()
//     return (
//         <Layout title="Category">
//             <Box>
//                 {category}
//             </Box>
//         </Layout>
//     )
// }

// export default ProductCategory


import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { Box, Grid, Image, Text } from '@chakra-ui/react';

// Dummy data
const products = [
  {
    id: 1,
    category: 'Electronics',
    name: 'Smartphone',
    price: '$599',
    imageSrc: 'https://dummyimage.com/150x150/3498db/ffffff',
  },
  {
    id: 2,
    category: 'Electronics',
    name: 'Laptop',
    price: '$999',
    imageSrc: 'https://dummyimage.com/150x150/2ecc71/ffffff',
  },
  {
    id: 1,
    category: 'Toys',
    name: 'Elephant',
    price: '$10',
    imageSrc: 'https://m.media-amazon.com/images/I/81ZB62prn-L._AC_SY400_.jpg',
  },
  {
    id: 2,
    category: 'Toys',
    name: 'Junior Ring',
    price: '$999',
    imageSrc: '	https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61XC4-QDkKL._SX425_.jpg',
  },
  // Add more dummy data as needed
];

function ProductCategory() {
  const { category } = useParams();
  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <Layout title={`Products in ${category}`}>
      <Box textAlign="center" maxWidth="500px" mx="auto" mb={20}>
        {/* Display the category name */}
        <Box mb={4} mt={4} textAlign="center" fontSize="xl" fontWeight="bold">
          {category}
        </Box>
        
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" mx="auto" gap={4}>
          {filteredProducts.map((product) => (
            <Box key={product.id} p={4} borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image src={product.imageSrc} alt={product.name} height="150px" objectFit="cover" />
              <Text mt={2} fontSize="lg" fontWeight="semibold">
                {product.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {product.price}
              </Text>
              <Text fontSize="sm" color="gray.500">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam similique sit ullam numquam maiores nesciunt maxime quia laborum, excepturi voluptate.
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}

export default ProductCategory;
