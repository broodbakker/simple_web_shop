import netlifyIdentity from "netlify-identity-widget"

export interface IProduct {
  date: string
  name: string
  id: string
  description: string
  price: number
  category: string
  image: string[]
  currency: string
}

export interface IProductCart {
  name: string
  id: string
  price: number
  image: string
  currency: string
  description: string
  category: string
}

export interface IAuthContext {
  user: null | netlifyIdentity.User,
  login: () => void,
  logout: () => void,
  authReady: boolean
}