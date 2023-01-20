import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../../redux/features/product/productSlice'
import useRedirectLoggedOutUser from '../../../custom-hook/useRedirectLoggedOutUser'
import './productDetail.scss'
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice'
import Card from '../../card/card'
import { SpinningImg } from '../../loader/loader'
import DOMPurify from 'dompurify'

const ProductDetail = () => {
     useRedirectLoggedOutUser('/login')
     const dispatch = useDispatch()

     const { id } = useParams()
     
     const isLoggedIn = useSelector(selectIsLoggedIn)
     const { product, isLoading, isError, message } = useSelector((state) => state.product)

     useEffect(() => {
          if (isLoggedIn) 
               dispatch(getProduct(id))
          if (isError) 
               console.log(message)
     }, [isLoggedIn, isError, dispatch, message])

     const stockStatus = (quantity) => quantity > 0 ? 
          <span className="--color-success">In Stock</span> 
          : 
          <span className="--color-danger">Out Of Stock</span>

     return (
          <div className="product-detail">
          <h3 className="--mt">Product Detail</h3>
          <Card cardClass="card">
          {isLoading && <SpinningImg />}
          {product && (
               <div className="detail">
                    {/* Image */}
                    <Card cardClass="group">
                         {product?.image ? (
                              <img
                                   src={product.image.filePath}
                                   alt={product.image.fileName}
                              />
                         ) : (
                              <p>No image set for this product</p>
                         )}
                    </Card>
                    {/* Stock Status */}
                    <h4>
                         Product Availability: {stockStatus(product.quantity)}
                    </h4>
                    <hr />
                    {/* Name */}
                    <h4>
                         <span className="badge">Name: </span> &nbsp; {product.name}
                    </h4>
                    {/* SKU */}
                    <p>
                         <b>&rarr; SKU : </b> {product.sku}
                    </p>
                    {/* Category */}
                    <p>
                         <b>&rarr; Category : </b> {product.category}
                    </p>
                    {/* Price */}
                    <p>
                         <b>&rarr; Price : </b> {"$"} {product.price}
                    </p>
                    {/* Quantity */}
                    <p>
                         <b>&rarr; Quantity in stock : </b> {product.quantity}
                    </p>
                    {/* Total Stock Value */}
                    <p>
                         <b>&rarr; Total Value in stock : </b> {"$"}
                    {product.price * product.quantity}
                    </p>
                    <hr />
                    <div dangerouslySetInnerHTML={{
                         __html: DOMPurify.sanitize(product.description),
                    }}
                    ></div>
                    <hr />
                    <code className="--color-dark">
                         Created on: {product.createdAt.toLocaleString("en-US")}
                    </code>
                    <br />
                    <code className="--color-dark">
                         Last Updated: {product.updatedAt.toLocaleString("en-US")}
                    </code>
               </div>
          )}
          </Card>
        </div>
  )
}

export default ProductDetail