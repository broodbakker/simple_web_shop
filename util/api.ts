import netlifyIdentity from "netlify-identity-widget"
const axios = require("axios")

export const fetchPayment = (data: any[]) => fetch("/.netlify/functions/stripe", {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    Authorization: `Bearer ${process.env.STRIPE_SECRET}`
  }
}).then((response) => {
  return response.json();
})

// export const fetchProducts = () => fetch('/.netlify/functions/get-products')
//   .then((res) => res.json())

export const FetchUser = (user: null | netlifyIdentity.User) => fetch("/.netlify/functions/user", {
  headers: {
    Authorization: `Bearer ${user?.token?.access_token}`
  }
}).then(res => {
  return res
})
