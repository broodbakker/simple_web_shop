
import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { useShoppingCart } from "use-shopping-cart"


export const usePayment = () => {
  const cart = useShoppingCart()

  const {
    removeItem,
    cartDetails,
    cartCount,
    clearCart,
    formattedTotalPrice,
    redirectToCheckout, addItem, loadCart
  } = cart
  const [state, setState] = useState<{
    status: 'idle' | 'fetching' | 'redirecting'
    error: null | number | Error
  }>({ status: 'idle', error: null })


  const fetch1 = () =>
    fetch('/.netlify/functions/create-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartDetails)
    })
      .then((res) => {
        return res.json()
      })
      .catch((error) => console.log(error))


  async function handleCheckout() {
    const response = await fetch1()

    console.log("response", response)

    const stripe: any = await loadStripe(response.publishableKey);

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

  }


  return { clearCart, addItem, loadCart, status, handleCheckout, cartDetails, cartCount,cart }
}