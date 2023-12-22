import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  Box,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Button,
  Select,
  Textarea,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      console.log("photo", photo);
      console.log("productData", productData);

      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      console.log("data", data);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <AdminMenu>
      <Box maxW="650px">
        <Text mb={4} fontSize="2xl">
          Create Product
        </Text>
        <form onSubmit={handleCreate}>
          <Stack
            gap={1}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <FormLabel>Add New Product</FormLabel>

            <Select
              placeholder="Select a category"
              onChange={(value) => {
                setCategory(value.target.value);
              }}
            >
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Select>

            <FormControl id="product_image">
              <label for="image-upload" class="custom-file-upload">
                Upload Product Image
              </label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </FormControl>

            <Stack>
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </Stack>

            <FormControl id="product_title">
              <Input
                // className="custom_image_input"
                placeholder="Title"
                focusBorderColor="teal.500"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl id="product_description">
              <Textarea
                placeholder="Description"
                focusBorderColor="teal.500"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl id="product_price">
              <Input
                placeholder="Price"
                focusBorderColor="teal.500"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl id="product_quantity">
              <Input
                placeholder="Quantity"
                focusBorderColor="teal.500"
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>

            <Select
              placeholder="Select Shipping"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </Select>

            <Button
              type="submit"
              bg={"teal.800"}
              color={"white"}
              _hover={{
                bg: "teal.900",
              }}
            >
              Add Product
            </Button>
          </Stack>
        </form>
      </Box>
    </AdminMenu>
  );
}

export default CreateProduct;
