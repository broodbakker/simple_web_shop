import React from 'react'
//data
import inventory from "../public/content/content.json"
//template
import HomePage from "../components/template/homePage"
//functions
import { ConvertProductDataForCart } from "../util/function"

const Home = () => {
  const i = inventory.products
  const products = i.map(ConvertProductDataForCart)

  return (
    <div>
      <HomePage products={products} />
    </div>
  )
}

export default Home