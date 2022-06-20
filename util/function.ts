//typescript
import { IProduct, IProductCart } from "../typescript"

export const ConvertProductDataForCart = ({ name, id, price, image, currency, description }: IProduct): IProductCart => ({
  name,
  id,
  price,
  description,
  currency,
  image: image[0],
})
