//components
import { Pagination } from "../pagination"
import { Navbar } from "../navbar"
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