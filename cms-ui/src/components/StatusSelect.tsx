import { StatusSelectProps } from "@/library/interfaces"
import { Form } from "react-bootstrap"

export const StatusSelect: React.FC<StatusSelectProps> = ({formik , name = 'status',  label = 'Status' , tLabel = 'Active', fLabel = 'Inactive'}) => {
  return <Form.Group className="mb-3">
   <Form.Label htmlFor={name}>{label}</Form.Label>
    <Form.Select
     name={name}
     id={name}
     value={formik.values[name]}
     onChange={({target}) => formik.setFieldValue(name, ['true',true].includes(target.value))}
     onBlur={formik.handleBlur}
     isInvalid={formik.touched[name] && (formik.errors[name] || 0) > 0}
     isValid={(formik.errors[name]?.length || 0) == 0 && typeof formik.values[name] == "boolean"}
    >
        {/*@ts-ignore */}
        <option value={true}>{tLabel}</option>
        {/*@ts-ignore */}
       <option value={false}>{fLabel}</option>
    </Form.Select>
        {formik.touched[name] && (formik.errors[name]?.length || 0) > 0 && <Form.Control.Feedback type="invalid">
    {formik.errors[name]}
    </Form.Control.Feedback>}
  </Form.Group>
}