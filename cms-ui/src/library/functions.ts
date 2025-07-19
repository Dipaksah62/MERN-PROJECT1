import { ErrorResponse } from "./interfaces";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(LocalizedFormat)

export const ValidationError = (formik: any, response: ErrorResponse) => {
    if ("validation" in response?.data) {
        formik.setErrors(response?.data?.validation)
        
    }
    
    
}

export const inStorage = (key:string , value:string, remember:boolean = false) => {
    remember ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value)
}

export const fromStorage = (key:string):string|null => {
    return localStorage.getItem(key) || sessionStorage.getItem(key)

}
export  const removeStorage = (key:string) => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)

}

export const dtFormat = (dt:string , format:string = 'lll'):string => {
    return dayjs(dt).format(format)
}

export const imgUrl = (filename : string): string => 
    `${import.meta.env.VITE_API_URL}/image/${filename}`