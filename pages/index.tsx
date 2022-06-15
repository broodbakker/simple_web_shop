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


const FetchUser = (user: null | netlifyIdentity.User) => fetch("/.netlify/functions/user", {
  headers: {
    Authorization: `Bearer ${user?.token?.access_token}`
  }
})
  .then(res => {
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

const Home = () => {
  const {
    authReady,
    user,
    login,
    logout,
  } = useAuth();

  const { products, error } = useLoadProducts();

  const { handlePayment, paymentError } = usePayment()

  return (
    <div>
      {/* {products && products.map((val, index: number) => <ProductAddToCart key={index} />)} */}

      {error && <div>error</div>}

      {authReady &&
        <>
          {!user && <button onClick={login}>login</button>}
          {user && <button onClick={logout}>logout</button>}
          <h2> {`Welcome ${user ? user.email : "guest"}`}</h2>
        </>
      }

      <button onClick={handlePayment}> send payment</button>

    </div>
  )
}



export default Home