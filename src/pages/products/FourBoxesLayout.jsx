import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import ProductsBox from "./ProductsBox";

function FourBoxesLayout() {
    // Sample data for the boxes
    const boxes = [
        {
          title: "Decor and Personal care",
          items: [
            { category: "Curtains", src: "https://m.media-amazon.com/images/I/61GEY2yVtbS._AC_SY400_.jpg" },
            { category: "Tissues", src: "https://m.media-amazon.com/images/I/81fPaY3RlJL._AC_SY400_.jpg" },
            { category: "Decor", src: "https://m.media-amazon.com/images/I/81cuXs2VAjL._AC_SY400_.jpg" },
            { category: "More", src: "https://m.media-amazon.com/images/I/71aXzv34N+L._AC_SY400_.jpg" },

          ],
        },
        {
          title: "Computers & Accessories",
          items: [
            { category: "Keyboards", src: "https://tse4.mm.bing.net/th?id=OIP.LNVehPkGbFQ4XdxDUld8xQHaEK&pid=Api&P=0&w=270&h=153" },
            { category: "Mouse", src: "https://tse4.mm.bing.net/th?id=OIP.b6klZc-PzVmiy_TzRji4dAHaHa&pid=Api&P=0&w=300&h=300" },
            { category: "Handsets", src: "https://tse1.mm.bing.net/th?id=OIP.gnvE3lS9LdHXbxmw5R0H3wHaHI&pid=Api&P=0&w=173&h=168" },
            { category: "Laptops", src: "https://tse3.mm.bing.net/th?id=OIP.Y0N1Y1RzntH-Cbvxxh0AkwHaFR&pid=Api&P=0&w=213&h=153" },
          ],
        },
        {
            title: "Top Collections under 500",
            items: [
              { category: "Toys", src: "https://m.media-amazon.com/images/I/81ZB62prn-L._AC_SY400_.jpg" },
              { category: "kids", src: "https://m.media-amazon.com/images/I/91dwoBmSshL._AC_SY400_.jpg" },
              { category: "Decor", src: "https://m.media-amazon.com/images/I/81xiJRmOwUL._AC_SY400_.jpg" },
              { category: "Other", src: "https://m.media-amazon.com/images/I/71jsnkx44xL._AC_SY400_.jpg" },
            ],
          }
        // Add more arrays with titles and items as needed
      ];
      
      

    return (
        <Box p={2} >

            <Grid
                templateColumns={`repeat(auto-fit, minmax(300px, 1fr))`}
                gap={4}
                autoRows="1fr"
            >
                {boxes.map((box,idx) => (

                    <ProductsBox products={boxes[idx]} />
                ))}
            </Grid>
        </Box>
    );
}

export default FourBoxesLayout;
