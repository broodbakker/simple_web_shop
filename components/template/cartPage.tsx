//components
import { Navbar } from "../navbar"
import Footer from "../footer"
import { Cart } from "../cart"
//style
import {
  Image, HStack, Heading, Text, Grid, GridItem, SimpleGrid, Box, AspectRatio
} from '@chakra-ui/react';

interface ICart {
}

const CartPage = () => {
  return (
    <div>
      <Navbar />

      <Main />

      <Footer />
    </div>
  )

}

const Main = () => {
  return (
    <Cart />
  )
}




export default CartPage