import React, { createContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  //product state
  const [products, setProducts] = useState([])

  //fecth products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  )
};

export default ProductContext;
