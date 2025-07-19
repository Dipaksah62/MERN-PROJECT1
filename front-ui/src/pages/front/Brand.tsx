import { Loading, ProductSection } from "@/components"
import http from "@/http"
import { CategoryBrandData, ProductData } from "@/library/interfaces"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Brand: React.FC = () => {
    const [brand, setBrand] = useState<CategoryBrandData|null>(null)
    const [products, setProducts] = useState<ProductData[]>([])
    const[loading, setLoading] = useState<boolean>(true)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get(`/brands/${params.id}`),
            http.get(`/brands/${params.id}/products`),
        ])
        .then(([{data: cData},{data: pData}]) => {
             setBrand(cData)
             setProducts(pData)
        })
        .catch(() => { })
        .finally(() => setLoading(false))
    },[params.id])
    return loading ? <Loading/> : <>
    <ProductSection title={brand?.name || ''} products={products} sm/>
    </>
}