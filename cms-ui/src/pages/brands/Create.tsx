import { InputField, StatusSelect, SubmitBtn } from "@/components"
import http from "@/http"
import { ValidationError } from "@/library/functions"
import { UserFormData } from "@/library/interfaces"
import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

export const Create:React.FC = () => {
    const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues:{
            name:'',
            status:true,

        } as UserFormData,
        validationSchema: Yup.object({
            name: Yup.string().required(),
            status: Yup.bool().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.post('/cms/brands', data)
            .then(() => navigate('/brands'))
            .catch(({response}) => ValidationError(formik,response))
            .finally(() => setSubmitting(false))
            

        }

    })

    return  <Row>
    <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
    <Row>
        <Col>
        <h1>Add Brand</h1>
        </Col>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit}>
              <InputField formik={formik} name="name" label="Name"/>

              <StatusSelect formik={formik}/>

              <SubmitBtn disabled={formik.isSubmitting}/>

        </Form>
        </Col>
    </Row>
    
    </Col>

</Row>
}