import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductList from "../../components/product/productList/ProductList"
import ProductSummery from "../../components/product/productSummery/ProductSummery"
import useRedirectLoggedOutUser from "../../custom-hook/useRedirectLoggedOutUser"
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice"
import { getProducts } from "../../redux/features/product/productSlice"

const Dashboard = () => {
  useRedirectLoggedOutUser('/login')
  const dispatch = useDispatch()
  
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  const { products, isLoading, isError, message } = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedIn) 
      dispatch(getProducts())
    if (isError) 
      console.log(message)
  }, [isLoggedIn, isError, dispatch, message])
  
  return (
    <div>
      <ProductSummery products={products} />
      <ProductList products={products} isloading={isLoading} />
    </div>
  )
}

export default Dashboard