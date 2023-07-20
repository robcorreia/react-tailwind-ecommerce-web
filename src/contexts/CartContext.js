import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const [itemAmount, setItemAmount] = useState(0)

  const [total, setTotal] = useState(0)

  // update total
  useEffect(() => {
    const total = cart.reduce((acumulator, currentItem) => {
      return acumulator + currentItem.price * currentItem.amount;

    }, 0);

    setTotal(total)
  }, [cart])

  // update itemAmoumnt
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acumulator, currentItem) => {
        return acumulator + currentItem.amount
      }, 0)
      setItemAmount(amount)
    }
  }, [cart])

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 }

    //check if the item is already in the cart
    const cartItem = cart.find(item => {
      return item.id === id
    })

    //if cart item is already in the cart
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 }
        } else {
          return item;
        }
      })

      setCart(newCart)

    } else {
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id
    })
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const inscreaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id)
    addToCart(cartItem, id)
  }

  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id)

    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item
        }
      })
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      removeFromCart(id)
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      inscreaseAmount,
      decreaseAmount,
      itemAmount,
      total
    }}>{children}</CartContext.Provider>
  )
};

export default CartProvider;
