import React from 'react'
//typescript
import { IProduct, IProductCart } from "../typescript"
//data
import inventory from "../public/content/content.json"
//template
import HomePage from "../components/template/homePage"

//function
const ConvertProductDataForCart = ({ name, id, price, image, currency, description }: IProduct): IProductCart => ({
  name,
  id,
  price,
  description,
  currency,
  image: image[0],
})

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