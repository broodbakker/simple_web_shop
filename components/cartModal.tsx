import { Cart } from "./cart"

import { useState } from "react"
//hooks
import { usePayment } from "../util/hooks/usePayment"

import {
  useDisclosure, Button
  , Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, chakra, IconButton, Box
} from '@chakra-ui/react';

import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";


interface ICartButton {
  cartCount: number
  handleClick: (newSize: any) => void
}

const CartButton = ({ cartCount, handleClick }: ICartButton) =>
  <IconButton
    aria-label="label"
    size="md"
    isRound
    ml={8}
    bg="purple.50"
    disabled={cartCount === 0}
    onClick={handleClick}
    icon={
      <>
        <AiOutlineShoppingCart />
        <chakra.span
          pos="absolute"
          top="-1px"
          right="-1px"
          px={2}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          lineHeight="none"
          color="red.100"
          transform="translate(50%,-50%)"
          bg="red.600"
          rounded="full"
        >
          {cartCount}
        </chakra.span>
      </>
    }
  />



export const CartModal = () => {
  const { cartCount,cart } = usePayment()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState('md')

  const handleSizeClick = (newSize: any) => {
    setSize(newSize)
    onOpen()
  }


  return (
    <>
      <CartButton cartCount={cartCount as number} handleClick={handleSizeClick} />

      <Modal onClose={onClose} size={size} isOpen={isOpen} motionPreset='none'>
        <ModalOverlay />
        <ModalContent>

          <ModalCloseButton />
          <ModalBody>

            <Cart />

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Ga door met shoppen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}