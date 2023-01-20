import './productList.scss'
import { SpinningImg } from '../../loader/loader'
import { FaEdit, FatEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import Search from '../../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { fILTER_PRODUCTS, selectFilterProducts } from '../../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice'
import { useNavigate } from 'react-router-dom'

const ProductList = ({products, isLoadding}) => {
     const [search, setSearch] = useState('')
     const dispatch = useDispatch()
     const navigate = useNavigate()
     
     const filteredProducts = useSelector(selectFilterProducts)
     useEffect(() => {
          dispatch(fILTER_PRODUCTS({products, search}))
     }, [dispatch, products, search])

     // START pagination
     const itemsPerPage = 5
     const [itemOffset, setItemOffset] = useState(0);
     const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
     
     // Changes Value when itemOffset value changes.
     const endOffset = itemOffset + itemsPerPage;
     const currentItems = filteredProducts.slice(itemOffset, endOffset);
     
     // Invoke when user click to request another page.
     const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
          setItemOffset(newOffset);
     }
     // END pagination

     const deleteComfirmProduct = async (id) => {
          await dispatch(deleteProduct(id))
          await dispatch(getProducts())
     }
     // Handlers
     const handleDeleteProduct = (id) => {
          confirmAlert({
               title: 'Delete Product',
               message: 'Are you sure to do this?',
               buttons: [
                 {
                   label: 'Delete',
                   onClick: () => deleteComfirmProduct(id)
                 },
                 {
                   label: 'Cancel',
                 }
               ],
             })
     }
     const handleViewProduct = (id) => {
          navigate(`/dashboard/product-detail/${id}`)
     }
    
     // Edit displayed Info
     const shortenText = (text, n) => {
          return text.length > n ? 
                    text.substring(0, n).concat('...') : text
     }

  return (
     <div className="product-list">
          <hr />
          <div className="table">
               <div className="--flex-beteween --flex-dir-column">
                    <span><h3>Inventory Items</h3></span>
                    <span><h3><Search value={search} onChange={(e) => setSearch(e.target.value)} /></h3></span>
               </div>
               {isLoadding && <SpinningImg />}

               {/* List of Products */}
               <div className="table">
                    {!isLoadding && products.length === 0 ? (
                         <p>{products.length}-- No product found, please add a product...</p>
                    ):(
                         <table>
                              <thead>
                                   <tr>
                                        <th>s/n</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Value</th>
                                        <th>Action</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        currentItems.map((product, index) => {
                                             const {_id, name, category, price, quantity} = product
                                             return (
                                                  <tr key={_id}>
                                                       <td>{index + 1}</td>
                                                       <td>{shortenText(name, 18)}</td>
                                                       <td>{category}</td>
                                                       <td>`${price}`</td>
                                                       <td>{quantity}</td>
                                                       <td>`${price * quantity}`</td>
                                                       <td className='icons'>
                                                            <span>
                                                                 <AiOutlineEye size='25' color='purble' onClick={() => handleViewProduct(product._id)}/>
                                                            </span>
                                                            <span>
                                                                 <FaEdit size='20' color='green' />
                                                            </span>
                                                            <span>
                                                                 <FaTrashAlt size='20' color='red' onClick={() => handleDeleteProduct(product._id)} />
                                                            </span>
                                                       </td>
                                                  </tr>
                                             )
                                        })
                                   }
                              </tbody>
                         </table>
                    )}
               </div>
               <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="activePage"
               />
          </div>

     </div>
  )
}

export default ProductList