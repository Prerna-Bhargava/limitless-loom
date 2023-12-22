import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  Box,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Divider,
  useColorModeValue,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,

} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
function CreateCategory() {
  const finalRef = React.useRef(null)
  const { register, handleSubmit, getValues, reset, control, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const onSubmit = async categoryData => {
    console.log(categoryData)
    try {
      const { data } = await axios.post("/api/v1/category/create-category",
        categoryData,
      );
      if (data?.success) {
        console.log(`${name} is created`);
        getAllCategory();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      console.log("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
        onclose
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        console.log(`category is deleted`);

        getAllCategory();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Somtihing went wrong");
    }
  };

  return (
    <AdminMenu>
      <Box maxW="650px">
        <Text mb={4} fontSize="2xl">
          Manage Categories
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            gap={1}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <FormControl id="category_name">
              <FormLabel>Add New Category</FormLabel>
              <Input
                placeholder="Category Name"
                required
                focusBorderColor="teal.500"
                type="text"
                {...register("name", { required: true })}
              />
            </FormControl>

            <Button
              type="submit"
              bg={"teal.800"}
              color={"white"}
              _hover={{
                bg: "teal.900",
              }}
            >
              Add Category
            </Button>
          </Stack>
        </form>

        <Stack
          gap={1}
          mt={5}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Text mb={4} fontSize="1xl">
            List Of Categories
          </Text>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th colSpan="2">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories?.map((c) => (
                  <>
                    <Tr>
                      <Td key={c._id}>{c.name}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}

                        // onClick={onOpen}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

        </Stack>

        <Modal finalFocusRef={finalRef} isOpen={visible}  >
          <ModalOverlay />
          <ModalContent >
            <ModalHeader>Update Category</ModalHeader>
            <ModalCloseButton onClick={() => {
              setVisible(false)
            }} />

            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
              setVisible={setVisible}
            />

          </ModalContent>
        </Modal>

      </Box>
    </AdminMenu>
  );
}

export default CreateCategory;
