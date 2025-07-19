import { SubmitBtnProps } from "@/library/interfaces"
import { Button } from "react-bootstrap"

export const SubmitBtn:React.FC <SubmitBtnProps> = ({disabled = false, label = 'Save', icon='fa-save'}) =>{
    return  <Button variant="dark" type="submit" disabled={disabled}>
    <i className={`fa-solid ${disabled ? 'fa-spinner fa-spin':icon} me-2`}></i>{label}
</Button>

}