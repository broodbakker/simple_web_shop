
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require("axios")
const validateCartItems =
  require('use-shopping-cart/utilities').validateCartItems

const fetchProducts = (url) => axios(url, {
  method: 'GET',
}).then((response) => {
  return response.data.products
})

//function
const ConvertProductDataForCart = ({ name, id, price, image, currency, description }) => ({
  name,
  id,
  price,
  description,
  currency,
  image: image[0],
})

exports.handler = async (event) => {

  const url = `${process.env.URL}/content/content.json`

  const data = await fetchProducts(url)

  const inventory = data.map(ConvertProductDataForCart)

  let product
  try {
    product = JSON.parse(event.body)
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Received malformed JSON.',
        error: error.message
      })
    }
  }

  let line_items
  try {
    console.log("line_items", line_items)

    line_items = validateCartItems(inventory, product)

    console.log("line_items", line_items)
  } catch (error) {

    return {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Some of the items in your cart are invalid.',
        error: error.message
      })
    }
  }

  let session
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', "ideal"],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['NL', 'CA']
      },
      mode: 'payment',
      success_url: `${process.env.URL}/success.html`,
      cancel_url: process.env.URL,
      line_items
    })
  } catch (error) {
    console.log("line_itemserror", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'While communicating with Stripe, we encountered an error.',
        error: error.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    })
  }
}