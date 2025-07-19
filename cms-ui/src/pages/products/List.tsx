import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat, imgUrl } from "@/library/functions"
import { ProductData } from "@/library/interfaces"
import { useEffect, useState } from "react"
import { Button, Col, Row} from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"
import { Link } from "react-router-dom"

export const List: React.FC = () => {
    const [products, setProducts] = useState<ProductData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/products')
            .then(({ data }) => setProducts(data))
            .catch(() => {}) 
            .finally(() => setLoading(false))  
    }, [])

    const handleDelete = (id: string) => {
        confirmAlert({
            title:'Confirm Delete',
            message:'Are you sure you want to delete this?',
            buttons: [
                {
                    label:'Yes',
                    className: 'text-bg-danger',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/products/${id}`)
                        .then(() => http.get('/cms/products'))
                        .then(({ data }) => setProducts(data))
                        .catch(() => { }) 
                        .finally(() => setLoading(false))  
                    }
                },
                {
                    label:'No'
                }
            ]
        })
    }

    return loading ? <Loading /> : (
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                   <Col>
                   <h1>Products</h1>
                   </Col>
                   <Col xs="auto">
                   {/* @ts-ignore */}
                   <Button variant="dark" as={Link} to="/products/create">
                   <i className="fa-solid fa-plus me-2"></i>Add Product
                   </Button>
                   </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['Name']} data={products?.map(product => {
                            return {
                                'Name':product.name,
                                'Image':<a href={imgUrl(product.images[0])} target="blank">
                                    <img src={imgUrl(product.images[0])} className="img-sm"/>
                                    </a>,
                                'Category':product.category?.name,
                                'Brand':product.brand?.name,
                                'Price': product.price,
                                'Dis. Price': product.discountedPrice,
                                'Status':product.status ? 'Active' : 'Inactive',
                                'Featured':product.featured ? 'Yes' : 'No',

                                'Created At': dtFormat(product.createdAt),
                                'Updated At': dtFormat(product.updatedAt),
                                'Actions': <>
                                 {/* @ts-ignore */}
                                 <Button variant="dark" size="sm" title="Edit" className="me-2" as={Link} to={`/products/${product._id}`}>
                                        <i className="fa-solid fa-edit"></i>
                                    </Button>
                                    <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(product._id)}>
                                        <i className="fa-solid fa-times "></i>
                                    </Button> 
                                    </>

                            }
                        })}/>
                    </Col>
                </Row>
                <Row>
               
                </Row>
            </Col>
        </Row>
    )
}
