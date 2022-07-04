//components
import { Products } from "../products"
import { Navbar } from "../navbar"
import { HeroImage } from "../heroImage"
import WatIkMaak from "../watIkMaak"
import Footer from "../footer"
import {Layout} from "../layout"
//typescript
import { IProductCart } from "../../typescript"

import { Grid, GridItem, AspectRatio, Image,Box,Heading } from '@chakra-ui/react'

interface IHomePage {
  products: IProductCart[]
}


const HomePage = ({ products }: IHomePage) => {
  return (
    <Layout>
<>
      <HeroImage />
      <Grid templateColumns='repeat(4, 1fr)' >
        <AspectRatio maxW='400px' ratio={4 / 3}>
          <Image src='https://res.cloudinary.com/dta9vptzh/image/upload/v1655718231/lauren/lauren3.jpg' alt='lauren' objectFit='cover' />
        </AspectRatio>
        <AspectRatio maxW='400px' ratio={4 / 3}>
          <Image src='https://res.cloudinary.com/dta9vptzh/image/upload/v1655718212/lauren/lauren4.jpg' alt='lauren' objectFit='cover' />
        </AspectRatio>
        <AspectRatio maxW='400px' ratio={4 / 3}>
          <Image src='https://res.cloudinary.com/dta9vptzh/image/upload/v1655718206/lauren/lauren5.jpg' alt='lauren' objectFit='cover' />
        </AspectRatio>
        <AspectRatio maxW='400px' ratio={4 / 3}>
          <Image src='https://res.cloudinary.com/dta9vptzh/image/upload/v1655718205/lauren/lauren6.jpg' alt='lauren' objectFit='cover' />
        </AspectRatio>


      </Grid>


      <Box my="12">
      <Box textAlign="center">
      <Heading as='h2' size='lg' lineHeight={1.1}
      fontWeight={600}
      color="blackAlpha.800"
      fontSize={{ base: '3xl', sm: '4xl', lg: '4xl' }}>Spulletjes die ik verkoop 🎁</Heading>
      </Box>
        <Products products={products} />
      </Box>

      <WatIkMaak />
      </>
    </Layout>
  )

}

export default HomePage