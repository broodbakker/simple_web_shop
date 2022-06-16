import React, { useContext, useEffect } from 'react'
//context
import { AuthContext } from "../stores/authContext"
import { useState } from 'react';

import netlifyIdentity from "netlify-identity-widget"
//componenents
import ProductAddToCart from "../components/products"
import { loadStripe } from '@stripe/stripe-js';
//api
import { fetchPayment, fetchProducts } from "../util/api"
import StripeError from "stripe"
import { useShoppingCart, DebugCart } from "use-shopping-cart"
//product data
import test from "../public/content/content.json"

const FetchUser = (user: null | netlifyIdentity.User) => fetch("/.netlify/functions/user", {
  headers: {
    Authorization: `Bearer ${user?.token?.access_token}`
  }
}).then(res => {
  return res
})

const useAuth = () => {
  const { user, login, logout, authReady } = useContext(AuthContext)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      FetchUser(user).then(res => {
        if (!res.ok) {
          throw Error('You must be logged in to view this content')
        }
        return res.json()
      })
        .then(data => {
          console.log(data)
          setError(null)
          setData(data)
        })
        .catch(err => {
          console.log(err.message)
          setError(err.message)
          setData(null)
        })
    }
  }, [user, authReady])

  return {
    authReady,
    user,
    login,
    logout,
  };
}

const useLoadProducts = () => {
  const [products, setProducts] = useState()
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts().then((products) => {
      setProducts(products)
    })
      .catch((err) => setError(err.message));
  }, [])

  return { products, error }
}

interface IPayment {
  name: string,
  quantity: number
}

const usePayment = () => {
  const [data, setData] = useState([{ name: "DEMO001", quantity: 1 }, { name: "DEMO002", quantity: 2 }])

  const [paymentError, setPaymentError] = useState<StripeError | null>(null);

  const handlePayment = async () => {
    const response = await fetchPayment(data)

    const stripe: any = await loadStripe(response.publishableKey);

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    setPaymentError(error)
  }

  return { handlePayment, paymentError }

}

const productData = [
  {
    name: 'Bananas',
    id: 'some_unique_id_1',
    price: 400,
    image: 'https://www.fillmurray.com/300/300',
    currency: 'USD',
    product_data: {
      metadata: {
        type: 'fruit'
      }
    },
    price_data: {
      recurring: {
        interval: 'week'
      }
    }
  },
  {
    name: 'Tangerines',
    id: 'some_unique_id_2',
    price: 100,
    image: 'https://www.fillmurray.com/300/300',
    currency: 'USD',
    product_data: {
      metadata: {
        type: 'fruit'
      }
    },
    price_data: {
      recurring: {
        interval: 'week'
      }
    }
  }
]

const Home = () => {
  const {
    authReady,
    user,
    login,
    logout,
  } = useAuth();

  const { handlePayment, paymentError } = usePayment()

  const { clearCart, addItem, loadCart } = useShoppingCart()



  return (
    <div>
      1
      <DebugCart></DebugCart>
      2
      {test.products && test.products.map((val, index: number) => <ProductAddToCart key={index} />)}

      {authReady &&
        <>
          {!user && <button onClick={login}>login</button>}
          {user && <button onClick={logout}>logout</button>}
          <h2> {`Welcome ${user ? user.email : "guest"}`}</h2>
        </>
      }

      <button onClick={handlePayment}> send payment</button>

      <button onClick={() => clearCart()}>clear cart</button>

      <button onClick={() => addItem(productData[0])}> add product 1</button>

      <button onClick={() => addItem(productData[1])}> add product 2</button>

    </div>
  )
}



export default Home