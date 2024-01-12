import React, { useEffect, useState } from "react";
import HomeProductFilter from "./HomeProductFilter";
import ProductCard from "../products/ProductCard";
import {
  Box,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Grid,
  Button,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
// import { Prices } from "../components/Prices";

import { AiOutlineReload } from "react-icons/ai";

function HomeProducts() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([{
    _id: "1",
    name: "Sample Product 1",
    price: 20,
    description: "This is a sample product description.",
    category: "ab",
    img:"https://m.media-amazon.com/images/I/814rhxHg5wL._AC_SY400_.jpg"
    // Add more properties as needed
  },
  {
    _id: "2",
    name: "Sample Product 2",
    price: 199,
    description: "Another sample product description.",
    category: "ab",
    img:"https://m.media-amazon.com/images/I/81jZ+sACKcL._AC_SY400_.jpg"

    // Add more properties as needed
  },
  {
    _id: "3",
    name: "Sample Product 3",
    price: 290.99,
    description: "Another sample product description.",
    category: "ab",
    img:"https://m.media-amazon.com/images/I/81jZ+sACKcL._AC_SY400_.jpg"

    // Add more properties as needed
  }]);

  const [filteredProduct,setfilterProduct] = useState([{
    _id: "1",
    name: "Sample Product 1",
    price: 20,
    description: "This is a sample product description.",
    category: "ab",
    img:"https://m.media-amazon.com/images/I/814rhxHg5wL._AC_SY400_.jpg"
    // Add more properties as needed
  },
  {
    _id: "2",
    name: "Sample Product 2",
    price: 199,
    description: "Another sample product description.",
    category: "ab",
    img:"https://m.media-amazon.com/images/I/81jZ+sACKcL._AC_SY400_.jpg"

    // Add more properties as needed
  },
  {
    _id: "3",
    name: "Sample Product 3",
    price: 290.99,
    description: "Another sample product description.",
    category: "ab",
    img:"https://m.media-amazon.com/images/I/81jZ+sACKcL._AC_SY400_.jpg"

    // Add more properties as needed
  }])

  const [categories, setCategories] = useState([{ _id: "1",
  name: "Shoes"},{ _id: "2",
  name: "Toys"}]);
  const [Prices, setPrices] = useState([
    { name: 'less than 200', min:0,max:200,array: [0, 200, 30] },
    { name: '200-500', min:200, max:500, array: [200, 500, 60] },
  ]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
      // setCategories()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/product-count"
      );
      setTotal(data?.total);
      setTotal(5);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("radio", radio);

  return (
    <>
      {/* <HomeProductFilter /> */}

      <Box className="home_products_page">

        <Flex>
          <Box flex={1.5}>

            <Stack p={8}>
              <Text fontSize={"3xl"}
                fontWeight={500} mb={4}>
                Products for You
              </Text>
              <Text fontSize="1xl">Filter By Category</Text>
              <Divider />
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
              {/* price filter */}
              <Text fontSize="1xl">Filter By Price</Text>
              <Divider />
              <RadioGroup onChange={(e) => {
                console.log(e.split(",").map(Number)[0])
                // setProducts(products.filter((c) => c.price >= e.split(",").map(Number)[0]  ))
                // setProducts(products.filter((c) => {
                //   const priceRange = e.split(",").map(Number); // Convert string values to numbers
                //   return c.price >= priceRange[0] && c.price <= priceRange[1];
                //  }));
                const priceRange = e.split(",").map(Number);

                setfilterProduct(products.filter((c) => c.price >= priceRange[0] && c.price <= priceRange[1]));
              


              }}>
                <Stack direction="column">
                  {Prices?.map((p) => (
                <Radio value={p.array.toString()}>{p.name}</Radio>
              ))}
                </Stack>
              </RadioGroup>
              <Divider />
              <Button
                fontWeight="400"
                colorScheme="teal"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </Button>
            </Stack>
          </Box>
          <Box flex={3}>
            <Stack direction="column">
              <Box className="home_products">
                {filteredProduct?.map((p) => (
                  <ProductCard p={p} setCart={setCart} cart={cart}></ProductCard>
                ))}
              </Box>
              <Stack justifyContent="center" alignItems="center" width="full">
                {products && products.length < total && (
                  <Button
                    width="175px"
                    fontWeight="400"
                    colorScheme="teal"
                    className="btn loadmore"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? (
                      "Loading ..."
                    ) : (
                      <>
                        {" "}
                        Loadmore <AiOutlineReload />
                      </>
                    )}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Flex>


      </Box>
    </>
  );
}

export default HomeProducts;
