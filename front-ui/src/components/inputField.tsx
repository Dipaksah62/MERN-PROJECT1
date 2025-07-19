import { Form } from "react-bootstrap";
import { InputFieldProps } from "@/library/interfaces";

export const InputField:React.FC<InputFieldProps> = ({formik,name,label,type='text', as , ref , multiple= false , accept}) => {

    const handleFileChange = (files: FileList) => {
        formik.setFieldValue(name, Array.from(files))
        console.log(Array.from(files))
    }

    return   <Form.Group className="mb-3">
    <Form.Label htmlFor={name}>{label}</Form.Label>
    <Form.Control
    ref={ref}
    as={as}
    name={name}
    id={name}
    type={type}
    multiple={multiple}
    accept={accept}
    value={type =='file' ? '' : formik.values[name]}
    // @ts-ignore
    onChange={type =='file' ? ({target}) => handleFileChange(target.files) : formik.handleChange}
    onBlur={formik.handleBlur}
    isInvalid={formik.touched[name] && (formik.errors[name]?.length || 0) > 0}
    isValid={(formik.errors[name]?.length || 0) == 0 && formik.values[name]&& formik.values[name].length > 0}

    />
   {formik.touched[name] && (formik.errors[name]?.length || 0) > 0 && 
    <Form.Control.Feedback type="invalid">
     {formik.errors[name]}
    </Form.Control.Feedback>}
</Form.Group>

}