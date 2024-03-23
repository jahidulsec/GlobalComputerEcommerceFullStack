"use client"

import { createContext, useContext, useEffect, useReducer } from "react"

const CartContext = createContext(undefined)

const reducer = (state, action) => {
    switch(action.type) {
      case 'added': {
        if (state.cart.length > 0) {
          let productIdx = state.cart.findIndex(item => {
            return item.productId === action.productId
          })
          if (productIdx >= 0) {
            console.log("idx", productIdx)
            if (state.cart[productIdx]!==undefined) {
              state.cart[productIdx].count = state.cart[productIdx].count + action.count
              state.cart[productIdx].price = state.cart[productIdx].price + (action.count * action.price)
            }
            return {
              ...state
            }
          }
  
        }
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              id: action.id,
              productId: action.productId,
              productSlug: action.productSlug,
              name: action.name, 
              unitPrice: action.unitPrice,
              price: action.price * action.count,
              imgUrl: action.imgUrl,
              count: action.count,
            }
          ]
        }
      }
  
      case 'add_quantity': {
        if (state.cart.length > 0) {
          let productIdx = state.cart.findIndex(item => {
            return item.productId === action.productId
          })
          if (productIdx >= 0) {
            console.log("idx", productIdx)
            if (state.cart[productIdx]!== undefined) {
              state.cart[productIdx].count = action.count
              state.cart[productIdx].price = action.count * action.unitPrice
            }
            return {...state}
          }
        }
      }
      case 'deleted': {
        return {
          ...state,
          cart: 
            state.cart.filter((item) => {
              return item.id !== action.id
            })
        }
      }
  
      case 'reset': {
        return {}
      }
  
      case 'add_wishlist': {
        let product = state.wishlist.filter(item => {
          return item.productId === action.productId
        })
  
        if (product.length > 0) {
          return {
            ...state,
            wishlist: state.wishlist.filter(item => item.productId !== action.productId)
          }
        }
  
        return {
          ...state,
          wishlist: [
            ...state.wishlist,
            {
              productId: action.productId,
              productSlug: action.productSlug,
              name: action.name,
              imgUrl: action.imgUrl,
              unitPrice: action.unitPrice,
              stars: action.stars,
              stock: action.stock,
              count: action.count,
            }
          ]
        }
      }
  
      case 'delele_wishlist_item': {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.productId !== action.productId)
        }
      }
      
      default: {
        throw Error('unknown action ' + action.type)
      }
    }
  }
  
  
  
const getCartLocalData = () => {
    let localCartData;

    if (typeof(window) !== 'undefined') {
      localCartData = localStorage.getItem('cart')
    }
    if (!localCartData) {
        return []
    } else {
        return JSON.parse(localCartData)
    }
}

const getWishlistLocalData = () => {
    let localWishlisttData;

    if (typeof(window) !== 'undefined') {
      localWishlisttData = localStorage.getItem('wishlist')
    }

    if (!localWishlisttData) {
        return []
    } else {
        return JSON.parse(localWishlisttData)
    }
}


const initialState = {
cart: getCartLocalData() || [],
wishlist: getWishlistLocalData() || []
}


export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const discount = 0
    const shippingCharge = 0
    const cartPrices = state.cart.map(item => {
      return item.price
    }) 

    let cartTotal = cartPrices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0);

    let cartOverallTotal = cartTotal + shippingCharge - discount;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
      },[state])


    const handleAddCart = (productId, productSlug, name, unitPrice, price, imgUrl, count) => {
        dispatch({
          type: 'added',
          id: nextId++,
          productId: productId,
          productSlug: productSlug,
          name: name,
          unitPrice: unitPrice,
          price: price,
          imgUrl: imgUrl,
          count: count,
        })
      }
    
      const handleCartItemQuantity = (id, unitPrice, count) => {
        dispatch({
          type:'add_quantity',
          productId: id,
          count: count,
          unitPrice: unitPrice,
        })
      }
    
      const handleCartItemDelete = (id) => {
        dispatch({
          type:'deleted',
          id: id,
        })
      }
    
      const handleResetCart = () => {
        dispatch({
          type:'reset',
        })
      }
    
      const handleWishlist = (productId, productSlug, name, imgUrl, unitPrice, stars, stock) => {
        dispatch({
          type: 'add_wishlist',
          productId: productId,
          productSlug: productSlug,
          name: name,
          imgUrl: imgUrl,
          unitPrice: unitPrice,
          stars: stars,
          stock: stock,
          count: 1,
        })
      }
    
      const handleDelWishlist = (productId) => {
        dispatch({
          type: 'delele_wishlist_item',
          productId: productId,
        })
      }

      return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                wishlist: state.wishlist, 
                cartTotal,
                cartOverallTotal,
                cartPrices,
                discount,
                shippingCharge,
                handleAddCart, 
                handleResetCart,
                handleCartItemDelete,
                handleCartItemQuantity,
                handleWishlist,
                handleDelWishlist,
            }}
        >
            {children}
        </CartContext.Provider>
      )

}


export const useCartContext = () => useContext(CartContext)

let nextId = 0
