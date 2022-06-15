import { Handler } from "@netlify/functions";
//data
import data from "./data/products.json"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface IPayment {
  name: keyof typeof data
  quantity: number
}

const getProducts = (productsId: IPayment[], data1: any) => productsId.map((productId) => {
  const d = data1[productId.name];

  return { ...d, quantity: productId.quantity }
})

const line_items = (products: {
  quantity: number;
  sku: string;
  name: string;
  description: string;
  images: string;
  amount: number;
  currency: string;
}[]) =>
  products.map((product) => {
    return {
      name: product.name,
      description: product.description,
      amount: product.amount,
      currency: product.currency,
      quantity: product.quantity
    }
  })


const handler: Handler = async (event, context) => {
  const body = event.body as string

  const productsId: IPayment[] = JSON.parse(body)

  const data1 = data

  const products = getProducts(productsId, data1)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', "ideal"],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['NL', 'CA'],
    },
    success_url: `http://localhost:8888/success.html`,
    cancel_url: "http://localhost:8888/",
    line_items: line_items(products)
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
export { handler };
