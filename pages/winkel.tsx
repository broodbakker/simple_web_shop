import React from 'react'
import WinkelPage from "../components/template/winkelPage"
//data
import inventory from "../public/content/products.json"
//functions
import { ConvertProductDataForCart } from "../util/function"

const Winkel = () => {
  const i = inventory.products
  const products = i.map(ConvertProductDataForCart)
  return (
    <div>
      <WinkelPage products={products} category="paarden" />
    </div>
  )
}


export async function getStaticProps() {

  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Winkel