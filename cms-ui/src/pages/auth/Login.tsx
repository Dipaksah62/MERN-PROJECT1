import {Col, Form, Row } from "react-bootstrap"
import {useFormik} from "formik"
import { LoginFormData } from "@/library/interfaces"
import * as Yup from 'yup'
import { useState } from "react"
import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { inStorage, ValidationError } from "@/library/functions"
import { useDispatch } from "react-redux"
import { setUser } from "@/store"
import { useNavigate } from "react-router-dom"


export const Login:React.FC = () => {
    const [remember,setRemember] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',

        } as LoginFormData,
        validationSchema: Yup.object({
            email:Yup.string().required().email(),
            password:Yup.string().required(),

        }),
        onSubmit: (data, { setSubmitting }) => {
            http.post('/auth/login', data)
                .then(({data}) => {
                    inStorage('merntoken',data?.token,remember)

                   return http.get('/profile/show')
                    
                })
                .then(({data}) => {
                    dispatch(setUser(data))
                    navigate('/')

                })
                .catch(({ response }) => {
                    ValidationError(formik, response);
                })
                .finally(() => setSubmitting(false));
        }
        
    })
    return <>
    <Row className="justify-content-center align-items-center vh-100">
        <Col xl="4" md="6" className="bg-white py-3 my-3 rounded-2 shadow-sm">
        <Row>
            <Col className="text-center">
            <h1>Login</h1>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form onSubmit={formik.handleSubmit}>

                <InputField formik={formik} name="email" label="Email" type="email"/>
                <InputField formik={formik} name="password" label="Password" type="password"/>
                
                <Form.Check className="mb-3">
                    <Form.Check.Input
                     type="checkbox" 
                     name="remember" 
                     id="remember"
                     checked={remember}
                     onChange={() => setRemember(! remember)}
                    />
                    <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                </Form.Check>
                <div className="d-grid">
                   <SubmitBtn disabled={formik.isSubmitting} label="Log In" icon="fa-arrow-right-to-bracket"/>
                </div>


               
            </Form>
          
        </Col>
        </Row>
        </Col>
    </Row>
    </>
}