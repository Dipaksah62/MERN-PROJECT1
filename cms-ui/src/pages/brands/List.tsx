import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/library/functions"
import { UserData } from "@/library/interfaces"
import { useEffect, useState } from "react"
import { Button, Col, Row} from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"
import { Link } from "react-router-dom"

export const List: React.FC = () => {
    const [brands, setBrands] = useState<UserData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/brands')
            .then(({ data }) => setBrands(data))
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
                        http.delete(`/cms/brands/${id}`)
                        .then(() => http.get('/cms/brands'))
                        .then(({ data }) => setBrands(data))
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
                   <h1>Brands</h1>
                   </Col>
                   <Col xs="auto">
                   {/* @ts-ignore */}
                   <Button variant="dark" as={Link} to="/brands/create">
                   <i className="fa-solid fa-plus me-2"></i>Add Brand
                   </Button>
                   </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['Name']} data={brands?.map(brand => {
                            return {
                                'Name':brand.name,
                                'Status':brand.status ? 'Active' : 'Inactive',
                                'Created At': dtFormat(brand.createdAt),
                                'Updated At': dtFormat(brand.updatedAt),
                                'Actions': <>
                                 {/* @ts-ignore */}
                                 <Button variant="dark" size="sm" title="Edit" className="me-2" as={Link} to={`/brands/${brand._id}`}>
                                        <i className="fa-solid fa-edit"></i>
                                    </Button>
                                    <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(brand._id)}>
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
