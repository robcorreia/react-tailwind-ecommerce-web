import React, { createContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  //product state
  const [product, setProduct] = useState([])

  //fecth products

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      console.log(data)
    }

    fetchProducts()
  }, [])

  return <ProductContext.Provider>
    {children}
  </ProductContext.Provider>
};

export default ProductContext;
