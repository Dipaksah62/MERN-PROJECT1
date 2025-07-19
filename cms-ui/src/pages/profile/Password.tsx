import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { ValidationError } from "@/library/functions"
import { PasswordFormData} from "@/library/interfaces"
import { useFormik } from "formik"
import { useRef } from "react"
import { Col, Form, Row } from "react-bootstrap"
import * as Yup from "yup"
import YupsPassword from "yup-password"

YupsPassword(Yup)

export const Password:React.FC = () => {
    const opRef =useRef('')
    const pRef =useRef('')
    const cpRef =useRef('')

  
    const formik = useFormik({
        initialValues:{
            oldPassword:'',
            password:'',
            confirmPassword:'',
        } as PasswordFormData,
        validationSchema: Yup.object({
            oldPassword: Yup.string().required(),
            password: Yup.string().required().minLowercase(1).minUppercase(1).minSymbols(1),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')],'Password not confirmed')
           
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.patch('/profile/password', data)
            .then(() => {
              // @ts-ignore
                opRef.current.value = null
                // @ts-ignore
                pRef.current.value = null
                // @ts-ignore
                cpRef.current.value = null


                
                
            })
            .catch(({response}) => ValidationError(formik,response))
            .finally(() => setSubmitting(false))
            

        }

    })
    return <Row>
    <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
    <Row>
        <h1>ChangePassword</h1>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit} >
              <InputField formik={formik} name="oldPassword" label="Old Password" type="password" ref={opRef}/>

              <InputField formik={formik} name="password" label="Password" type="password" ref={pRef}/>
              
              <InputField formik={formik} name="confirmPassword" label="Confirm Password" type="password" ref={cpRef}/>

              <SubmitBtn disabled={formik.isSubmitting}/>

        </Form>
        </Col>
    </Row>
    
    </Col>

</Row>
}