import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import toast from 'react-hot-toast'

import { AiOutlineShoppingCart } from "react-icons/ai";

function ProductCard({ p, setCart, cart }) {
  return (
    <Center py={12} display="inline-block">
      <Box
        role={"group"}
        p={6}
        maxW={"300px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          // height={"20px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(/api/v1/product/product-photo/${p._id})`,
            backgroundImage:`${p.img}`,
            filter: "blur(30px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={200}
            margin="auto"
            objectFit={"cover"}
            // src={image}
            // src={`/api/v1/product/product-photo/${p._id}`}
            src={p.img}
          />
        </Box>
        <Stack pt={3}>
          {/* <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {p.category}
          </Text> */}
          <Heading
            // textAlign="center"
            fontSize={"1xl"}
            fontFamily={"body"}
            fontWeight={500}
          >
            <>
              <Tooltip label={p.name}>{p.name.substr(0, 80) + "..."}</Tooltip>
            </>
          </Heading>
          <Stack
            width="full"
            justifyContent="space-between"
            direction={"row"}
            align={"center"}
          >
            <Text fontWeight={800} fontSize={"xl"}>
              ₹{p.price}
            </Text>
            <IconButton
             onClick={() => {
              setCart([...cart, p]);
              localStorage.setItem("cart", JSON.stringify([...cart, p]));
              toast.success("Item Added to cart");
            }}
              bg="teal"
              _hover={{ bg: "teal.700" }}
              color="white"
              icon={<AiOutlineShoppingCart />}
            />
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export default ProductCard;
