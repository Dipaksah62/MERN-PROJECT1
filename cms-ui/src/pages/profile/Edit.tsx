import { InputField, SubmitBtn } from "@/components"
import http from "@/http"
import { ValidationError } from "@/library/functions"
import { UserFormData } from "@/library/interfaces"
import { UserType } from "@/library/types"
import { setUser } from "@/store"
import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"

export const Edit:React.FC = () => {
    const user : UserType = useSelector((state:any) =>state.user.value)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            name:user?.name,
            phone:user?.phone,
            address:user?.address,

        } as UserFormData,
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.patch('/profile/update', data)
            .then(() => http.get('/profile/show'))
            .then(({data}) => dispatch(setUser(data)))
            .catch(({response}) => ValidationError(formik,response))
            .finally(() => setSubmitting(false))
            

        }

    })
    return <Row>
    <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
    <Row>
        <Col>
        <h1>Edit Profile</h1>
        </Col>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit}>
              <InputField formik={formik} name="name" label="Name"/>

              <InputField formik={formik} name="phone" label="Phone"/>
              
              <InputField formik={formik} name="address" label="Address" as="textarea"/>

              <SubmitBtn disabled={formik.isSubmitting}/>

        </Form>
        </Col>
    </Row>
    
    </Col>

</Row>
}