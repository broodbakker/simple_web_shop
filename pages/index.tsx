import React from 'react'
//api
import { DebugCart } from "use-shopping-cart"
//typescript
import { IProduct, IProductCart } from "../typescript"
//hooks
import { useAuth } from "../util/hooks/useAuth"
import { usePayment } from "../util/hooks/usePayment"
//data
import inventory from "../public/content/content.json"
//template
import HomePage from "../components/template/homePage"


const productDataTest =
  [
    {
      "name": "Sunglasses",
      "id": "price_1GwzfVCNNrtKkPVCh2MVxRkO",
      "price": 1500,
      "image": "https://files.stripe.com/links/fl_test_FR8EZTS7UDXE0uljMfT7hwmH",
      "currency": "EUR",
      "description": "A pair of average black sunglasses."
    },
    {
      "name": "3 Stripe Streak Scoop Neck Flowy T-Shirt",
      "id": "price_OkRxVM2hCVPkKtrNNCVfzwG1",
      "price": 3000,
      "image": "https://static.musictoday.com/store/bands/4806/product_600/5QCTBL052.jpg",
      "description": "A black scoop neck flowy t-shirt with 3 bright yellow strips behind the words Black Lives Matter.",
      "currency": "EUR"
    }
  ]

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
  const {
    authReady,
    user,
    login,
    logout,
  } = useAuth();

  const { clearCart, addItem, loadCart, status, handleCheckout, cartDetails } = usePayment()

  const products = inventory.products.map(ConvertProductDataForCart)

  return (
    <div>
      {/* 1
      <DebugCart></DebugCart>
      2


      {authReady &&
        <>
          {!user && <button onClick={login}>login</button>}
          {user && <button onClick={logout}>logout</button>}
          <h2> {`Welcome ${user ? user.email : "guest"}`}</h2>
        </>
      }

      <div>{status}</div>

      <button onClick={handleCheckout}>hanlde payment </button>

      <button onClick={() => clearCart()}>clear cart</button>

      <button onClick={() => addItem((products[0]))}> add product 1</button>

      <button onClick={() => addItem((products[1]))}> add product 2</button>addItem */}

      <HomePage products={products}/>

    </div>
  )
}



export default Home