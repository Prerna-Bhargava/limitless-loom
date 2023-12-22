import React from "react";
import Layout from "../components/Layout/Layout";
import HomeCarousel from "./HomeFeatures/HomeCarousel";
import HomeFeatures from "./HomeFeatures/HomeFeatuers";
import HomeProducts from "./HomeFeatures/HomeProducts";
import { Box, Flex } from "@chakra-ui/react";
import ProductCard from "./products/ProductCard";
import ProductsBox from "./products/ProductsBox";
import FourBoxesLayout from "./products/FourBoxesLayout";

function Home() {
  return (
    <Layout title="Home Page">
      <HomeCarousel />
      <Flex>
        <Box flex="3">
          <FourBoxesLayout />
          <HomeProducts />

          {/* <Flex>
            <Box flex="1">
              <HomeProducts />
            </Box>
            <Box flex="3">
              <HomeProducts />
            </Box>
          </Flex> */}

        </Box>
        <Box flex="1">
          <HomeFeatures />
        </Box>
      </Flex>
      {/* <FourBoxesLayout/> */}

      {/* <ProductsBox/> */}

    </Layout>
  );
}

export default Home;
