import { React, useState } from 'react';
import toast from 'react-hot-toast'
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
    useColorModeValue,
} from "@chakra-ui/react";
import Layout from "../../components/Layout/Layout";
import axios from "axios"
import { useAuth } from "../../context/auth";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const [emailError, setEmailError] = useState(""); // New state for email error
    const [passwordError, setPasswordError] = useState(""); // New state for password error
    const [answerError, setAnsError] = useState("");
    const HARDCODED_SECRET_QUESTION = 'What is your favorite brand?';
    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        console.log(email, password, auth)
        e.preventDefault();
        if (!email) {
            setEmailError("Email is required");
            return;
        }
        if (!answer) {
            setAnsError("Password is required");
            return;
        }

        if (!password) {
            setPasswordError("Password is required");
            return;
        }
        try {
            const res = await axios.post(" /api/v1/auth/resetPassword", {
                email,
                password,
                answer
            });
            console.log(res)

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                console.log(auth)
                localStorage.setItem("auth", JSON.stringify(res.data
                ));
                navigate("/login");
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
                <Stack spacing={8} width="450px" mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign="center">
                            Reset Password
                        </Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email" isInvalid={emailError} isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input focusBorderColor="teal.500" type="email" onChange={(e) => { setEmail(e.target.value); setEmailError("") }} />
                                <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="answer" isRequired isInvalid={answerError}>
                                <FormLabel>{HARDCODED_SECRET_QUESTION}</FormLabel>
                                <Input focusBorderColor="teal.500" type="text" onChange={(e) => { setAnswer(e.target.value); setAnsError("") }} />
                                <FormErrorMessage>{answerError}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="password" isInvalid={passwordError} isRequired>
                                <FormLabel>New Password</FormLabel>
                                <Input  focusBorderColor="teal.500" type="password" onChange={(e) => { setPassword(e.target.value); setPasswordError("") }} />
                                <FormErrorMessage>{passwordError}</FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    bg={"teal.800"}
                                    color={"white"}
                                    _hover={{
                                        bg: "teal.900",
                                    }}
                                    mt={2}
                                    onClick={(e) => { handleSubmit(e) }}
                                >
                                    Reset Password
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Layout>
    );
}

export default ForgetPassword;
