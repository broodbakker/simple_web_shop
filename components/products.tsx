import Product from "./product"
//typescript
import { IProduct, IProductCart } from "../typescript"

import {
  SimpleGrid
} from '@chakra-ui/react';

interface IProducts {
  products: IProductCart[]
}

export const Products = ({ products }: IProducts) => {
  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing={10} mt="10">
        {products.map((product,key) =>  <Product product={product} key={key}/> )}

      </SimpleGrid>
    </>
  )
}