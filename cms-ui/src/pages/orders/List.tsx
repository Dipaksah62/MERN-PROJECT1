import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/library/functions"
import { OrderData} from "@/library/interfaces"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row} from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"


export const List: React.FC = () => {
    const [orders, setOrders] = useState<OrderData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/orders')
            .then(({ data }) => setOrders(data))
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
                        http.delete(`/cms/orders/${id}`)
                        .then(() => http.get('/cms/orders'))
                        .then(({ data }) => setOrders(data))
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

    const handleUpdate = (id: string, status: string) => {
        setLoading(true)
        http.patch(`/cms/orders/${id}`,{status})
        .then(() => http.get('/cms/orders'))
        .then(({data}) => setOrders(data))
        .catch(() => {})
        .finally(() => setLoading(false))
    }

    return loading ? <Loading /> : (
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                   <Col>
                   <h1>Orders</h1>
                   </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['Name']} data={orders?.map(order => {
                            return {
                                'Details':<ul>
                                    {order.details.map(detail => <li key={detail._id}>
                                        {detail.qty} x {detail.product.name} @ {detail.price} = {detail.total}
                                    </li>)}
                                </ul>,
                                'Status':<Form.Select value={order.status} onChange={({target}) => handleUpdate(order._id,
                                target.value)}>
                                    <option value="Processing">Processing</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Shipping">Shipping</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                    </Form.Select>,
                                'User' : order.user.name,
                                'Created At': dtFormat(order.createdAt),
                                'Updated At': dtFormat(order.updatedAt),
                                'Actions': <>
                                    <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(order._id)}>
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
