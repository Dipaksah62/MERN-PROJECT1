import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-toastify/ReactToastify.css'
import "./Layout.css"
import { UserType } from '@/library/types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fromStorage, removeStorage } from '@/library/functions'
import http from '@/http'
import { clearUser, setUser } from '@/store'
import { Loading } from './Loading'
import { Link, Outlet } from 'react-router-dom'
import { CartItem, CategoryBrandData } from '@/library/interfaces'
import { Button, NavDropdown } from 'react-bootstrap'

export const Layout: React.FC = () => {
    const user: UserType = useSelector((state: any) => state.user.value)
    const cart: CartItem = useSelector((state: any) => state.cart.value)

    const [categories, setCategories] = useState<CategoryBrandData[]>([])
    const [brands, setBrands] = useState<CategoryBrandData[]>([])
    const [loading, setLoading] = useState<boolean>(true) 
    const [totalQty, setTotalQty] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        Promise.all([
            http.get('/categories'),
            http.get('/brands')
        ])
        .then(([{data: cData},{data: bData}]) => {
            setCategories(cData)
            setBrands(bData)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setLoading(true)

        if(!user) {
            const token = fromStorage('mernftoken')

            if(token) {
                http.get('/profile/show')
                .then(({data}) =>{
                    dispatch(setUser(data))

                })
                .catch(() => {
                    removeStorage('mernftoken')
                })
                .finally(() => setLoading(false))
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }

    },[user])

    useEffect(() => {
        if(Object.keys(cart).length > 0) {
            let tq = 0, tp = 0
            
            for(let id in cart) {
                tq += cart[id].qty

                const product = cart[id].Product
                const price = product.discountedPrice > 0 ? product.discountedPrice : product.price
                
                tp += price * cart[id].qty
            }
            setTotalQty(tq)
            setTotalPrice(tp)
        } else {
            setTotalQty(0)
            setTotalPrice(0)
        }
    },[cart])

     const handleLogout = () => {
            removeStorage('mernftoken')
            dispatch(clearUser())
    
        }
    

    return loading ? <Loading/> : <>
       <div className="container-fluid">

<div className="row min-vh-100">
    <div className="col-12">
        <header className="row">
            <div className="col-12 bg-dark py-2 d-md-block d-none">
                <div className="row">
                    <div className="col-auto me-auto">
                        <ul className="top-nav">
                            <li>
                                <a href="tel:+123-456-7890"><i className="fa fa-phone-square me-2"></i>+123-456-7890</a>
                            </li>
                            <li>
                                <a href="mailto:mail@ecom.com"><i className="fa fa-envelope me-2"></i>mail@ecom.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-auto">
                        {user ? <ul className="top-nav">
                            <li><a href=""><i className="fa-solid fa-user-circle me-2"></i>{user.name}
                            </a></li>
                            <Button variant='link' size="sm" className="link-light text-decoration-none" onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                            </Button>
                        </ul> : <ul className="top-nav">
                            <li>
                                <Link to="/register"><i className="fas fa-user-edit me-2"></i>Register</Link>
                            </li>
                            <li>
                                <Link to="/login"><i className="fas fa-sign-in-alt me-2"></i>Login</Link>
                            </li>
                        </ul>}
                    </div>
                </div>
            </div>

            <div className="col-12 bg-white pt-4">
                <div className="row">
                    <div className="col-lg-auto">
                        <div className="site-logo text-center text-lg-left">
                            <Link to="/">MERN PROJECT</Link>
                        </div>
                    </div>
                    <div className="col-lg-5 mx-auto mt-4 mt-lg-0">
                        <form action="#">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="search" className="form-control border-dark" placeholder="Search..." required />
                                    <button className="btn btn-outline-dark"><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-auto text-center text-lg-left header-item-holder">
                        <a href="#" className="header-item">
                            <i className="fas fa-heart me-2"></i><span id="header-favorite">0</span>
                        </a>
                        <a href="cart.html" className="header-item">
                            <i className="fas fa-shopping-bag me-2"></i><span id="header-qty" className="me-3">{totalQty}</span>
                            <i className="fas fa-money-bill-wave me-2"></i><span id="header-price">Rs.{totalPrice}</span>
                        </a>
                    </div>
                </div>

                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-light bg-white col-12">
                        <button className="navbar-toggler d-lg-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mainNav">
                            <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                              <NavDropdown title="Categories">
                                  {categories.map(category => <Link to={`/category/${category._id}`} key= 
                                  {category._id} className="dropdown-item">{category.name}</Link>)}
                              </NavDropdown>

                              <NavDropdown title="Brands">
                                  {brands.map(brand => <Link to={`/brand/${brand._id}`} key= {brand._id}
                                   className="dropdown-item">{brand.name}</Link>)}
                              </NavDropdown>
                            </ul>
                        </div>
                    </nav>
                </div>

            </div>

        </header>
    </div>
    <Outlet/>

    <div className="col-12 align-self-end">
        <footer className="row">
            <div className="col-12 bg-dark text-white pb-3 pt-5">
                <div className="row">
                    <div className="col-lg-2 col-sm-4 text-center text-sm-left mb-sm-0 mb-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer-logo">
                                    <a href="index.html">E-Commerce</a>
                                </div>
                            </div>
                            <div className="col-12">
                                <address>
                                    221B Baker Street<br />
                                    London, England
                                </address>
                            </div>
                            <div className="col-12">
                                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-pinterest-p"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-8 text-center text-sm-left mb-sm-0 mb-3">
                        <div className="row">
                            <div className="col-12 text-uppercase">
                                <h4>Who are we?</h4>
                            </div>
                            <div className="col-12 text-justify">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet vel ligula vel sodales. Aenean vel ullamcorper purus, ac pharetra arcu. Nam enim velit, ultricies eu orci nec, aliquam efficitur sem. Quisque in sapien a sem vestibulum volutpat at eu nibh. Suspendisse eget est metus. Maecenas mollis quis nisl ac malesuada. Donec gravida tortor massa, vitae semper leo sagittis a. Donec augue turpis, rutrum vitae augue ut, venenatis auctor nulla. Sed posuere at erat in consequat. Nunc congue justo ut ante sodales, bibendum blandit augue finibus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-3 col-5 ms-lg-auto ms-sm-0 ms-auto mb-sm-0 mb-3">
                        <div className="row">
                            <div className="col-12 text-uppercase">
                                <h4>Quick Links</h4>
                            </div>
                            <div className="col-12">
                                <ul className="footer-nav">
                                    <li>
                                        <a href="#">Home</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href="#">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms & Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1 col-sm-2 col-4 me-auto mb-sm-0 mb-3">
                        <div className="row">
                            <div className="col-12 text-uppercase text-underline">
                                <h4>Help</h4>
                            </div>
                            <div className="col-12">
                                <ul className="footer-nav">
                                    <li>
                                        <a href="#">FAQs</a>
                                    </li>
                                    <li>
                                        <a href="#">Shipping</a>
                                    </li>
                                    <li>
                                        <a href="#">Returns</a>
                                    </li>
                                    <li>
                                        <a href="#">Track Order</a>
                                    </li>
                                    <li>
                                        <a href="#">Report Fraud</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 text-center text-sm-left">
                        <div className="row">
                            <div className="col-12 text-uppercase">
                                <h4>Newsletter</h4>
                            </div>
                            <div className="col-12">
                                <form action="#">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Enter your email..." required /> 
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-outline-light text-uppercase">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>

</div>
    </>
}