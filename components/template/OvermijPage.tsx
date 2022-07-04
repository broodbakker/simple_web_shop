//components
import { Navbar } from "../navbar"
import Footer from "../footer"
import Features from "../features"
import {Layout} from "../layout"
//style
import {
  Image, HStack, Heading, Text, Grid, GridItem, SimpleGrid, Box, AspectRatio
} from '@chakra-ui/react';

interface IOvermij {
}

const Overmij = () => {
  return (
      <Layout>
      <>
      <Main />
    </>
      </Layout>
  )

}

const Main = () => {
  return (
    <>
      <Box py="5">
        <Heading as="h2" size="xl" textAlign="center" >Lauren van Hofwegen</Heading>
      </Box>

      <HStack spacing='-20px' justify="center" py="8">
        <Image
          borderRadius='4rem'
          boxSize='200px'
          src='./images/horse2.jpg'
          alt='Dan Abramov'
          pos="relative"
          zIndex="0"
          border="1px" borderColor="purple.200"
        />

        <Image
          borderRadius='4rem'
          boxSize='250px'
          src='https://res.cloudinary.com/dta9vptzh/image/upload/v1655718212/lauren/lauren4.jpg'
          alt='Dan Abramov'
          pos="relative"
          zIndex="1"
          border="1px" borderColor="purple.200"
        />

        <Image
          borderRadius='4rem'
          boxSize='200px'
          src='./images/horse1.jpg'
          alt='Dan Abramov'
          pos="relative"
          zIndex="0"
          border="1px" borderColor="purple.200"
        />
      </HStack>
      <Features />

      <Box my="5">
        <Heading as="h2" size="xl" textAlign="center" >Mijn knutsel werkplek</Heading>
      </Box>

      <Box alignItems="center">
        <SimpleGrid columns={[4, null, 6]} spacing='0 ' mx="auto" maxW="1000px">
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
          <AspectRatio maxW='560px' ratio={1}>
            <Image w="full" h="full" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </AspectRatio>
        </SimpleGrid>
      </Box>
    </>
  )
}



export default Overmij