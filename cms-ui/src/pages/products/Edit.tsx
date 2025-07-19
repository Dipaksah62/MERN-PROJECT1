import { InputField, Loading, SelectField, StatusSelect, SubmitBtn } from "@/components"
import http from "@/http"
import { imgUrl, ValidationError } from "@/library/functions"
import { CategoryBrandData, ProductData, ProductFormData } from "@/library/interfaces"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

export const Edit: React.FC = () => {
    const [categories, setCategories] = useState<CategoryBrandData[]>([])
    const [brands, setBrand] = useState<CategoryBrandData[]>([])
    const [product, setProduct] = useState<ProductData|null>(null)
    const [loading , setLoading] = useState<boolean>(true)

    const navigate = useNavigate()
    const params = useParams()
    
    const formik = useFormik({
        initialValues: {
            name:'',
            summary:'',
            description:'',
            price: 100,
            discountedPrice: 0,
            categoryId:'',
            brandId: '',
            status:true,
            featured: false,
            images:null,
        } as ProductFormData,
        validationSchema: Yup.object({
            name: Yup.string().required(),
            summary: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required().min(100),
            discountedPrice: Yup.number().required(),
            categoryId: Yup.string().required(),
            brandId: Yup.string().required(),
            status: Yup.bool().required(),
            featured: Yup.bool().required(),
            images: Yup.mixed().nullable()
            // @ts-ignore
            .test('imageType', 'Select a valid image file', (files: any[]|null) => {
               if(files && files.length > 0) {
                // @ts-ignore
                for(let file of files){
                    // @ts-ignore
                    if(!file.type.startsWith('image')) {
                        return false
                    }

                }
                return true
               }

               return true
            })
        }),
        onSubmit: (data, {setSubmitting}) => {
            const fd = new FormData 
            
            for(let k in data) {
                if(k == 'images' && data['images']) {
                    // @ts-ignore
                    for(let img of data[k]) {
                        fd.append(k, img)
                    }
                } else {
                    // @ts-ignore
                    fd.append(k, data[k])
                }
            }

            http.patch(`/cms/products/${params.id}`, fd, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
            .then(() => navigate('/products'))
            .catch(({response}) => ValidationError(formik,response))
            .finally(() => setSubmitting(false))
            

        }

    })

    useEffect(() => {
       setLoading(true)

       Promise.all([
          http.get('/cms/categories'),
          http.get('/cms/brands'),
          http.get(`/cms/products/${params.id}`)
        ])
        .then(([{data: cData}, {data: bData}, {data: pData}]) => {
            setCategories(cData)
            setBrand(bData)
            setProduct(pData)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if(product && Object.keys(product).length > 0) {
            for(let k in formik.values) {
                if(k !='images' ){
                    // @ts-ignore
                    formik.setFieldValue(k, product[k])
                }
            }
        }
    },[product])

    const handleDelete = (filename: string) => {
        confirmAlert({
            title:'Confirm Delete',
            message:'Are you sure you want to delete this?',
            buttons: [
                {
                    label:'Yes',
                    className: 'text-bg-danger',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/products/${params.id}/image/${filename}`)
                        .then(() => http.get(`/cms/products/${params.id}`))
                        .then(({ data }) => setProduct(data))
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

    return loading ? <Loading/> :  <Row>
    <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
    <Row>
        <Col>
        <h1>Edit Product</h1>
        </Col>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit}>
              <InputField formik={formik} name="name" label="Name"/>

              <InputField formik={formik} name="summary" label="Summary" as="textarea" />

              <InputField formik={formik} name="description" label="Description" as="textarea" />

              <InputField formik={formik} name="price" label="Price" type="number" />

              <InputField formik={formik} name="discountedPrice" label="Discounted Price" type="number" />

              <SelectField formik={formik} name="categoryId" label="Category" data={categories.map(category => [category._id, category.name])} />

              <SelectField formik={formik} name="brandId" label="Brand" data={brands.map(brand => [brand._id, brand.name])} />

              <InputField formik={formik} name="images" label="Image" type="file" accept="image/*" 
              multiple/>

              {formik.values.images && <Row>
                  {formik.values.images?.map((image, i) => <Col key={i} md="3" className="mb-3">
                  <img src={URL.createObjectURL(image)} className="img-fluid"/>
                  </Col>)}
              </Row>}
              <Row>
                  {product?.images.map((image, i) => <Col key={i} md="3" className="mb-3">
                  <Row>
                    <Col xs="12">
                    <img src={imgUrl(image)} className="img-fluid"/>
                    </Col>
                    <Col className="mt-3 text-center">
                         <Button variant="danger" size="sm" onClick={() => handleDelete(image)}>
                            <i className="fa-solid fa-times me-2"></i>Remove
                         </Button>
                    </Col>
                  </Row>
                  </Col>)}
              </Row>

              <StatusSelect formik={formik}/>

              <StatusSelect formik={formik} name="featured" label="Featured" tLabel="Yes" fLabel="No"/>

              <SubmitBtn disabled={formik.isSubmitting}/>

        </Form>
        </Col>
    </Row>
    
    </Col>

</Row>
}