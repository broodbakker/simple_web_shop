//components
import { Pagination } from "../pagination"
import { Products } from "../products"
import { Navbar } from "../navbar"
import { Cart } from "../cart"
//typescript
import { IProductCart } from "../../typescript"

interface IHomePage {
  products: IProductCart[]
}


const HomePage = ({ products }: IHomePage) => {
  return (
    <div>
      <Navbar />
      <Pagination products={products}/>
    </div>
  )

}

export default HomePage