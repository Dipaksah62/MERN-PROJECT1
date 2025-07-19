import { Loading } from "@/components"
import { UserType } from "@/library/types"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const  StaffRoute: React.FC <{element:React.ReactNode}> = ({element}) => {
    const user : UserType = useSelector((state:any) =>state.user.value)

    const navigate = useNavigate()

    useEffect(() => {
        if(user && !(user?.role == 'Staff' || user?.role == 'Admin')) {
            navigate('/')

        }
    }, [user])

    return user ? element : <Loading/>

}