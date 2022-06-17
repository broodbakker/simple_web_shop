import {
  Box,
  Button,
  useColorModeValue,
  Stack,
  SimpleGrid,
  Text,
  Image, Heading
} from '@chakra-ui/react';


//typescript
import { IProductCart } from "../typescript"
//hooks
import { CartActions } from "use-shopping-cart"
import { usePayment } from "../util/hooks/usePayment"

interface IProduct {
  product: IProductCart
}


const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';



const Product = ({ product }: IProduct) => {
  const { clearCart, addItem, loadCart, status, handleCheckout, cartDetails } = usePayment()

  return <ProductView product={product} addItem={addItem} />
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




export default Product