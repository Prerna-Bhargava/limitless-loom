import React, { useState } from "react";
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
  Tooltip,
  chakra,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { TriangleDownIcon, TriangleUpIcon, SearchIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";

const productsData = [
  {
    image: "https://bit.ly/3YuRSIU",
    title: `APPLE iPhone 13 (Starlight, 128 GB)`,
    category: "Phone",
    id: "1",
  },
  {
    image: "https://bit.ly/3IQJKN6",
    title: `APPLE iPhone 13 (Midnight, 128 GB)`,
    category: "Phone",
    id: "2",
  },
  {
    image: "https://bit.ly/3IVH54Z",
    title: `RedmiBook Pro Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11
Home) Thin and Light Laptop (15.6 inch, Charcoal Gray, 1.8
kg, With MS Office)`,
    category: "Laptop",
    id: "3",
  },
  {
    image: "https://bit.ly/3JlhJPd",
    title: `ASUS TUF Gaming F15 Core i5 10th Gen - (8 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce GTX 1650/144 Hz) FX506LHB-HN358W Gaming Laptop  (15.6 inch, Black Plastic, 2.30 kg)`,
    category: "Laptop",
    id: "4",
  },
  {
    image: "https://bit.ly/3ZxsJig",
    title: `Realme Pad Mini 3 GB RAM 32 GB ROM 8.7 inch with Wi-Fi+4G Tablet (Grey)`,
    category: "Tablet",
    id: "5",
  },
];

function Products() {
  const [products, setProducts] = useState(productsData);

  let data = products;

  const requestSearch = (searchedVal) => {
    const filteredRows = productsData.filter((row) => {
      const productTitle = row.title ? row.title.toLowerCase() : null;
      return productTitle.includes(searchedVal.toLowerCase());
    });
    setProducts(filteredRows);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: (props) => (
          <img
            src={props.row.original.image}
            width="50px"
            alt="product_image"
          />
        ),
        disableSortBy: true,
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: (props) => (
          <>
            <Tooltip label={props.row.original.title}>
              {props.row.original.title.substr(0, 40)}
            </Tooltip>
            ...
          </>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "View",
        Cell: (props) => (
          <Button colorScheme="teal" size="xs">
            Edit Info
          </Button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <AdminMenu>
      <Box>
        <Text mb={4} fontSize="2xl">
          All Products List
        </Text>
        <Stack
          gap={1}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <InputGroup maxW="350px">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              focusBorderColor="teal.500"
              type="text"
              placeholder="Search Product"
              onChange={(e) => requestSearch(e.target.value)}
            />
          </InputGroup>

          <TableContainer>
            <Table {...getTableProps()}>
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <chakra.span pl="4">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )
                          ) : null}
                        </chakra.span>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td>{cell.render("Cell")}</Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </AdminMenu>
  );
}

export default Products;

// function DataTable() {
//   const data = React.useMemo(
//     () => [
//       {
//         image: "https://bit.ly/3YuRSIU",
//         title: `APPLE iPhone 13 (Starlight, 128 GB)`,
//         category: "Phone",
//         id: "1",
//       },
//       {
//         image: "https://bit.ly/3IQJKN6",
//         title: `APPLE iPhone 13 (Midnight, 128 GB)`,
//         category: "Phone",
//         id: "2",
//       },
//       {
//         image: "https://bit.ly/3IVH54Z",
//         title: `RedmiBook Pro Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11
//     Home) Thin and Light Laptop (15.6 inch, Charcoal Gray, 1.8
//     kg, With MS Office)`,
//         category: "Laptop",
//         id: "3",
//       },
//       {
//         image: "https://bit.ly/3JlhJPd",
//         title: `ASUS TUF Gaming F15 Core i5 10th Gen - (8 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce GTX 1650/144 Hz) FX506LHB-HN358W Gaming Laptop  (15.6 inch, Black Plastic, 2.30 kg)`,
//         category: "Laptop",
//         id: "4",
//       },
//     ],
//     []
//   );

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Image",
//         accessor: "image",
//         Cell: (props) => (
//           <img
//             src={props.row.original.image}
//             width="50px"
//             alt="product_image"
//           />
//         ),
//         disableSortBy: true,
//       },
//       {
//         Header: "Title",
//         accessor: "title",
//       },
//       {
//         Header: "Category",
//         accessor: "category",
//       },
//       {
//         Header: "View",
//         Cell: (props) => (
//           <Button colorScheme="teal" size="xs">
//             View Product
//           </Button>
//         ),
//       },
//     ],
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data }, useSortBy);

//   return (
//     <Table {...getTableProps()}>
//       <Thead>
//         {headerGroups.map((headerGroup) => (
//           <Tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                 {column.render("Header")}
//                 <chakra.span pl="4">
//                   {column.isSorted ? (
//                     column.isSortedDesc ? (
//                       <TriangleDownIcon aria-label="sorted descending" />
//                     ) : (
//                       <TriangleUpIcon aria-label="sorted ascending" />
//                     )
//                   ) : null}
//                 </chakra.span>
//               </Th>
//             ))}
//           </Tr>
//         ))}
//       </Thead>
//       <Tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row);
//           console.log(row.cells);
//           return (
//             <Tr {...row.getRowProps()}>
//               {row.cells.map((cell) => (
//                 <Td>
//                   {cell.render("Cell")}
//                   {/* <img src="WEwe2" alt={cell.column.Header} /> */}
//                   {/* <span>{cell.column.Header}</span> */}
//                 </Td>
//               ))}
//             </Tr>
//           );
//         })}
//       </Tbody>
//     </Table>
//   );
// }
