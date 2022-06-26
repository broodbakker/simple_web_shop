//typescript
import { IProduct, IProductCart } from "../typescript"

export const ConvertProductDataForCart = ({ name, id, price, image, currency, description, category }: IProduct): IProductCart => ({
  name,
  id,
  price,
  description,
  currency,
  image: image[0],
  category
})


export const renderWhiteSpace = (item: string) => item === " " ? "\u00A0" : item

export const formatPrice = (price: number) => `${(price / 100).toFixed(2)} €`


export const getProductsByCategory = (products: IProductCart[], category: string) =>
  products.reduce((previousValue: IProductCart[], currentValue) => {
    if (currentValue.category === category) {
      previousValue.push(currentValue);
    }
    return previousValue;
  }, []);