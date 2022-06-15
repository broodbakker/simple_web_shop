export const fetchPayment = (data: any[]) => fetch("/.netlify/functions/stripe", {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    Authorization: `Bearer ${process.env.STRIPE_SECRET}`
  }
}).then((response) => {
  return response.json();
})


export const fetchProducts = () => fetch('/.netlify/functions/get-products')
  .then((res) => res.json())
