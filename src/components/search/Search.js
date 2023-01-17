import './Search.module.scss'
import { BiSearch } from 'react-icons/bi'

const Search = ({value, onChange}) => {
     const handleOnChange = (e) => onChange(e)
     return (
          <div className={StyleSheet.search}>
               <BiSearch size='18' className={StyleSheet.icon} />
               <input 
               type="text" 
               placeholder='Search Products' 
               value={value} 
               onChange={handleOnChange} />
          </div>
     )
}

export default Search