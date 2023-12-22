import {
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Divider,
  HStack,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast'
import { Link as RouterLink } from "react-router-dom";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [emailError, setEmailError] = useState(""); // New state for email error
  const [passwordError, setPasswordError] = useState(""); // New state for password error
  const [nameError, setNameError] = useState("");
  const [addError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [answerError, setAnsError] = useState("");
  const HARDCODED_SECRET_QUESTION = 'What is your favorite brand?';


  // const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    console.log(name, email, address, password, phone)
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!address) {
      setAddressError("Address is required");
      return;
    }
    if (!phone) {
      setPhoneError("Phone Number is required");
      return;
    }

    // if (!answer) {
    //   setAnsError("Secret Answer is required");
    //   return;
    // }
    if (!/^\d{10}$/.test(phone)) {
      console.log("hegf")
      setPhoneError("Phone number must be a 10-digit number");
      return;
    }
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        // toast.success(res.data && res.data.message);
        // navigate("/login");
        console.log(res.data)
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login">
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} width="450px" mx={"auto"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign="center">
              Sign Up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="fullname" isRequired isInvalid={nameError}>
                <FormLabel>Full name</FormLabel>
                <Input focusBorderColor="teal.500" type="text" onChange={(e) => { setName(e.target.value); setNameError("") }} />
                <FormErrorMessage>{nameError}</FormErrorMessage>

              </FormControl>
              <FormControl id="email" isRequired isInvalid={emailError} >
                <FormLabel>Email address</FormLabel>
                <Input focusBorderColor="teal.500" type="email" onChange={(e) => { setEmail(e.target.value); setEmailError("") }} />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>
              <FormControl id="phone" isRequired isInvalid={phoneError} >
                <FormLabel>Phone Number</FormLabel>
                <Input focusBorderColor="teal.500" type="phone" onChange={(e) => { setPhone(e.target.value); setPhoneError("") }} />
                <FormErrorMessage>{phoneError}</FormErrorMessage>
              </FormControl>

              <FormControl id="address" isRequired isInvalid={addError}>
                <FormLabel>Address</FormLabel>
                <Input focusBorderColor="teal.500" type="text" onChange={(e) => { setAddress(e.target.value); setAddressError("") }} />
                <FormErrorMessage>{addError}</FormErrorMessage>
              </FormControl>

              <FormControl id="password" isRequired isInvalid={passwordError}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor="teal.500"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("")
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      bg="none"
                      _hover="none"
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{passwordError}</FormErrorMessage>

              </FormControl>

              <FormControl id="answer" isRequired isInvalid={answerError}>
                <FormLabel>{HARDCODED_SECRET_QUESTION}</FormLabel>
                <Input placeholder="Enter the answer to secret question" focusBorderColor="teal.500" type="text" onChange={(e) => { setAnswer(e.target.value); setAnsError("") }} />
                <FormErrorMessage>{answerError}</FormErrorMessage>
              </FormControl>

              <Stack>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  bg={"teal.800"}
                  color={"white"}
                  _hover={{
                    bg: "teal.900",
                  }}
                  onClick={(e) => { handleSubmit(e) }}
                >
                  Sign Up
                </Button>
                <Divider mt={10} />
                <Text align={"center"}>
                  Already a user?{" "}
                  <RouterLink to="/login">
                    <Text
                      display="inline-block"
                      color="teal.800"
                      fontWeight="bold"
                    >
                      Login
                    </Text>
                  </RouterLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}

export default Register;
