import { imgUrl } from "@/library/functions"
import { ProductData } from "@/library/interfaces"
import { Link } from "react-router-dom"
import { AddToCart } from "./AddToCard"

export const ProductCard: React.FC<{product: ProductData}> = ({product}) => {
    return    <div className="col my-3">
    <div className="col-12 bg-white text-center h-100 product-item">
      <div className="row h-100">
        <div className="col-12 p-0 mb-3">
          <Link to={`/product/${product._id}`}>
            <img src={imgUrl(product.images[0])} className="img-fluid"/>
          </Link>
        </div>
        <div className="col-12 mb-3">
          <Link to={`/product/${product._id}`} className="product-name">{product.name}</Link>
        </div>
        <div className="col-12 mb-3">
            {product.discountedPrice > 0 ? <>
                <span className="product-price-old">
                    Rs.{product.price}
                </span>
            <br />
          <span className="product-price">
             Rs.{product.discountedPrice}
          </span>
          </> :  <span className="product-price">
            Rs.{product.price}
          </span>}
        </div>
        <div className="col-12 mb-3 align-self-end">
         <AddToCart product={product}/>
        </div>
      </div>
    </div>
  </div>
}