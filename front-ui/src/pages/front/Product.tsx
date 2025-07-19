import { Loading, ProductSection } from "@/components"
import http from "@/http"
import { dtFromNow, imgUrl } from "@/library/functions"
import { ProductData, ReviewFormData } from "@/library/interfaces"
import { UserType } from "@/library/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

export const Product: React.FC = () => {
    const user : UserType = useSelector((state:any) =>state.user.value)

    const [product, setProduct] = useState<ProductData|null>(null)
    const [similar, setSimilar] = useState<ProductData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [imgBig, setImgBig] = useState<string>('')
    const [reviewData, setReviewData] = useState<ReviewFormData>({comment: '', rating: 1})
    const [avgRating, setAvgRating] = useState<number>(0)
    const [starRatings, setStarRatigs] = useState<any>({1: 0, 2: 0, 3: 0, 4: 0, 5: 0})

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get(`/products/${params.id}`),
            http.get(`/products/${params.id}/similar`),
        ])
        .then(([{data:pData}, {data: sData }]) => {
            setProduct(pData)
            setSimilar(sData)
            setImgBig(imgUrl(pData?.images[0] || ''))
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    },[params.id])

    useEffect(() => {
        if((product?.reviews?.length || 0 ) > 0) {
            let sum: number = 0
            let stars:any = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}

            for(let review of product!.reviews!){
                sum += review.rating
                stars[review.rating] += 1
            }

            for(let n in stars) {
                stars[n] = stars[n] / product!.reviews!.length * 100
            }

            setAvgRating(sum / product!.reviews!.length)
            setStarRatigs(stars)
        } else {
            setAvgRating(0)
            setStarRatigs({1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
        }
    },[product?.reviews])

    const handleSubimt = (event: any) => {
        event.preventDefault()

        setLoading(true)

        http.post(`/products/${params.id}/review`, reviewData)
        .then(() =>  http.get(`/products/${params.id}`))
        .then(({data}) =>{
            setProduct(data)
            setReviewData({comment: '', rating: 1})
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
    
    return loading ? <Loading /> : <>
                <div className="col-12">
                <main className="row">
                    <div className="col-12 bg-white py-3 my-3">
                        <div className="row">

                            <div className="col-lg-5 col-md-12 mb-3">
                                <div className="col-12 mb-3">
                                    <div className="img-large border" style={{backgroundImage: `url('${imgBig}')` }}></div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                            {product?.images.map((image, i) => <div className="col-sm-2 col-3" key={i} onMouseEnter={() => setImgBig(imgUrl(image))}>
                                                <div className="img-small border"  style={{backgroundImage:`url('${imgUrl(image)}')`
                                            }}></div>
                                            </div>)}
                                        </div>
                                    </div>
                             </div>
                           

                            <div className="col-lg-5 col-md-9">
                                <div className="col-12 product-name large">
                                  {product?.name}
                                    <small>By <Link to={`/brand/${product?.brandId}`}>{product?.brand?.name}</Link></small>
                                </div>
                                <div className="col-12 px-0">
                                    <hr />
                                </div>
                                <div className="col-12">
                                   {product?.summary}
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 text-center">
                                <div className="col-12 sidebar h-100">
                                    <div className="row">
                                        <div className="col-12">
                                            {(product?.discountedPrice || 0 ) > 0 ? <>
                                                <span className="detail-price">
                                                  Rs.{product?.discountedPrice}
                                                </span>
                                            <span className="detail-price-old">
                                             Rs.{product?.price}
                                        </span>
                                            </> :  <span className="detail-price">
                                            Rs.{product?.price}
                                        </span>}
                                        </div>
                                        <div className="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                                            <div className="mb-3">
                                                <label htmlFor="qty">Quantity</label>
                                                <input type="number" id="qty" min="1" value="1" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <button className="btn btn-outline-dark" type="button"><i className="fas fa-cart-plus me-2"></i>Add to cart</button>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <button className="btn btn-outline-secondary btn-sm" type="button"><i className="fas fa-heart me-2"></i>Add to wishlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-12 mb-3 py-3 bg-white text-justify">
                        <div className="row">

                            <div className="col-md-7">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12 text-uppercase">
                                            <h2><u>Details</u></h2>
                                        </div>
                                        <div className="col-12" id="details"> 
                                            {product?.description}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <div className="col-12 px-md-4 sidebar h-100">

                                    <div className="row">
                                        <div className="col-12 mt-md-0 mt-3 text-uppercase">
                                            <h2><u>Ratings & Reviews</u></h2>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-sm-4 text-center">
                                                    <div className="row">
                                                        <div className="col-12 average-rating">
                                                            {avgRating > 0 ? avgRating.toFixed(1) : 0}
                                                        </div>
                                                        <div className="col-12">
                                                            of {product?.reviews?.length || 0} reviews
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <ul className="rating-list mt-3">
                                                      {[5, 4, 3, 2, 1].map((n: number) => <li key={n}>
                                                        <div className="progress">
                                                                <div className="progress-bar bg-dark" role="progressbar" 
                                                                style={{width: `${starRatings[n]}%`}} 
                                                                aria-valuenow={starRatings[n]} aria-valuemin={0} 
                                                                aria-valuemax={100}>
                                                                    {starRatings[n]}%</div>
                                                            </div>
                                                            <div className="rating-progress-label">
                                                                {n}<i className="fas fa-star ms-1"></i>
                                                            </div>
                                                      </li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 px-md-3 px-0">
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <h4>Add Review</h4>
                                        </div>
                                        <div className="col-12">
                                            { user ? <form onSubmit={handleSubimt}>
                                                <div className="mb-3">
                                                    <textarea className="form-control" placeholder="Give your review" 
                                                    value={reviewData.comment} onChange={({target}) => setReviewData({
                                                        ...reviewData,
                                                        comment:target.value
                                                    })}></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="d-flex ratings justify-content-end flex-row-reverse">
                                                      {[5,4,3,2,1].map(n => <>
                                                        <input type="radio" value={n} name="rating" id={`rating-${n}`
                                                        } checked={n == reviewData.rating} onClick={() => setReviewData({
                                                            ...reviewData,
                                                            rating:n,
                                                        })} />
                                                        <label htmlFor={`rating-${n}`}></label>
                                                            </>)}
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <button type="submit"  className="btn btn-outline-dark">Add Review</button>
                                                </div>
                                            </form> : <div className="col-12 text-justify  p-3 mb-3 bg-gray">
                                                Please<Link to="/login"> login </Link>to leave your review.
                                                </div>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 px-md-3 px-0">
                                            <hr />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
  
                                          {(product?.reviews?.length || 0) > 0 ? product?.reviews?.map( review => 
                                            <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray" key={review._id}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <strong className="me-2">{review.user?.name}</strong>
                                                        <small>
                                                            {[1,2,3,4,5].map(n => 
                                                            <i className={`fa-${n <=review.rating ? 'solid' : 'regular'} fa-star`}></i>
                                                            )}
                                                        </small>
                                                    </div>
                                                    <div className="col-12">
                                                      {review.comment}
                                                    </div>
                                                    <div className="col-12">
                                                        <small>
                                                            <i className="fas fa-clock me-2"></i>{dtFromNow(review.createdAt)}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>) : <div className="col-12 text-justify  p-3 mb-3 bg-gray">
                                            No review given yet.</div>}

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                   {similar.length > 0 && <ProductSection title="Similar Products" products={similar}/>}

                </main>
            </div>
            
    </>
}