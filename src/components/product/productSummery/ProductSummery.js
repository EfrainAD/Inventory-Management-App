import './productSummary.scss'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4, BsCartX } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import { CAL_CATEGORY, CAL_OUT_OF_STOCK, CAL_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../../redux/features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const earningIcon = <AiFillDollarCircle size='40' color='#fff' />
const productIcon = <BsCart4 size='40' color='#fff' />
const categoryIcon = <BiCategory size='40' color='#fff' />
const outOfStockIcon = <BsCartX size='40' color='#fff' />

const moneyFormat = (num) => {

}

const ProductSummery = ({products}) => {
  const dispatch = useDispatch()
  
  // Values from useSelector
  const totalStoreValue = '$' + new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  }).format((useSelector(selectTotalStoreValue)))
  const outOfStock =useSelector(selectOutOfStock)
  const categoryLength = useSelector(selectCategory).length
  
  useEffect(() => {
    dispatch(CAL_STORE_VALUE(products))
    dispatch(CAL_OUT_OF_STOCK(products))
    dispatch(CAL_CATEGORY(products))
  }, [dispatch, products])
    
  return (
    <div className='product-summery'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title='Total Products'
          count={products.length}
          bgColor='card1'
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={totalStoreValue}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={categoryLength}
          bgColor="card4"
        />
      </div>
    </div>
  )
}

export default ProductSummery