import {
  Box,
  Button,
  useColorModeValue,
  Stack,
  SimpleGrid,
  Text,
  Image, Heading, Flex
} from '@chakra-ui/react';


//typescript
import { IProductCart } from "../typescript"
//hooks
import { CartActions } from "use-shopping-cart"
import { usePayment } from "../util/hooks/usePayment"
//component
import NModal from "./modal"
//function
import { formatPrice } from "../util/function"

interface IProduct {
  product: IProductCart
}

const Product = ({ product }: IProduct) => {
  const { clearCart, addItem, loadCart, status, handleCheckout, cartDetails, cart } = usePayment()

  return <ProductView2 product={product} addItem={addItem}  />
}

interface IProductView extends IProduct {
  addItem: CartActions["addItem"]

}

const ProductView = ({ product, addItem }: IProductView) => {
  const { image, name, price } = product
  return (
    <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'md'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}>
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 2,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}>
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={image}
          alt={product.name}
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          Brand
        </Text>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {name}
        </Heading>
        <Stack direction={'row'} align={'center'}>
          <Text fontWeight={800} fontSize={'xl'}>
            € {price}
          </Text>
        </Stack>
      </Stack>

      <Button
        onClick={() => addItem(product)}
        w={'full'}
        mt={8}
        bg={useColorModeValue('blackAlpha.800', 'gray.900')}
        color={'white'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'sm',
        }}>
        Add to cart
      </Button>
    </Box>
  );
}


const ProductView2 = ({ product, addItem }: IProductView) => {
  const { image, name, price } = product
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="sm"
      mx="auto"
    >
      <Box
        bg="gray.300"
        h={64}
        w="full"
        rounded="lg"
        shadow="md"
        bgSize="cover"
        bgPos="center"

        pos="relative"
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 2,
          left: 0,
          zIndex: -1,
          backgroundImage: `url(${image})`,
          filter: 'blur(15px)',

        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
        style={{
          backgroundImage:
            `url(${image})`,
        }}
      ></Box>

      <Box
        w={{
          base: 56,
          md: 64,
        }}
        pos="relative"
        mt={-10}
        shadow="lg"
        rounded="lg"
        overflow="hidden"

        _before={{
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 0,
          left: 0,
          bg: "purple.600",
          opacity: 0.75
        }}
      >
        <Heading as='h2' size='md' noOfLines={2} py={2}
          textAlign="center"
          fontWeight="bold"
          textTransform="uppercase"
          color="white"
          letterSpacing={1}
          pos="relative"
          zIndex={1}
        >
          {name}
        </Heading>



        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={2}
          px={3}

        >
          <Text
            fontWeight="bold"
            color="white"
            zIndex={1}
          >
            {formatPrice(price)}
          </Text>

          <NModal product={product}>
            <Button
              bg="gray.700"
              fontSize="xs"
              fontWeight="bold"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: "gray.700",
                _dark: {
                  bg: "gray.600",
                },
              }}
              _focus={{
                bg: "gray.700",
                _dark: {
                  bg: "gray.600",
                },
                outline: "none",
              }}
            >
              Bekijk product
            </Button>
          </NModal>

        </Flex>


      </Box>
    </Flex>
  )
}




export default Product