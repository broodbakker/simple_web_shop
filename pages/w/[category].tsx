import React from 'react'
import WinkelPage from "../../components/template/winkelPage"
//data
import inventory from "../../public/content/products.json"
//functions
import { ConvertProductDataForCart, getProductsByCategory } from "../../util/function"
//typescript
import { IProductCart } from "../../typescript"

interface IW {
  products: IProductCart[]
  category: string
}



const W = ({ products, category }: IW) => {
  return (
    <div>
      <WinkelPage products={products} category={category} />
    </div>
  )
}

export async function getStaticPaths() {


  const paths = [
    { params: { category: 'stallen' } },
    {
      params: { category: 'paarden' },
    },
    {
      params: { category: 'dekjes' },
    },
  ]

  return { paths, fallback: false }
}

type Params = {
  params: { category: string }
}

// params will contain the id for each generated page.
export async function getStaticProps({ params: { category } }: Params) {

  const i = inventory.products
  const firstProducts = i.map(ConvertProductDataForCart)

  const products = getProductsByCategory(firstProducts, category)

  return { props: { products, category } }
}

export default W