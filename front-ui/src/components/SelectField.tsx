import { SelectFieldProps } from "@/library/interfaces"
import { Form } from "react-bootstrap"

export const SelectField: React.FC<SelectFieldProps> = ({formik , name = 'status',  label = 'Status' , data}) => {
  return <Form.Group className="mb-3">
   <Form.Label htmlFor={name}>{label}</Form.Label>
    <Form.Select
     name={name}
     id={name}
     value={formik.values[name]}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     isInvalid={formik.touched[name] && (formik.errors[name] || 0) > 0}
     isValid={(formik.errors[name]?.length || 0) == 0 && (formik.values[name]?.length || 0) > 0 }
    >
        {data.map((item, i) => <option value={item[0]} key={i}>{item[1]}</option>)}
    </Form.Select>
        {formik.touched[name] && (formik.errors[name]?.length || 0) > 0 && <Form.Control.Feedback type="invalid">
    {formik.errors[name]}
    </Form.Control.Feedback>}
  </Form.Group>
}