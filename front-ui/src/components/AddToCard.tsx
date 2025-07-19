import { CartItem, ProductData } from "@/library/interfaces"
import { setCart } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"


export const AddToCart: React.FC<{product: ProductData, qty?: number}> = ({product, qty = 1}) => {
    const cart: CartItem = useSelector((state: any) => state.cart.value) 
    // const [totalqty, setTotalQty] = useEffect<CartItem[0]>([null])
    // const [totalprice, setTotalPrice] = useEffect<>()

    const dispatch = useDispatch()

    const addCart = () => {
        const price = product.discountedPrice > 0 ? product.discountedPrice : product.price
        let qt = qty

        if(product._id in cart) {
            qt += cart[product._id].qty
        }

        const total = price * qt

        dispatch(setCart({
            ...cart,
            [product._id]: {
                product,
                price,
                total,
                qty: qt
            }
        }))

        toast.success('Product added in cart')
    }
    return <>
     <button className="btn btn-outline-dark" type="button" onClick={addCart}>
        <i className="fas fa-cart-plus me-2"></i>Add to cart
        </button></>

}