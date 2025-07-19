import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/ReactToastify.css'
import { Container } from "react-bootstrap"
import "./Layout.css"
import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { UserType } from '@/library/types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fromStorage, removeStorage } from '@/library/functions'
import http from '@/http'
import { setUser } from '@/store'
import { Loading } from './Loading'

export const Layout: React.FC = () => {
    const user: UserType = useSelector((state: any) => state.user.value)

    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        if(!user) {
            const token = fromStorage('merntoken')

            if(token) {
                http.get('/profile/show')
                .then(({data}) =>{
                    dispatch(setUser(data))

                })
                .catch(() => {
                    removeStorage('merntoken')
                })
                .finally(() => setLoading(false))
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }

    },[user])

    return loading ? <Loading/> : <>
    {user && <TopNav user={user}/>}
   
        <Container>
            <Outlet/>
        </Container>
    </>
}