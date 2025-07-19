import { ProductData } from "@/library/interfaces"
import { ProductCard } from "./ProductCard"

export const ProductSection: React.FC<{products: ProductData[], title: string, sm?:boolean}> = ({products, title, sm= false}) => {
    return <div className="col-12">
    <div className="row">
      <div className="col-12 py-3">
        <div className="row">
          <div className="col-12 text-center text-uppercase">
            <h2>{title}</h2>
          </div>
        </div>
        <div className={`row${sm && 'row-cols-xl-6'} row-cols-lg-4 row-cols-sm-2 justify-content-center`}>

            {products.map(product => <ProductCard product={product} key={product._id}/>)}


        </div>
      </div>
    </div>
  </div>
}