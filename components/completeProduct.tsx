import { useState, useEffect, Dispatch, SetStateAction } from "react"
//typescript
import { IProductCart } from "../typescript"
//function
import { formatPrice } from "../util/function"
//hooks
import { usePayment } from "../util/hooks/usePayment"

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue, HStack, Input,
  Box, useNumberInput,
  AspectRatio
} from '@chakra-ui/react';

interface ICompleteProduct {
  product: IProductCart
}

interface IHookUsage {
  setAmount: any
}

function HookUsage({ setAmount }: IHookUsage) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 20,
      precision: 0,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => {


    const value = input["aria-valuetext"] as string


    setAmount(parseInt(value))

  }, [input, setAmount]);

  return (
    <HStack maxW='320px'>
      <Button {...inc}>+</Button>=
      <Input {...input} w="4rem" size="lg" />
      <Button {...dec}>-</Button>
    </HStack>
  )
}

const CompleteProduct = ({ product }: ICompleteProduct) => {
  const { addItem, cartCount, cart } = usePayment()

  const [amount, setAmount] = useState(1)
  const [addedProduct, setHasAddedProduct] = useState({ quantity: 0, hasAdded: false })

  const handleClick = () => {
    cart.addItem(product)
    cart.setItemQuantity(product.id, amount)
    setHasAddedProduct({ quantity: amount, hasAdded: true })
  }


  useEffect(() => {
    if (addedProduct.hasAdded) {
      setInterval(() => {
        setHasAddedProduct({ quantity: 0, hasAdded: false })
      }, 10000);
    }

  }, [addedProduct.hasAdded]);

  return (<CompleteProductView product={product} handleClick={handleClick} setAmount={setAmount} addedProduct={addedProduct} />)
}


interface ICompleteProductView extends ICompleteProduct {
  setAmount: Dispatch<SetStateAction<number>>
  handleClick: () => void
  addedProduct: {
    quantity: number
    hasAdded: boolean
  }
}



const CompleteProductView = ({ product, setAmount, handleClick, addedProduct }: ICompleteProductView) => {
  return (
    <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }} mt="10" >
      <Flex flex={1}>
        <Test></Test>
      </Flex>
      <Flex p={[0, 4, 8]} flex={1} align={'center'} justify={'center'} >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '3xl', lg: '4xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'purple.400',
                zIndex: -1,

              }}>
              {product.name}
            </Text>

          </Heading>
          <Text mt={0} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            {product.description}
          </Text>

          <Text fontSize={{ base: 'lg', lg: 'xl' }} fontWeight="bold" color={'gray.800'}>
            {formatPrice(product.price)}
          </Text>

          {!addedProduct.hasAdded &&
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <HookUsage setAmount={setAmount} />
              <Button
                onClick={handleClick}
                colorScheme="purple"
                fontSize="sm"
                fontWeight="bold"
                color="white"
                size="lg"
                px={2}
                py={1}
                rounded="lg"
                textTransform="uppercase"

                _focus={{
                  bg: "purple.700",
                  _dark: {
                    bg: "purple.600",
                  },
                  outline: "none",
                }}
              >
                Leg in mandje
              </Button>
            </Stack>}

          {addedProduct.hasAdded &&
            <Box border='1px' borderColor='purple.600' borderRadius="2" bg="purple.50" p="2">
              <Heading as='h2' size='md' mb="2">De producten liggen nu in uw mandje</Heading>
              <p>aantal: {addedProduct.quantity}</p>
              <p> totale prijs: {formatPrice(addedProduct.quantity * product.price)}</p>
            </Box>}

        </Stack>
      </Flex>


    </Stack>
  );
}

const Test = () => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };
  const slides = [
    {
      img: "https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      img: "https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      img: "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    },
    {
      img: "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      img: "https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  return (
    <Flex
      w="full"

      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex w="full" {...carouselStyle}>

          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
              />
            </Box>
          ))}
        </Flex>


      </Flex>
    </Flex>
  );
};

export default CompleteProduct