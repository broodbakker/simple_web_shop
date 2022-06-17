import { Cart } from "./cart"

import { MdAddShoppingCart } from "react-icons/md";

import { useState } from "react"
//hooks
import { usePayment } from "../util/hooks/usePayment"

import {
  useDisclosure, Button
  , Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter
} from '@chakra-ui/react';


export const CartModal = () => {
  const { clearCart, addItem, loadCart, status, handleCheckout, cartDetails, cartCount } = usePayment()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState('md')

  const handleSizeClick = (newSize: any) => {
    setSize(newSize)
    onOpen()
  }

  return (
    <>
      <Button leftIcon={<MdAddShoppingCart size="1.5rem" />} onClick={() => handleSizeClick('xl')}
        key={size} colorScheme='teal' variant='solid'>
        : {cartCount} items
      </Button>

      <Modal onClose={onClose} size={size} isOpen={isOpen} motionPreset='none'>
        <ModalOverlay />
        <ModalContent>

          <ModalCloseButton />
          <ModalBody>

            <Cart />


          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Continue shopping</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}