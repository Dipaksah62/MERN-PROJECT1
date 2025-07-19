import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { ValidationError } from "@/library/functions"
import { UserFormData } from "@/library/interfaces"
import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

export const Register:React.FC = () => {
    const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues:{
            name:'',
            phone:'',
            address:'',
            email:'',
            password:'',
            confirmPassword:'',
        } as UserFormData,
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().minLowercase(1).minUppercase(1).minSymbols(1),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')],'Password not confirmed')
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.post('/auth/register', data)
            .then(() => navigate('/login'))
            .catch(({response}) => ValidationError(formik,response))
            .finally(() => setSubmitting(false))
            

        }

    })

    return <>
    <Row>
    <Col lg="4" sm="6" className="bg-white py-3 my-3 rounded-2 shadow-sm  mx-auto">
    <Row>
        <Col className="text-center">
        <h1>Register</h1>
        </Col>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit}>
              <InputField formik={formik} name="name" label="Name"/>

              <InputField formik={formik} name="email" label="Email" type="email"/>

              <InputField formik={formik} name="password" label="Password" type="password" />
              
              <InputField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />

              <InputField formik={formik} name="phone" label="Phone"/>
              
              <InputField formik={formik} name="address" label="Address" as="textarea"/>

             

              <SubmitBtn disabled={formik.isSubmitting} label="Register" icon="fa-user-plus"/>

        </Form>
        </Col>
    </Row>
    </Col>
    </Row>
    </>
}