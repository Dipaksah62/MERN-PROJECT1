import { InputField, Loading, StatusSelect, SubmitBtn } from "@/components"
import http from "@/http"
import { ValidationError } from "@/library/functions"
import { UserFormData } from "@/library/interfaces"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

import * as Yup from "yup"

export const Edit:React.FC = () => {
    const [loading , setLoading] = useState<boolean>(true)

    const {id} = useParams<{id?:string}>()
    const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues:{
            name:'',
            phone:'',
            address:'',
            status:true,

        } as UserFormData,
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
            status: Yup.boolean().required()
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.patch(`/cms/staffs/${id}`, data)
            .then(() => navigate('/staffs'))
            .catch(({response}) => ValidationError(formik,response))
            .finally(() => setSubmitting(false))
            

        }

    })

    useEffect(() => {
        setLoading(true)

        http.get(`/cms/staffs/${id}`)
        .then(({data}) => {
            formik.setValues(data)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading/> : <Row>
    <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
    <Row>
        <Col>
        <h1>Edit Staff</h1>
        </Col>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit}>
              <InputField formik={formik} name="name" label="Name"/>

              <InputField formik={formik} name="phone" label="Phone"/>
              
              <InputField formik={formik} name="address" label="Address" as="textarea"/>

              <StatusSelect formik={formik}/>

              <SubmitBtn disabled={formik.isSubmitting}/>

        </Form>
        </Col>
    </Row>
    
    </Col>

</Row>
}