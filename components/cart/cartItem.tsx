import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { CartProductMeta } from './cartProductMeta'

type CartItemProps = {
  isGiftWrapping?: boolean
  name: string
  description: string
  quantity: number
  price: number
  currency: string
  image: string
  formattedValue: string
  id: string
  onChangeQuantity?: (quantity: number) => void
  onClickGiftWrapping?: () => void
  onClickDelete?: () => void
  setItemQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
}

const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </Select>
  )
}

export const CartItem = (props: CartItemProps) => {
  const {
    isGiftWrapping,
    name,
    description,
    quantity,
    image,
    id,
    formattedValue,
    setItemQuantity,
    removeItem
  } = props

  console.log('quantity', quantity)
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <CartProductMeta
        name={name}
        description={description}
        image={image}
        isGiftWrapping={isGiftWrapping}
      />
      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            setItemQuantity(id, parseInt(e.target.value, 10))
          }}
        />
        {formattedValue}
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={() => removeItem(id)} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            setItemQuantity(id, parseInt(e.target.value, 10))
          }}
        />
        {formattedValue}
      </Flex>
    </Flex>
  )
}