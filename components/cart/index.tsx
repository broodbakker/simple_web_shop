import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

import { CartOrderSummary } from './cartorderSummary'
import { CartItem } from './cartItem'
//hooks
import { usePayment } from "../../util/hooks/usePayment"


export const Cart = () => {
  const { handleCheckout, cart } = usePayment()


  return (<CartView cart={cart} handleCheckout={handleCheckout} />)
}

interface ICartView {
  cart: any
  handleCheckout: () => void
}

const CartView = ({ cart, handleCheckout }: ICartView) => (
  <Box
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack
      direction={{ base: 'column', }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading fontSize="2xl" fontWeight="extrabold">
         { `${cart.cartCount} product in je winkelmandje`}
        </Heading>



        <Stack spacing="6">

          {Object.keys(cart.cartDetails).map((keyName, i) => (
            <CartItem key={i} {...cart.cartDetails[keyName]} setItemQuantity={cart.setItemQuantity} removeItem={cart.removeItem} />
          ))}

        </Stack>
      </Stack>

      <Flex direction="column" align="center" flex="1">
        <CartOrderSummary total={cart.formattedTotalPrice} handleCheckout={handleCheckout} />
      </Flex>
    </Stack>
  </Box>
)