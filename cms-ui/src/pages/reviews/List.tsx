import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/library/functions"
import { ReviewData } from "@/library/interfaces"
import { useEffect, useState } from "react"
import { Button, Col, Row} from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"


export const List: React.FC = () => {
    const [reviews, setReviews] = useState<ReviewData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/reviews')
            .then(({ data }) => setReviews(data))
            .catch(() => { }) 
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
                        http.delete(`/cms/reviews/${id}`)
                        .then(() => http.get('/cms/reviews'))
                        .then(({ data }) => setReviews(data))
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
                   <h1>Reviews</h1>
                   </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['Name']} data={reviews?.map(review => {
                            return {
                                'User': review.user.name,
                                'Product' : review.product?.name,
                                'Rating' : review.rating,
                                'Comment' : review.comment,
                                'Created At': dtFormat(review.createdAt),
                                'Updated At': dtFormat(review.updatedAt),
                                'Actions': <>
                                    <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(review._id)}>
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
