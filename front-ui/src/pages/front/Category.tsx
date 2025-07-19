import { Loading, ProductSection } from "@/components"
import http from "@/http"
import { CategoryBrandData, ProductData } from "@/library/interfaces"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Category: React.FC = () => {
    const [category, setCategory] = useState<CategoryBrandData|null>(null)
    const [products, setProducts] = useState<ProductData[]>([])
    const[loading, setLoading] = useState<boolean>(true)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get(`/categories/${params.id}`),
            http.get(`/categories/${params.id}/products`),
        ])
        .then(([{data: cData},{data: pData}]) => {
             setCategory(cData)
             setProducts(pData)
        })
        .catch(() => { })
        .finally(() => setLoading(false))
    },[params.id])
    return loading ? <Loading/> : <>
    <ProductSection title={category?.name || ''} products={products} sm/>
    </>
}