import './productList.scss'
import { SpinningImg } from '../../loader/loader'
import { FaEdit, FatEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'

const ProductList = ({products, isLoadding}) => {
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
                    <span><h3>Search Products</h3></span>
               </div>
               {isLoadding && <SpinningImg />}

               <div className="table">
                    {!isLoadding && products.length === 0 ? (
                         <p>-- No product found, please add a product...</p>
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
                                        products.map((product, index) => {
                                             const {_id, name, category, price, quantity, value, description, image} = product
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
                                                                 <AiOutlineEye size='25' color='purble' />
                                                            </span>
                                                            <span>
                                                                 <FaEdit size='20' color='green' />
                                                            </span>
                                                            <span>
                                                                 <FaTrashAlt size='20' color='red' />
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
          </div>

     </div>
  )
}

export default ProductList