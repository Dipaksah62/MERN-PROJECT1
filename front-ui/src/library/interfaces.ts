import { HTMLInputTypeAttribute } from "react";
import { UserType } from "./types";
import { SelectOption } from "./tuples";


export interface UserData {
    _id:string,
    name:string,
    email:string,
    phone:string,
    address:string,
    role:string,
    status:boolean,
    createdAt:string,
    updatedAt:string,
    __v:number,

}
export interface Userstate {
    value: UserType,
}

export interface CartItem { 
    [id: string] : {
    Product: ProductData,
    qty: number,
    price: number,
    total: number,
}}

export interface CartState {
   value : CartItem
}

export interface LoginFormData {
    email:string,
    password:string,
}
export interface InputFieldProps {
    formik:any,
    name:string,
    label:string,
    type?:HTMLInputTypeAttribute,
    as?: "textarea" | undefined,
    ref?:React.Ref<any> | undefined,
    multiple?:boolean,
    accept?: string | undefined,
   
}

export interface SubmitBtnProps {
    disabled?:boolean,
    label?:string,
    icon?:string,
}

export interface ErrorResponse {
    data:{
        message:string,
        validation?:{}
    }
}

export interface PasswordFormData {
    oldPassword:string,
    password:string,
    confirmPassword:string,
}


export interface UserFormData {
    name: string,
    phone:string,
    address:string,
    email?:string,
    status?:boolean,
    password?:string,
    confirmPassword?:string
}

export interface ProductData {
    _id: string,
    name:string,
    summary:string,
    description:string,
    price:number,
    discountedPrice:number,
    categoryId:string,
    brandId:string,
    images:string[],
    status:boolean,
    featured:boolean,
    createdAt:string,
    updatedAt:string,
    __v:number,
    category?: CategoryBrandData,
    brand?: CategoryBrandData,
    reviews?: ReviewData[],
}


export interface CategoryBrandData {
    _id: string,
    name:string,
    status:boolean,
    createdAt:string,
    updatedAt:string,
    __v:number,
}

export interface ProductFormData {
    name:string,
    summary:string,
    description:string,
    price: number,
    discountedPrice:number,
    categoryId:string,
    brandId: string,
    images?: File[]|null|undefined,
    status:boolean,
    featured:boolean,
}

export interface StatusSelectProps {
    formik: any,
    name?: string,
    label?: string,
    tLabel?: string,
    fLabel?: string,
}

export interface SelectFieldProps {
    formik: any,
    name: string,
    label: string,
    data: SelectOption[]
}

export interface ReviewData {
  
    _id:string
    productId: string
    userId: string
    comment: string
    rating: number
    createdAt: string
    updatedAt: string
    __v: number
    product: ProductData
    user: UserData
}

interface OrderDetailData {
        _id: string
        productId: string
        orderId: string
        qty: number
        price: number
        total: number
        createdAt: string
        updatedAt: string
        __v: number
        product: ProductData
}

export interface OrderData {
    
    _id: string
    userId: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    user:UserData
    details: OrderDetailData[]
}

export interface ReviewFormData {
    comment:string,
    rating:number
}

