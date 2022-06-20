
import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { useShoppingCart } from "use-shopping-cart"

export const usePayment = () => {
  const cart = useShoppingCart()

  const {
    cartDetails,
    cartCount,
    clearCart,
    addItem, loadCart
  } = cart
  const [state, setState] = useState<{
    status: 'idle' | 'fetching' | 'redirecting'
    error: null | number | Error
  }>({ status: 'idle', error: null })

  const fetchProducts = () =>
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
    const response = await fetchProducts()

    const stripe: any = await loadStripe(response.publishableKey);

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

  }


  return { clearCart, addItem, loadCart, status, handleCheckout, cartDetails, cartCount, cart }
}