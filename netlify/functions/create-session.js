const stripe = require('stripe')(process.env.STRIPE_SECRET)
const validateCartItems =
  require('use-shopping-cart/utilities').validateCartItems

const isLocalhost = typeof window !== 'undefined' && window.location.host === 'localhost:8888'

const url = isLocalhost ? process.env.URL_DEV : process.env.URL_LIVE



const inventory = require(`${url}/public/content/content.json`)

exports.handler = async (event) => {
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
    line_items = validateCartItems(inventory, product)
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
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA']
      },
      mode: 'payment',
      success_url: `${process.env.URL}/success.html`,
      cancel_url: process.env.URL,
      line_items
    })
  } catch (error) {
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
    body: JSON.stringify({ sessionId: session.id })
  }
}