import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/library/functions"
import { UserData } from "@/library/interfaces"
import { useEffect, useState } from "react"
import { Button, Col, Row} from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"
import { Link } from "react-router-dom"

export const List: React.FC = () => {
    const [customers, setCustomers] = useState<UserData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/customers')
            .then(({ data }) => setCustomers(data))
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
                        http.delete(`/cms/customers/${id}`)
                        .then(() => http.get('/cms/customers'))
                        .then(({ data }) => setCustomers(data))
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
                   <h1>Customers</h1>
                   </Col>
                   <Col xs="auto">
                   {/* @ts-ignore */}
                   <Button variant="dark" as={Link} to="/customers/create">
                   <i className="fa-solid fa-plus me-2"></i>Add Customer
                   </Button>
                   </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['Name','Email']} data={customers?.map(customer => {
                            return {
                                'Name':customer.name,
                                'Email':customer.email,
                                'Address':customer.address,
                                'Phone':customer.phone,
                                'Status':customer.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(customer.createdAt),
                                'Updated At': dtFormat(customer.updatedAt),
                                'Actions': <>
                                 {/* @ts-ignore */}
                                 <Button variant="dark" size="sm" title="Edit" className="me-2" as={Link} to={`/customers/${customer._id}`}>
                                        <i className="fa-solid fa-edit"></i>
                                    </Button>
                                    <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(customer._id)}>
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
