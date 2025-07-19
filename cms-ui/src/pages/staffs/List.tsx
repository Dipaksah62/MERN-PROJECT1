import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/library/functions"
import { UserData } from "@/library/interfaces"
import { useEffect, useState } from "react"
import { Button, Col, Row} from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"
import { Link } from "react-router-dom"

export const List: React.FC = () => {
    const [staffs, setStaffs] = useState<UserData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/staffs')
            .then(({ data }) => setStaffs(data))
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
                        http.delete(`/cms/staffs/${id}`)
                        .then(() => http.get('/cms/staffs'))
                        .then(({ data }) => setStaffs(data))
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
                   <h1>Staffs</h1>
                   </Col>
                   <Col xs="auto">
                   {/* @ts-ignore */}
                   <Button variant="dark" as={Link} to="/staffs/create">
                   <i className="fa-solid fa-plus me-2"></i>Add Staff
                   </Button>
                   </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['Name','Email']} data={staffs?.map(staff => {
                            return {
                                'Name':staff.name,
                                'Email':staff.email,
                                'Phone':staff.phone,
                                'Address':staff.address,
                                'Status':staff.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(staff.createdAt),
                                'Updated At': dtFormat(staff.updatedAt),
                                'Actions': <>
                                 {/* @ts-ignore */}
                                 <Button variant="dark" size="sm" title="Edit" className="me-2" as={Link} to={`/staffs/${staff._id}`}>
                                        <i className="fa-solid fa-edit"></i>
                                    </Button>
                                    <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(staff._id)}>
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
