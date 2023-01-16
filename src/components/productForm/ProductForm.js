import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './productForm.scss'
import Card from '../card/card'
import { Fragment } from 'react';

const ProductForm = ({ title, product, productImage, imagePreview, description, setDescription, handleInputChange, handleImageChange, saveProduct}) => {
     const handleSubmit = (e) => saveProduct(e)
     const handleImage = (e) => handleImageChange(e)
     const handleOnChange = (e) => handleInputChange(e)
     const handleDescriptionChange = (e) => setDescription(e)
     const allTextInputs = [ 'Name', 'Category', 'Quantity', 'Price']
          .map((item, index) => 
               <Fragment key={index}>
                    <label>Product {item}:</label>
                    <input 
                         type='text' 
                         placeholder={`Product ${item}`} name={item.toLowerCase()} 
                         value={product[item.toLocaleLowerCase()]} 
                         onChange={handleOnChange} 
                    />
               </Fragment>
          )
     return (
          <div className='add-product'>
               <h3 className='-mt'>{title}</h3>
               <Card cardClass={'card'}>
                    <form onSubmit={handleSubmit}>
                         {/* Input Image */}
                         <Card className="group">
                              <label>Product Image</label>
                              <code className='--color-dard'>Supported Formats: jpg, jpen, png</code>
                              <input 
                                   type='file' 
                                   name='image' 
                                   onChange={handleImage} 
                              />
                              {imagePreview !== null ? (
                                   <div className="image-preview">
                                        <img src={imagePreview} alt="Uploaded Product Image" />
                                   </div>
                              ):(
                                   <p>No Product Image Selected</p>
                              )}
                         </Card>
                         
                         {/* All Text Input Fields */}
                         {allTextInputs}

                         <label>Product Description: </label>
                         <ReactQuill theme='snow' value={description} onChange={handleDescriptionChange} modules={ProductForm.modules} formats={ProductForm.formats} />
                         
                         {/* Submit Button */}
                         <div className="--my">
                              <button type='submit' className="--btn --btn-primary">
                                   Save Product
                              </button>
                         </div>
                    </form>
               </Card>
          </div>
     )
}

// ReactQuill, the text rich editter
ProductForm.modules = {
     toolbar: [
       [{ header: "1" }, { header: "2" }, { font: [] }],
       [{ size: [] }],
       ["bold", "italic", "underline", "strike", "blockquote"],
       [{ align: [] }],
       [{ color: [] }, { background: [] }],
       [
         { list: "ordered" },
         { list: "bullet" },
         { indent: "-1" },
         { indent: "+1" },
       ],
       ["clean"],
     ],
}
ProductForm.formats = [
     "header",
     "font",
     "size",
     "bold",
     "italic",
     "underline",
     "strike",
     "blockquote",
     "color",
     "background",
     "list",
     "bullet",
     "indent",
     "link",
     "video",
     "image",
     "code-block",
     "align",
]

export default ProductForm